import { ChevronsDownUpIcon, ChevronsUpDownIcon, FolderIcon, PackageIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
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
import { Input } from '@/components/ui/input.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { POST_SPAWN_ACTIONS_OPTIONS } from '@/data/post-spawn-actions-options.ts';
import { useItemsOptions } from '@/hooks/use-items-options.ts';
import { TreeSidebarItem } from '@/pages/spawners/nodes/tree-sidebar-item.tsx';
import { countAllLeafItems, countFilteredLeafItems } from '@/pages/spawners/nodes/utils.ts';
import { calcSelectionProbability, formatProbability } from '@/pages/spawners/rarity-probability.ts';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';

function getActionLabel(action: string): string {
    return POST_SPAWN_ACTIONS_OPTIONS.find((o) => o.value === action)?.label ?? action;
}

interface NodeTreeViewProps {
    treeNode: LootNode;
    initialExpanded?: boolean;
    initialPath?: string[];
    onPathChange?: (path: string[]) => void;
}

function findNodeAtPath(root: LootNode, path: string[]) {
    let current: LootNode | undefined = root;

    for (let i = 1; i < path.length; i++) {
        current = current?.Children?.find((c) => c.Name === path[i]);
        if (!current) return undefined;
    }

    return current;
}

export function NodeTreeView({ treeNode, initialExpanded = false, initialPath, onPathChange }: NodeTreeViewProps) {
    const { itemsOptions } = useItemsOptions();
    const [filter, setFilter] = useState('');

    const startNode = initialPath ? (findNodeAtPath(treeNode, initialPath) ?? treeNode) : treeNode;
    const startPath = initialPath ?? [treeNode.Name];

    const [selectedNode, setSelectedNode] = useState<LootNode | null>(startNode);
    const [selectedPath, setSelectedPath] = useState<string[]>(startPath);
    const [defaultExpanded, setDefaultExpanded] = useState(initialExpanded);
    const [resetKey, setResetKey] = useState(0);

    const selectNode = (node: LootNode, path: string[]) => {
        setSelectedNode(node);
        setSelectedPath(path);
        onPathChange?.(path);
    };

    const navigateToBreadcrumb = (index: number) => {
        const targetPath = selectedPath.slice(0, index + 1);
        const node = findNodeAtPath(treeNode, targetPath);
        if (node) selectNode(node, targetPath);
    };

    return (
        <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex-1">
                    <Input
                        placeholder="Filter items..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={filter ? 'pr-8' : ''}
                    />
                    {filter && (
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setFilter('')}
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    )}
                </div>
                {filter && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {countFilteredLeafItems(treeNode, filter, itemsOptions)}/{countAllLeafItems(treeNode)} items
                    </span>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    title="Expand all"
                    onClick={() => {
                        setDefaultExpanded(true);
                        setResetKey((k) => k + 1);
                    }}
                >
                    <ChevronsUpDownIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    title="Collapse all"
                    onClick={() => {
                        setDefaultExpanded(false);
                        setResetKey((k) => k + 1);
                    }}
                >
                    <ChevronsDownUpIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex gap-4 overflow-hidden min-h-0 flex-1">
                <ScrollArea horizontal className="w-80 shrink-0 rounded-md border">
                    <div className="p-2 min-w-max">
                        <TreeSidebarItem
                            key={`${resetKey}-${defaultExpanded}`}
                            node={treeNode}
                            depth={0}
                            filter={filter}
                            itemsOptions={itemsOptions}
                            selectedNode={selectedNode}
                            onSelect={selectNode}
                            defaultExpanded={defaultExpanded}
                            selectedPath={selectedPath}
                        />
                    </div>
                </ScrollArea>
                <div className="flex-1 flex flex-col rounded-md border overflow-hidden min-h-0">
                    {selectedNode ? (
                        <>
                            <div className="px-4 py-3 border-b shrink-0">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {selectedPath.map((name, i) => (
                                            <BreadcrumbItem key={i}>
                                                {i > 0 && <BreadcrumbSeparator />}
                                                {i === selectedPath.length - 1 ? (
                                                    <BreadcrumbPage>{name}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink
                                                        className="cursor-pointer"
                                                        onClick={() => navigateToBreadcrumb(i)}
                                                    >
                                                        {name}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        ))}
                                    </BreadcrumbList>
                                </Breadcrumb>
                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                    <Badge variant="outline">{selectedNode.Rarity}</Badge>
                                    {selectedNode.PostSpawnActions?.map((action) => (
                                        <Badge key={action} variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {getActionLabel(action)}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <ScrollArea className="flex-1 min-h-0">
                                {(() => {
                                    const allChildren = selectedNode.Children ?? [];
                                    const subNodes = allChildren.filter((c) => c.Children && c.Children.length > 0);
                                    const leafItems = allChildren.filter((c) => !c.Children || c.Children.length === 0);
                                    const filteredSubNodes = filter
                                        ? subNodes.filter((n) => n.Name.toLowerCase().includes(filter.toLowerCase()))
                                        : subNodes;
                                    const filteredLeafItems = filter
                                        ? leafItems.filter((item) =>
                                              getItemName(item.Name, itemsOptions)
                                                  .toLowerCase()
                                                  .includes(filter.toLowerCase()),
                                          )
                                        : leafItems;
                                    const hasBoth = subNodes.length > 0 && leafItems.length > 0;
                                    const hasContent = filteredSubNodes.length > 0 || filteredLeafItems.length > 0;

                                    if (!hasContent) {
                                        return (
                                            <p className="p-4 text-sm text-muted-foreground">No items in this node.</p>
                                        );
                                    }

                                    const renderCard = (child: LootNode, i: number, isSubNode: boolean) => (
                                        <div
                                            key={i}
                                            className={`flex items-center gap-3 rounded-md border p-2 transition-colors ${isSubNode ? 'cursor-pointer border-yellow-500/40 hover:bg-yellow-500/10' : 'hover:bg-accent/50'}`}
                                            onClick={
                                                isSubNode
                                                    ? () => selectNode(child, [...selectedPath, child.Name])
                                                    : undefined
                                            }
                                        >
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted">
                                                {isSubNode ? (
                                                    <FolderIcon className="size-5 text-muted-foreground" />
                                                ) : (
                                                    <PackageIcon className="size-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <span className="text-sm font-medium truncate">
                                                    {isSubNode ? child.Name : getItemName(child.Name, itemsOptions)}
                                                </span>
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <Badge variant="outline" className="w-fit text-[10px] px-1.5 py-0">
                                                        {child.Rarity}
                                                    </Badge>
                                                    <Badge
                                                        variant="secondary"
                                                        className="w-fit text-[10px] px-1.5 py-0 tabular-nums"
                                                    >
                                                        {formatProbability(
                                                            calcSelectionProbability(
                                                                child.Rarity,
                                                                allChildren.map((c) => c.Rarity),
                                                            ),
                                                        )}
                                                    </Badge>
                                                    {child.PostSpawnActions?.map((action) => (
                                                        <Badge
                                                            key={action}
                                                            variant="secondary"
                                                            className="w-fit text-[10px] px-1.5 py-0"
                                                        >
                                                            {getActionLabel(action)}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );

                                    return (
                                        <div className="p-3 flex flex-col gap-4">
                                            {filteredSubNodes.length > 0 && (
                                                <div className="flex flex-col gap-2">
                                                    {hasBoth && (
                                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                                            Sub-nodes
                                                        </p>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {filteredSubNodes.map((n, i) => renderCard(n, i, true))}
                                                    </div>
                                                </div>
                                            )}
                                            {filteredLeafItems.length > 0 && (
                                                <div className="flex flex-col gap-2">
                                                    {hasBoth && (
                                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                                            Items
                                                        </p>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {filteredLeafItems.map((item, i) => renderCard(item, i, false))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </ScrollArea>
                        </>
                    ) : (
                        <p className="p-4 text-sm text-muted-foreground">Select a node from the sidebar.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
