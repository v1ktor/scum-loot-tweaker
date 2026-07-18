import { XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
    buildSpawnerTree,
    countMatchingFiles,
    findCategoryPath,
} from '@/pages/spawners/spawner-tree/build-spawner-tree.ts';
import { SpawnerTreeItem } from '@/pages/spawners/spawner-tree/spawner-tree-item.tsx';

export function SpawnerTreeSidebar({
    filenames,
    selectedFilename,
    onSelect,
    onAddToMySpawners,
    onAddCategoryToMySpawners,
    isLoading = false,
}: {
    filenames: string[];
    selectedFilename: string;
    onSelect: (filename: string, label: string) => void;
    onAddToMySpawners: (filename: string, label: string) => void;
    onAddCategoryToMySpawners: (filenames: string[], categoryName: string) => void;
    isLoading?: boolean;
}) {
    const [filter, setFilter] = useState('');
    const tree = useMemo(() => buildSpawnerTree(filenames), [filenames]);
    const selectedPath = useMemo(
        () => (selectedFilename ? findCategoryPath(tree, selectedFilename) : null),
        [tree, selectedFilename],
    );
    const matchingCount = useMemo(
        () => (filter ? countMatchingFiles(tree, filter) : filenames.length),
        [tree, filter, filenames.length],
    );

    return (
        <div className="flex w-[26rem] min-h-0 shrink-0 flex-col gap-2">
            <div className="flex shrink-0 items-center justify-between px-1 text-sm text-muted-foreground">
                <span>{filenames.length} spawners total</span>
                {filter && <span className="text-foreground">{matchingCount} matching</span>}
            </div>
            <Separator className="shrink-0" />
            <div className="relative shrink-0">
                <Input
                    placeholder={isLoading ? 'Loading spawners...' : 'Search for spawners...'}
                    disabled={isLoading}
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
            <ScrollArea className="min-h-0 flex-1 rounded-md border">
                <div className="p-2">
                    {tree.children.map((child) => (
                        <SpawnerTreeItem
                            key={child.name}
                            node={child}
                            depth={1}
                            filter={filter}
                            selectedFilename={selectedFilename}
                            onSelect={onSelect}
                            onAddToMySpawners={onAddToMySpawners}
                            onAddCategoryToMySpawners={onAddCategoryToMySpawners}
                            selectedPath={selectedPath}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
