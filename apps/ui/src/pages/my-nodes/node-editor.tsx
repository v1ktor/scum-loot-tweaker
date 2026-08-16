import {
    ChevronRightIcon,
    CopyIcon,
    FolderIcon,
    FolderPlusIcon,
    InfoIcon,
    Loader2Icon,
    PackageIcon,
    PackagePlusIcon,
    PlusIcon,
    ScanEyeIcon,
    Settings2Icon,
    SquareArrowOutUpRightIcon,
    Trash2Icon,
    XIcon,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog/confirm-dialog.tsx';
import { FreeTextCombobox } from '@/components/free-text-combobox/free-text-combobox.tsx';
import { IconButton } from '@/components/icon-button/icon-button.tsx';
import { MultiSelect } from '@/components/multiselect/multiselect.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
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
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { POST_SPAWN_ACTIONS_OPTIONS } from '@/data/post-spawn-actions-options.ts';
import type { Rarity } from '@/data/rarity.ts';
import { RARITY_OPTIONS } from '@/data/rarity-options.ts';
import { useItemsOptions } from '@/hooks/use-items-options.ts';
import { useVanillaChildren } from '@/hooks/use-vanilla-children.ts';
import { EditorTreeItem } from '@/pages/my-nodes/editor-tree-item.tsx';
import {
    addChildAt,
    adjustPathAfterRemoval,
    createItemNode,
    createSubNode,
    duplicateNodeAt,
    getNamePath,
    getNodeAt,
    isSubNode,
    ROOT_NODE_NAME,
    removeNodeAt,
    uniqueChildName,
    updateNodeAt,
} from '@/pages/my-nodes/node-tree-ops.ts';
import { findVanillaNode, type VanillaChild, vanillaFileName } from '@/pages/my-nodes/vanilla-children.ts';
import { NodeTreeDialog } from '@/pages/spawners/nodes/node-tree-dialog.tsx';
import {
    calcSelectionProbability,
    describeSelectionOdds,
    formatProbability,
} from '@/pages/spawners/rarity-probability.ts';
import type { LootNode, Option } from '@/pages/spawners/spawners.types.ts';
import { queryClient } from '@/query-client.ts';
import { trpc } from '@/trpc.ts';
import { getItemName } from '@/utils/get-item-name.ts';

interface NodeEditorProps {
    node: LootNode;
    onChange: (node: LootNode) => void;
}

function RaritySelect({
    value,
    onChange,
}: {
    value: string | undefined;
    onChange: (rarity: Rarity | undefined) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 shrink-0 w-32">
                    <Badge variant="outline" className={value ? undefined : 'text-muted-foreground italic'}>
                        {value ?? 'Not set'}
                    </Badge>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Change Rarity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {RARITY_OPTIONS.map((option) => (
                    <DropdownMenuItem key={option.value} onClick={() => onChange(option.value as Rarity)}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onChange(undefined)}>Not set</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function AdvancedItemFields({
    child,
    itemsOptions,
    onChange,
}: {
    child: LootNode;
    itemsOptions: Option[];
    onChange: (updater: (child: LootNode) => LootNode) => void;
}) {
    const variations = child.Variations ?? [];

    return (
        <div className="mt-2 ml-7 grid gap-2 rounded-md border border-dashed p-3">
            <div className="grid gap-2">
                <span className="text-sm font-medium">Variations</span>
                {variations.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                        Optional. For items that are the same thing in different skins. When this node is selected, the
                        game picks the item above or one of these variations, with equal chances.
                    </p>
                )}
                {variations.map((variation, variationIndex) => (
                    <div key={variationIndex} className="flex items-center gap-2">
                        <FreeTextCombobox
                            value={variation}
                            options={itemsOptions}
                            placeholder="Variation item Id"
                            className="w-full"
                            onChange={(next) =>
                                onChange((current) => ({
                                    ...current,
                                    Variations: (current.Variations ?? []).map((value, i) =>
                                        i === variationIndex ? next : value,
                                    ),
                                }))
                            }
                        />
                        <IconButton
                            variant="destructive"
                            leftOrnament={<XIcon className="h-4 w-4" />}
                            onClick={() =>
                                onChange((current) => ({
                                    ...current,
                                    Variations: (current.Variations ?? []).filter((_, i) => i !== variationIndex),
                                }))
                            }
                        />
                    </div>
                ))}
                <IconButton
                    variant="outline"
                    text="Add variation"
                    leftOrnament={<PlusIcon className="mr-1 h-4 w-4" />}
                    onClick={() =>
                        onChange((current) => ({ ...current, Variations: [...(current.Variations ?? []), ''] }))
                    }
                />
            </div>
            <div className="-mb-4">
                <MultiSelect
                    id={`post-spawn-actions-${child.Name}`}
                    label="Post spawn actions"
                    placeholder="Select actions"
                    items={POST_SPAWN_ACTIONS_OPTIONS}
                    values={child.PostSpawnActions ?? []}
                    onValueChange={(options) =>
                        onChange((current) => ({ ...current, PostSpawnActions: options.map((o) => o.value) }))
                    }
                    onClear={() => onChange((current) => ({ ...current, PostSpawnActions: [] }))}
                />
            </div>
        </div>
    );
}

export function NodeEditor({ node, onChange }: NodeEditorProps) {
    const { itemsOptions } = useItemsOptions();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();

    const [selectedPath, setSelectedPath] = useState<number[]>([]);
    const [expandedChildren, setExpandedChildren] = useState<Set<number>>(new Set());
    const [showVanilla, setShowVanilla] = useState(true);
    const [treeDialogOpen, setTreeDialogOpen] = useState(false);
    const [copyingPath, setCopyingPath] = useState<string | null>(null);

    const { openForNode, dialog: treeDialog } = NodeTreeDialog({
        open: treeDialogOpen,
        onOpenChange: setTreeDialogOpen,
    });

    const path = getNodeAt(node, selectedPath) ? selectedPath : [];
    const selected = getNodeAt(node, path) ?? node;
    const namePath = getNamePath(node, path);
    const nodeId = namePath.join('.');
    const isRoot = path.length === 0;

    const children = selected.Children ?? [];
    const mergeMode = selected.ChildrenMergeMode ?? 'UpdateOrAdd';
    const replacesVanilla = mergeMode === 'Replace';

    const vanillaChildren = useVanillaChildren(
        nodeId,
        children.map((child) => child.Name.trim()),
    );
    const siblingRarities = [
        ...children.map((child) => child.Rarity),
        ...(replacesVanilla ? [] : vanillaChildren.map((child) => child.rarity)),
    ];

    const selectNode = (next: number[]) => {
        setSelectedPath(next);
        setExpandedChildren(new Set());
    };

    const updateSelected = (updater: (current: LootNode) => LootNode) => onChange(updateNodeAt(node, path, updater));

    const updateChild = (childIndex: number, updater: (child: LootNode) => LootNode) =>
        onChange(updateNodeAt(node, [...path, childIndex], updater));

    const handleAddSubNode = () => {
        onChange(addChildAt(node, path, createSubNode(uniqueChildName(selected, 'NewNode'))));
    };

    const handleAddItem = () => {
        onChange(addChildAt(node, path, createItemNode()));
    };

    const handleCopyVanillaChild = async (child: VanillaChild) => {
        if (copyingPath) {
            return;
        }

        setCopyingPath(child.path);

        try {
            const file: LootNode = await queryClient.fetchQuery(
                trpc.nodes.get.queryOptions(vanillaFileName(child.path)),
            );
            const found = findVanillaNode(file, child.path);

            if (!found) {
                toast.error(`"${child.path}" is no longer in the game files`);
                return;
            }

            const snapshot = node;
            onChange(addChildAt(node, path, structuredClone(found)));

            toast(`Copied "${child.name}" into your file`, {
                action: { label: 'Undo', onClick: () => onChange(snapshot) },
            });
        } catch {
            toast.error(`Failed to load "${vanillaFileName(child.path)}"`);
        } finally {
            setCopyingPath(null);
        }
    };

    const handleDuplicateChild = (childIndex: number) => {
        onChange(duplicateNodeAt(node, [...path, childIndex]));
    };

    const removeChild = (childIndex: number, label: string) => {
        const snapshot = node;
        const removedPath = [...path, childIndex];

        onChange(removeNodeAt(node, removedPath));
        setSelectedPath((prev) => adjustPathAfterRemoval(prev, removedPath));
        setExpandedChildren(new Set());

        toast(label ? `Deleted "${label}"` : 'Item deleted', {
            action: { label: 'Undo', onClick: () => onChange(snapshot) },
        });
    };

    const handleDeleteChild = async (childIndex: number) => {
        const child = children[childIndex];
        const hasDescendants = isSubNode(child) && (child.Children?.length ?? 0) > 0;

        if (hasDescendants) {
            const confirmed = await confirm({
                title: `Delete "${child.Name}"?`,
                description: 'Everything inside this sub-node will be deleted as well.',
            });

            if (!confirmed) return;
        }

        removeChild(childIndex, child.Name);
    };

    const handleDeleteSelected = async () => {
        const confirmed = await confirm({
            title: `Delete "${selected.Name}"?`,
            description: 'Everything inside this sub-node will be deleted as well.',
        });

        if (!confirmed) return;

        const snapshot = node;
        onChange(removeNodeAt(node, path));
        setSelectedPath(path.slice(0, -1));
        setExpandedChildren(new Set());

        toast(`Deleted "${selected.Name}"`, {
            action: { label: 'Undo', onClick: () => onChange(snapshot) },
        });
    };

    const handleCopyNodeId = async () => {
        await navigator.clipboard.writeText(nodeId);
        toast(`Copied "${nodeId}" — paste it into a spawner's Nodes tab`);
    };

    const toggleAdvanced = (childIndex: number) => {
        setExpandedChildren((prev) => {
            const next = new Set(prev);
            if (next.has(childIndex)) {
                next.delete(childIndex);
            } else {
                next.add(childIndex);
            }
            return next;
        });
    };

    return (
        <div className="flex gap-4 min-h-0 h-[32rem]">
            <ScrollArea horizontal className="w-72 shrink-0 rounded-md border">
                <div className="p-2 min-w-max">
                    <EditorTreeItem node={node} path={[]} depth={0} selectedPath={path} onSelect={selectNode} />
                </div>
            </ScrollArea>

            <div className="flex-1 flex flex-col rounded-md border overflow-hidden min-h-0 min-w-0">
                <div className="px-4 py-3 border-b shrink-0">
                    <div className="flex items-start justify-between gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                {namePath.map((name, index) => (
                                    <Fragment key={index}>
                                        {index > 0 && <BreadcrumbSeparator />}
                                        <BreadcrumbItem>
                                            {index === namePath.length - 1 ? (
                                                <BreadcrumbPage>{name || 'Unnamed'}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink
                                                    className="cursor-pointer"
                                                    onClick={() => selectNode(path.slice(0, index))}
                                                >
                                                    {name || 'Unnamed'}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-1 shrink-0">
                            {!isRoot && (
                                <>
                                    <IconButton
                                        variant="outline"
                                        tooltip="Copy node Id for spawners"
                                        leftOrnament={<CopyIcon className="h-4 w-4" />}
                                        onClick={handleCopyNodeId}
                                    />
                                    <IconButton
                                        variant="destructive"
                                        tooltip="Delete this sub-node"
                                        leftOrnament={<Trash2Icon className="h-4 w-4" />}
                                        onClick={handleDeleteSelected}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    {!isRoot && <p className="mt-1 font-mono text-xs text-muted-foreground">{nodeId}</p>}
                </div>

                <ScrollArea className="flex-1 min-h-0">
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex flex-wrap items-end gap-3">
                            <div className="grid gap-1 flex-1 min-w-48">
                                <span className="text-sm font-medium">Name</span>
                                <Input
                                    value={selected.Name}
                                    aria-label={isRoot ? 'Root name' : 'Sub-node name'}
                                    placeholder={isRoot ? ROOT_NODE_NAME : 'Sub-node name'}
                                    onChange={(event) =>
                                        updateSelected((current) => ({ ...current, Name: event.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-1">
                                <span className="text-sm font-medium">Rarity</span>
                                <RaritySelect
                                    value={selected.Rarity}
                                    onChange={(rarity) => updateSelected((current) => ({ ...current, Rarity: rarity }))}
                                />
                            </div>
                            <div className="grid gap-1">
                                <span className="flex items-center gap-1 text-sm font-medium">
                                    Vanilla items at this Id
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    aria-label="About vanilla items at this Id"
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    <InfoIcon className="size-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-64">
                                                Only applies when the vanilla tree already has a node with this Id.
                                                Items you list always use your version — this decides what happens to
                                                the vanilla ones you did not list.
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 px-2 shrink-0 w-32"
                                            aria-label="Vanilla items at this Id"
                                        >
                                            <Badge variant="outline">
                                                {mergeMode === 'Replace' ? 'Replace' : 'Keep'}
                                            </Badge>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuLabel>When the game already has this Id</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                updateSelected((current) => ({
                                                    ...current,
                                                    ChildrenMergeMode: 'UpdateOrAdd',
                                                }))
                                            }
                                        >
                                            Keep — leave the vanilla items and add yours alongside
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                updateSelected((current) => ({
                                                    ...current,
                                                    ChildrenMergeMode: 'Replace',
                                                }))
                                            }
                                        >
                                            Replace — drop the vanilla items, spawn only yours
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        {isRoot && mergeMode === 'Replace' && (
                            <p className="text-xs text-destructive">
                                On the root this drops the <em>entire</em> vanilla loot tree, not just one branch — the
                                game would spawn only what this file defines. Set it on the specific sub-node you want
                                to override instead.
                            </p>
                        )}
                        {isRoot && (
                            <p className="text-xs text-muted-foreground">
                                Defaults to <code className="font-mono">{ROOT_NODE_NAME}</code> - the root every vanilla
                                node file uses. However, can be set to any name.
                            </p>
                        )}
                        {isRoot && selected.Name.trim() !== '' && selected.Name.trim() !== ROOT_NODE_NAME && (
                            <p className="text-xs text-amber-500">
                                This differs from <code className="font-mono">{ROOT_NODE_NAME}</code>, so no Id in this
                                file will match the vanilla tree.
                            </p>
                        )}

                        <div className="flex items-center justify-between gap-2 border-t pt-4">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                Children
                            </p>
                            <div className="flex gap-2">
                                <IconButton
                                    onClick={handleAddSubNode}
                                    leftOrnament={<FolderPlusIcon className="mr-1 h-4 w-4" />}
                                    text="Add sub-node"
                                />
                                <IconButton
                                    onClick={handleAddItem}
                                    leftOrnament={<PackagePlusIcon className="mr-1 h-4 w-4" />}
                                    text="Add item"
                                />
                            </div>
                        </div>

                        {children.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                This node is empty. Add a sub-node to group loot, or an item to spawn.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {children.map((child, childIndex) => {
                                    const branch = isSubNode(child);
                                    const probability = calcSelectionProbability(child.Rarity, siblingRarities);

                                    return (
                                        <div key={childIndex}>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="shrink-0">
                                                    {branch ? (
                                                        <FolderIcon className="h-4 w-4 text-amber-500" />
                                                    ) : (
                                                        <PackageIcon className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </span>
                                                {branch ? (
                                                    <Input
                                                        className="flex-1 min-w-48"
                                                        value={child.Name}
                                                        placeholder="Sub-node name"
                                                        onChange={(event) =>
                                                            updateChild(childIndex, (current) => ({
                                                                ...current,
                                                                Name: event.target.value,
                                                            }))
                                                        }
                                                    />
                                                ) : (
                                                    <div className="flex-1 min-w-48">
                                                        <FreeTextCombobox
                                                            value={child.Name}
                                                            options={itemsOptions}
                                                            placeholder="Item Id"
                                                            className="w-full"
                                                            onChange={(next) =>
                                                                updateChild(childIndex, (current) => ({
                                                                    ...current,
                                                                    Name: next,
                                                                }))
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <RaritySelect
                                                    value={child.Rarity}
                                                    onChange={(rarity) =>
                                                        updateChild(childIndex, (current) => ({
                                                            ...current,
                                                            Rarity: rarity,
                                                        }))
                                                    }
                                                />
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Badge
                                                                variant="secondary"
                                                                className="shrink-0 tabular-nums w-16"
                                                            >
                                                                {formatProbability(probability)}
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-64">
                                                            Chance of picking this child when this node is rolled.{' '}
                                                            {describeSelectionOdds(
                                                                child.Rarity,
                                                                siblingRarities,
                                                                'children',
                                                            )}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                {branch ? (
                                                    <IconButton
                                                        variant="ghost"
                                                        tooltip="Open"
                                                        leftOrnament={<SquareArrowOutUpRightIcon className="h-4 w-4" />}
                                                        onClick={() => selectNode([...path, childIndex])}
                                                    />
                                                ) : (
                                                    <IconButton
                                                        variant="ghost"
                                                        tooltip="Variations and post spawn actions"
                                                        leftOrnament={<Settings2Icon className="h-4 w-4" />}
                                                        onClick={() => toggleAdvanced(childIndex)}
                                                    />
                                                )}
                                                <IconButton
                                                    variant="ghost"
                                                    tooltip="Duplicate"
                                                    leftOrnament={<CopyIcon className="h-4 w-4" />}
                                                    onClick={() => handleDuplicateChild(childIndex)}
                                                />
                                                <IconButton
                                                    variant="destructive"
                                                    tooltip="Delete"
                                                    leftOrnament={<Trash2Icon className="h-4 w-4" />}
                                                    onClick={() => handleDeleteChild(childIndex)}
                                                />
                                            </div>
                                            {!branch && expandedChildren.has(childIndex) && (
                                                <AdvancedItemFields
                                                    child={child}
                                                    itemsOptions={itemsOptions}
                                                    onChange={(updater) => updateChild(childIndex, updater)}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {vanillaChildren.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    className="flex items-center gap-1 border-t pt-4 text-xs text-muted-foreground font-medium uppercase tracking-wide"
                                    onClick={() => setShowVanilla((prev) => !prev)}
                                >
                                    <ChevronRightIcon
                                        className={`h-3.5 w-3.5 transition-transform ${showVanilla ? 'rotate-90' : ''}`}
                                    />
                                    Already in the game at this Id ({vanillaChildren.length})
                                </button>
                                {showVanilla && (
                                    <>
                                        <p className="text-xs text-muted-foreground">
                                            {replacesVanilla
                                                ? 'Replace drops these — only the children above will spawn.'
                                                : 'These spawn alongside your children. They come from the game files, so they cannot be edited here — add a child with the same name to override one.'}
                                        </p>
                                        {vanillaChildren.map((child) => (
                                            <div
                                                key={child.name}
                                                className="flex flex-wrap items-center gap-2 opacity-60"
                                            >
                                                <span className="shrink-0">
                                                    {child.isSubNode ? (
                                                        <FolderIcon className="h-4 w-4 text-amber-500" />
                                                    ) : (
                                                        <PackageIcon className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </span>
                                                <span
                                                    aria-disabled={true}
                                                    title={`${child.path} — defined by the game, read-only`}
                                                    className={`flex-1 min-w-48 flex h-9 items-center truncate rounded-md border border-dashed bg-muted/30 px-3 text-sm cursor-not-allowed ${
                                                        replacesVanilla ? 'line-through' : ''
                                                    }`}
                                                >
                                                    {child.isSubNode
                                                        ? child.name
                                                        : getItemName(child.name, itemsOptions)}
                                                </span>
                                                <span className="flex h-8 w-32 shrink-0 items-center px-2">
                                                    <Badge variant="outline">{child.rarity ?? 'Not set'}</Badge>
                                                </span>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Badge
                                                                variant="secondary"
                                                                className="shrink-0 tabular-nums w-16"
                                                            >
                                                                {replacesVanilla
                                                                    ? '—'
                                                                    : formatProbability(
                                                                          calcSelectionProbability(
                                                                              child.rarity,
                                                                              siblingRarities,
                                                                          ),
                                                                      )}
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-64">
                                                            {replacesVanilla
                                                                ? 'Dropped by Replace, so it never spawns from this node.'
                                                                : `Chance of picking this child when this node is rolled. ${describeSelectionOdds(
                                                                      child.rarity,
                                                                      siblingRarities,
                                                                      'children',
                                                                  )}`}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <IconButton
                                                    variant="ghost"
                                                    tooltip={
                                                        child.isSubNode
                                                            ? 'View the game tree under this sub-node'
                                                            : 'View this item in the game tree'
                                                    }
                                                    leftOrnament={<ScanEyeIcon className="h-4 w-4" />}
                                                    onClick={() => openForNode(child.path)}
                                                />
                                                <IconButton
                                                    variant="ghost"
                                                    tooltip={
                                                        child.isSubNode
                                                            ? 'Copy this sub-node and everything under it into your file'
                                                            : 'Copy this item into your file'
                                                    }
                                                    leftOrnament={
                                                        copyingPath === child.path ? (
                                                            <Loader2Icon className="h-4 w-4 animate-spin" />
                                                        ) : child.isSubNode ? (
                                                            <FolderPlusIcon className="h-4 w-4" />
                                                        ) : (
                                                            <PackagePlusIcon className="h-4 w-4" />
                                                        )
                                                    }
                                                    onClick={() => handleCopyVanillaChild(child)}
                                                />
                                                <span className="w-9 shrink-0" />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
            {confirmDialog}
            {treeDialog}
        </div>
    );
}
