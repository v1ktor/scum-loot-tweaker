import { ChevronRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import { isSubNode } from '@/pages/my-nodes/node-tree-ops.ts';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';

export interface EditorTreeItemProps {
    node: LootNode;
    path: number[];
    depth: number;
    selectedPath: number[];
    onSelect: (path: number[]) => void;
}

const samePath = (a: number[], b: number[]) => a.length === b.length && a.every((value, i) => value === b[i]);

export function EditorTreeItem({ node, path, depth, selectedPath, onSelect }: EditorTreeItemProps) {
    const isAncestorOfSelected =
        selectedPath.length > path.length && path.every((value, i) => selectedPath[i] === value);
    const [expanded, setExpanded] = useState(depth === 0 || isAncestorOfSelected);

    useEffect(() => {
        if (isAncestorOfSelected) setExpanded(true);
    }, [isAncestorOfSelected]);

    const children = node.Children ?? [];
    const subNodes = children.map((child, index) => ({ child, index })).filter((entry) => isSubNode(entry.child));
    const itemCount = children.length - subNodes.length;
    const isSelected = samePath(path, selectedPath);

    return (
        <div className="relative">
            <div
                className={`flex items-center gap-1 py-1 px-1.5 rounded-sm text-sm transition-colors cursor-pointer ${
                    isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 text-muted-foreground'
                }`}
                style={{ paddingLeft: depth * 12 + 6 }}
                onClick={() => onSelect(path)}
            >
                {subNodes.length > 0 ? (
                    <ChevronRightIcon
                        className={`h-3.5 w-3.5 shrink-0 transition-transform cursor-pointer ${expanded ? 'rotate-90' : ''}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            setExpanded((prev) => !prev);
                        }}
                    />
                ) : (
                    <span className="w-3.5 shrink-0" />
                )}
                <span className={`truncate ${node.Name.trim() === '' ? 'italic text-destructive' : ''}`}>
                    {node.Name.trim() === '' ? 'Unnamed' : node.Name}
                </span>
                {itemCount > 0 && <span className="text-[10px] text-muted-foreground shrink-0">{itemCount}</span>}
                <Badge variant="outline" className="ml-auto text-[10px] px-1 py-0 shrink-0">
                    {node.Rarity}
                </Badge>
            </div>
            {expanded && subNodes.length > 0 && (
                <div className="relative">
                    <div
                        className="absolute left-3.5 top-0 bottom-2 w-px bg-border"
                        style={{ marginLeft: depth * 12 }}
                    />
                    {subNodes.map(({ child, index }) => (
                        <EditorTreeItem
                            key={index}
                            node={child}
                            path={[...path, index]}
                            depth={depth + 1}
                            selectedPath={selectedPath}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
