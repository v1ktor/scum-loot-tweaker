import { ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import type { Node } from '@/pages/nodes/Nodes.types.ts';
import {
    countAllLeafItems,
    countLeafItems,
    nodeHasMatchingLeafs,
    nodeMatchesFilter,
} from '@/pages/spawners/nodes/utils.ts';

export interface TreeSidebarItemProps {
    node: Node;
    depth: number;
    filter: string;
    selectedNode: Node | null;
    onSelect: (node: Node, path: string[]) => void;
    defaultExpanded?: boolean;
    path?: string[];
}

export function TreeSidebarItem({
    node,
    depth,
    filter,
    selectedNode,
    onSelect,
    defaultExpanded = false,
    path = [],
}: TreeSidebarItemProps) {
    const [expanded, setExpanded] = useState(depth === 0 || defaultExpanded);
    const currentPath = [...path, node.Name];
    const branchChildren = node.Children?.filter((c) => c.Children && c.Children.length > 0) ?? [];
    const hasLeafItems = node.Children?.some((c) => !c.Children || c.Children.length === 0) ?? false;
    const isSelected = selectedNode === node;

    if (filter && !nodeMatchesFilter(node, filter)) {
        return null;
    }

    const visibleBranches = filter
        ? branchChildren.filter((child) => nodeMatchesFilter(child, filter))
        : branchChildren;

    return (
        <div className="relative">
            <div
                className={`flex items-center gap-1 py-1 px-1.5 rounded-sm text-sm transition-colors ${
                    isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 text-muted-foreground'
                } ${hasLeafItems ? 'cursor-pointer' : ''}`}
                style={{ paddingLeft: depth * 12 + 6 }}
                onClick={() => {
                    if (hasLeafItems) {
                        onSelect(node, currentPath);
                    }
                }}
            >
                {branchChildren.length > 0 ? (
                    <ChevronRightIcon
                        className={`h-3.5 w-3.5 shrink-0 transition-transform cursor-pointer ${expanded ? 'rotate-90' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((prev) => !prev);
                        }}
                    />
                ) : (
                    <span className="w-3.5 shrink-0" />
                )}
                <span className="truncate">{node.Name}</span>
                {!filter && hasLeafItems && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                {filter && nodeHasMatchingLeafs(node, filter) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                )}
                <span className="text-[10px] text-muted-foreground shrink-0">
                    {countLeafItems(node)}/{countAllLeafItems(node)}
                </span>
                <Badge variant="outline" className="ml-auto text-[10px] px-1 py-0 shrink-0">
                    {node.Rarity}
                </Badge>
            </div>
            {expanded && visibleBranches.length > 0 && (
                <div className="relative">
                    <div
                        className="absolute left-3.5 top-0 bottom-2 w-px bg-border"
                        style={{ marginLeft: depth * 12 }}
                    />
                    {visibleBranches.map((child, index) => (
                        <TreeSidebarItem
                            key={index}
                            node={child}
                            depth={depth + 1}
                            filter={filter}
                            selectedNode={selectedNode}
                            onSelect={onSelect}
                            defaultExpanded={defaultExpanded}
                            path={currentPath}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
