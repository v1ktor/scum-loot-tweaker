import { PlusIcon, ScanEyeIcon, Trash2Icon, XIcon } from 'lucide-react';
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog/confirm-dialog.tsx';
import { IconButton } from '@/components/icon-button/icon-button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Item } from '@/components/ui/item.tsx';
import { Rarity } from '@/data/rarity.ts';
import { RARITY_OPTIONS } from '@/data/rarity-options.ts';
import { NodeTreeDialog } from '@/pages/spawners/nodes/node-tree-dialog.tsx';
import type { Spawner, SpawnerNode } from '@/pages/spawners/Spawners.types.ts';

const getUniqueId = () => crypto.randomUUID();

type NodeGroup = SpawnerNode & { _uiId: string };

interface NodesTabProps {
    spawner: Spawner;
    setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function NodesTab(props: NodesTabProps) {
    const { spawner, setSpawner } = props;

    const [rows, setRows] = useState<NodeGroup[]>(() =>
        (spawner.Nodes ?? []).map((node) => ({ ...node, _uiId: getUniqueId() })),
    );
    const [treeDialogOpen, setTreeDialogOpen] = useState(false);

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

    const handleUpdateId = (nodeIndex: number, idIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setRows((prev) =>
            prev.map((node, i) =>
                i === nodeIndex ? { ...node, Ids: node.Ids.map((id, ii) => (ii === idIndex ? newValue : id)) } : node,
            ),
        );
    };

    return (
        <div className="mt-4">
            <div className="flex justify-end py-4">
                <IconButton
                    onClick={handleAddNode}
                    leftOrnament={<PlusIcon className="mr-1 h-4 w-4" />}
                    text="Add node group"
                />
            </div>
            {rows.map((node, nodeIndex) => (
                <Item key={node._uiId} variant="outline" className="mb-2">
                    <div className="flex basis-full justify-between">
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
                        <IconButton
                            onClick={() => handleDeleteNode(nodeIndex)}
                            leftOrnament={<Trash2Icon className="mr-1 h-4 w-4" />}
                            text="Delete node group"
                            variant="destructive"
                        />
                    </div>

                    {node.Ids.map((id, idIndex) => (
                        <div key={`${node._uiId}-${idIndex}`} className="flex items-center gap-2 w-full">
                            <Input value={id} placeholder="Add node Id" onChange={handleUpdateId(nodeIndex, idIndex)} />
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
                    ))}

                    <IconButton
                        onClick={() => handleAddIdField(nodeIndex)}
                        leftOrnament={<PlusIcon className="mr-1 h-4 w-4" />}
                        text="Add node Id"
                        variant="outline"
                    />
                </Item>
            ))}

            {treeDialog}
            {confirmDeleteGroupDialog}
        </div>
    );
}
