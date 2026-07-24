import { FolderIcon, PackageIcon, PlusIcon, ScanEyeIcon, Trash2Icon, TriangleAlertIcon, XIcon } from 'lucide-react';
import { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog/confirm-dialog.tsx';
import { IconButton } from '@/components/icon-button/icon-button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Item } from '@/components/ui/item.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { Rarity } from '@/data/rarity.ts';
import { RARITY_OPTIONS } from '@/data/rarity-options.ts';
import { useNodePaths } from '@/hooks/use-node-paths.ts';
import { searchNodePaths } from '@/pages/spawners/nodes/node-path-search.ts';
import { NodeTreeDialog } from '@/pages/spawners/nodes/node-tree-dialog.tsx';
import { calcSelectionProbability, formatProbability } from '@/pages/spawners/rarity-probability.ts';
import type { NodePathEntry, Spawner, SpawnerNode } from '@/pages/spawners/spawners.types.ts';

const getUniqueId = () => crypto.randomUUID();

type NodeGroup = SpawnerNode & { _uiId: string };

interface NodesTabProps {
    spawner: Spawner;
    setSpawner: Dispatch<SetStateAction<Spawner>>;
}

interface NodeIdComboboxProps {
    nodePaths: NodePathEntry[];
    value: string;
    onChange: (value: string) => void;
}

function NodeIdCombobox({ nodePaths, value, onChange }: NodeIdComboboxProps) {
    const suggestions = useMemo(() => searchNodePaths(nodePaths, value), [nodePaths, value]);

    return (
        <Combobox
            items={suggestions}
            filteredItems={suggestions}
            itemToStringValue={(entry: NodePathEntry) => entry.path}
            itemToStringLabel={(entry: NodePathEntry) => entry.path}
            isItemEqualToValue={(entry: NodePathEntry, other: NodePathEntry) => entry.path === other.path}
            inputValue={value}
            onInputValueChange={(next) => onChange(next)}
            value={{ path: value, isLeaf: false, rarity: '' }}
            onValueChange={(next) => {
                if (next !== null) onChange(next.path);
            }}
            autoHighlight
        >
            <ComboboxInput placeholder="Add node Id" showTrigger={false} className="w-full" />
            <ComboboxContent className="min-w-(--anchor-width)">
                <ComboboxEmpty>
                    {value.trim().length < 2 ? 'Type an item or node path to search...' : 'No matching node paths.'}
                </ComboboxEmpty>
                <ComboboxList>
                    {(entry: NodePathEntry) => (
                        <ComboboxItem key={entry.path} value={entry}>
                            {entry.isLeaf ? (
                                <PackageIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            ) : (
                                <FolderIcon className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                            )}
                            {entry.path}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export function NodesTab(props: NodesTabProps) {
    const { spawner, setSpawner } = props;

    const [rows, setRows] = useState<NodeGroup[]>(() =>
        (spawner.Nodes ?? []).map((node) => ({ ...node, _uiId: getUniqueId() })),
    );
    const [treeDialogOpen, setTreeDialogOpen] = useState(false);
    const { nodePaths } = useNodePaths();

    const { confirm, dialog: confirmDeleteGroupDialog } = useConfirmDialog();
    const { openForNode, dialog: treeDialog } = NodeTreeDialog({
        open: treeDialogOpen,
        onOpenChange: setTreeDialogOpen,
    });

    const syncToSpawner = useCallback(
        (updatedRows: NodeGroup[]) => {
            setSpawner((prev) => ({
                ...prev,
                Nodes: updatedRows
                    .map(({ _uiId, ...node }) => ({
                        ...node,
                        Ids: node.Ids.filter((id) => id.trim() !== ''),
                    }))
                    .filter((node) => node.Ids.length > 0),
            }));
        },
        [setSpawner],
    );

    useEffect(() => {
        syncToSpawner(rows);
    }, [rows, syncToSpawner]);

    const handleRarityChange = (nodeIndex: number, rarity: Rarity) => {
        setRows((prev) => prev.map((node, i) => (i === nodeIndex ? { ...node, Rarity: rarity } : node)));
    };

    const handleAddNode = () => {
        const newNode: NodeGroup = {
            _uiId: getUniqueId(),
            Ids: [''],
            Rarity: Rarity.Common,
        };

        setRows((prev) => [...prev, newNode]);
    };

    const handleDeleteNode = async (nodeIndex: number) => {
        const confirmed = await confirm({
            title: 'Delete node group',
            description: 'Are you sure you want to delete this node group?',
        });

        if (confirmed) {
            const snapshot = [...rows];

            setRows((prev) => prev.filter((_, i) => i !== nodeIndex));

            toast('Node group deleted', {
                action: {
                    label: 'Undo',
                    onClick: () => setRows(snapshot),
                },
            });
        }
    };

    const handleAddIdField = (nodeIndex: number) => {
        setRows((prev) => prev.map((node, i) => (i === nodeIndex ? { ...node, Ids: [...node.Ids, ''] } : node)));
    };

    const handleDeleteId = (nodeIndex: number, idIndex: number) => {
        const deletedId = rows[nodeIndex].Ids[idIndex];
        const snapshot = [...rows];

        setRows((prev) =>
            prev.map((node, i) => {
                if (i !== nodeIndex) return node;
                return { ...node, Ids: node.Ids.filter((_, ii) => ii !== idIndex) };
            }),
        );

        toast(deletedId ? `Deleted "${deletedId}"` : 'Node Id deleted', {
            action: {
                label: 'Undo',
                onClick: () => setRows(snapshot),
            },
        });
    };

    const handleUpdateId = (nodeIndex: number, idIndex: number, newValue: string) => {
        setRows((prev) =>
            prev.map((node, i) =>
                i === nodeIndex ? { ...node, Ids: node.Ids.map((id, ii) => (ii === idIndex ? newValue : id)) } : node,
            ),
        );
    };

    const nodePathIndex = useMemo(
        () => new Map(nodePaths.map((entry) => [entry.path.toLowerCase(), entry])),
        [nodePaths],
    );
    const lookupNodePath = (id: string) => nodePathIndex.get(id.toLowerCase());

    const itemRarities = (spawner.Items ?? []).map((item) => item.Rarity);
    const realRows = rows.filter((r) => r.Ids.some((id) => id.trim() !== ''));

    return (
        <div className="mt-4">
            <div className="flex justify-end py-4">
                <IconButton
                    onClick={handleAddNode}
                    leftOrnament={<PlusIcon className="mr-1 h-4 w-4" />}
                    text="Add node group"
                />
            </div>
            {rows.map((node, nodeIndex) => {
                const isCurrentRowReal = node.Ids.some((id) => id.trim() !== '');
                const groupProbability = calcSelectionProbability(node.Rarity, [
                    ...realRows.map((r) => r.Rarity),
                    ...(isCurrentRowReal ? [] : [node.Rarity]),
                    ...itemRarities,
                ]);
                const realIds = node.Ids.filter((id) => id.trim() !== '');
                // Only Ids we can resolve count toward the group's total; unresolved Ids are treated as 0.
                const resolvedSiblingRarities = realIds
                    .map((id) => lookupNodePath(id)?.rarity)
                    .filter((rarity) => rarity !== undefined);

                return (
                    <Item key={node._uiId} variant="outline" className="mb-2">
                        <div className="flex basis-full justify-between">
                            <div className="flex items-center gap-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 px-2">
                                            <Badge variant="outline">{node.Rarity}</Badge>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuLabel>Change Rarity</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {RARITY_OPTIONS.map((option) => (
                                            <DropdownMenuItem
                                                key={option.value}
                                                onClick={() => handleRarityChange(nodeIndex, option.value as Rarity)}
                                            >
                                                {option.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Badge variant="secondary" className="tabular-nums">
                                    {formatProbability(groupProbability)}
                                </Badge>
                            </div>
                            <IconButton
                                onClick={() => handleDeleteNode(nodeIndex)}
                                leftOrnament={<Trash2Icon className="mr-1 h-4 w-4" />}
                                text="Delete node group"
                                variant="destructive"
                            />
                        </div>

                        {node.Ids.map((id, idIndex) => {
                            const resolvedEntry = lookupNodePath(id);
                            const idChanceInGroup = resolvedEntry
                                ? calcSelectionProbability(resolvedEntry.rarity, resolvedSiblingRarities)
                                : 0;

                            return (
                                <div key={`${node._uiId}-${idIndex}`} className="flex items-center gap-2 w-full">
                                    {resolvedEntry && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="shrink-0">
                                                        {resolvedEntry.isLeaf ? (
                                                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <FolderIcon className="h-4 w-4 text-amber-500" />
                                                        )}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    className={resolvedEntry.isLeaf ? undefined : 'max-w-64'}
                                                >
                                                    {resolvedEntry.isLeaf
                                                        ? 'This Id resolves to an item — its spawn chance is final.'
                                                        : 'This Id resolves to a category, not a specific item — its spawn chance is only the odds of entering that category, not a final item chance. Open the preview to see how it breaks down further inside.'}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                    {id.trim() !== '' && !resolvedEntry && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="shrink-0">
                                                        <TriangleAlertIcon className="h-4 w-4 text-destructive" />
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    This Id doesn't match any known node path.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                    {resolvedEntry && realIds.length > 1 && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Badge variant="outline" className="shrink-0 tabular-nums">
                                                        {formatProbability(idChanceInGroup)}
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Chance within this group only, if the group is picked.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                    <NodeIdCombobox
                                        nodePaths={nodePaths}
                                        value={id}
                                        onChange={(value) => handleUpdateId(nodeIndex, idIndex, value)}
                                    />
                                    {id && (
                                        <IconButton
                                            variant="ghost"
                                            onClick={() => openForNode(id)}
                                            leftOrnament={<ScanEyeIcon className="h-4 w-4" />}
                                        />
                                    )}
                                    <IconButton
                                        leftOrnament={<XIcon className="h-4 w-4" />}
                                        variant="destructive"
                                        onClick={() => handleDeleteId(nodeIndex, idIndex)}
                                    />
                                </div>
                            );
                        })}

                        <IconButton
                            onClick={() => handleAddIdField(nodeIndex)}
                            leftOrnament={<PlusIcon className="mr-1 h-4 w-4" />}
                            text="Add node Id"
                            variant="outline"
                        />
                    </Item>
                );
            })}

            {treeDialog}
            {confirmDeleteGroupDialog}
        </div>
    );
}
