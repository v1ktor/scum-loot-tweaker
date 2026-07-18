import { ChevronRightIcon, CopyPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu.tsx';
import {
    collectFilenames,
    countFiles,
    nodeMatchesFilter,
    type SpawnerTreeNode,
} from '@/pages/spawners/spawner-tree/build-spawner-tree.ts';

function SpawnerTreeFileRow({
    filename,
    label,
    depth,
    isSelected,
    onClick,
    onAddToMySpawners,
}: {
    filename: string;
    label: string;
    depth: number;
    isSelected: boolean;
    onClick: () => void;
    onAddToMySpawners: (filename: string, label: string) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSelected) {
            ref.current?.scrollIntoView({ block: 'nearest' });
        }
    }, []);

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    ref={ref}
                    className={`flex items-start gap-1 py-1 px-1.5 rounded-sm text-sm cursor-pointer ${
                        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 text-muted-foreground'
                    }`}
                    style={{ paddingLeft: depth * 12 + 6 }}
                    onClick={onClick}
                >
                    <span className="w-3.5 shrink-0" />
                    <span className="min-w-0 break-words">{label}</span>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onSelect={() => onAddToMySpawners(filename, label)}>
                    <CopyPlus />
                    Add to My Spawners
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export interface SpawnerTreeItemProps {
    node: SpawnerTreeNode;
    depth: number;
    filter: string;
    selectedFilename: string;
    onSelect: (filename: string, label: string) => void;
    onAddToMySpawners: (filename: string, label: string) => void;
    onAddCategoryToMySpawners: (filenames: string[], categoryName: string) => void;
    defaultExpanded?: boolean;
    path?: string[];
    selectedPath?: string[] | null;
}

export function SpawnerTreeItem({
    node,
    depth,
    filter,
    selectedFilename,
    onSelect,
    onAddToMySpawners,
    onAddCategoryToMySpawners,
    defaultExpanded = false,
    path = [],
    selectedPath = null,
}: SpawnerTreeItemProps) {
    const currentPath = [...path, node.name];
    const isOnSelectedPath =
        !!selectedPath &&
        selectedPath.length >= currentPath.length &&
        currentPath.every((segment, i) => selectedPath[i] === segment);

    const [expanded, setExpanded] = useState(depth === 0 || defaultExpanded || isOnSelectedPath);

    useEffect(() => {
        if (filter || isOnSelectedPath) {
            setExpanded(true);
        }
    }, [filter, isOnSelectedPath]);

    if (filter && !nodeMatchesFilter(node, filter)) {
        return null;
    }

    const q = filter.toLowerCase();
    const visibleChildren = filter ? node.children.filter((c) => nodeMatchesFilter(c, filter)) : node.children;
    const visibleFiles = filter ? node.files.filter((f) => f.label.toLowerCase().includes(q)) : node.files;

    return (
        <div className="relative">
            {depth > 0 && (
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <div
                            className="flex items-center gap-1 py-1 px-1.5 rounded-sm text-sm cursor-pointer hover:bg-accent/50 text-muted-foreground"
                            style={{ paddingLeft: depth * 12 + 6 }}
                            onClick={() => setExpanded((prev) => !prev)}
                        >
                            <ChevronRightIcon
                                className={`h-3.5 w-3.5 shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
                            />
                            <span className="min-w-0 break-words">{node.name}</span>
                            <span className="text-[10px] text-muted-foreground shrink-0 ml-auto">
                                {countFiles(node)}
                            </span>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem onSelect={() => onAddCategoryToMySpawners(collectFilenames(node), node.name)}>
                            <CopyPlus />
                            Add {countFiles(node)} spawner{countFiles(node) === 1 ? '' : 's'} to My Spawners
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            )}
            {expanded && (
                <div className="relative">
                    {depth > 0 && (
                        <div
                            className="absolute left-3.5 top-0 bottom-2 w-px bg-border"
                            style={{ marginLeft: depth * 12 }}
                        />
                    )}
                    {visibleChildren.map((child) => (
                        <SpawnerTreeItem
                            key={child.name}
                            node={child}
                            depth={depth + 1}
                            filter={filter}
                            selectedFilename={selectedFilename}
                            onSelect={onSelect}
                            onAddToMySpawners={onAddToMySpawners}
                            onAddCategoryToMySpawners={onAddCategoryToMySpawners}
                            defaultExpanded={defaultExpanded}
                            path={currentPath}
                            selectedPath={selectedPath}
                        />
                    ))}
                    {visibleFiles.map((file) => (
                        <SpawnerTreeFileRow
                            key={file.filename}
                            filename={file.filename}
                            label={file.label}
                            depth={depth + 1}
                            isSelected={selectedFilename === file.filename}
                            onClick={() => onSelect(file.filename, file.label)}
                            onAddToMySpawners={onAddToMySpawners}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
