import { useQuery } from '@tanstack/react-query';
import { NetworkIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { NodeTreeView } from '@/pages/spawners/nodes/node-tree-view.tsx';
import { trpc } from '@/trpc.ts';

export function Nodes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const nodeParam = searchParams.get('node');
    const parts = nodeParam ? nodeParam.split('.') : [];
    const selectedFile = parts[0] ? `${parts[0]}.json` : null;

    const [fileSearch, setFileSearch] = useState('');

    const { data: nodeFiles = [] } = useQuery(trpc.nodes.list.queryOptions());

    const { data: treeNode, isLoading: isLoadingNode } = useQuery({
        ...trpc.nodes.get.queryOptions(selectedFile ?? ''),
        enabled: !!selectedFile,
    });

    const initialPath = treeNode && parts.length > 0 ? [treeNode.Name, ...parts] : undefined;

    const filteredFiles = nodeFiles.filter((file) =>
        file.replace('.json', '').toLowerCase().includes(fileSearch.toLowerCase()),
    );

    const handleFileSelect = (file: string) => {
        setSearchParams({ node: file.replace('.json', '') });
    };

    const handlePathChange = (path: string[]) => {
        const urlPath = path.slice(1);
        if (urlPath.length === 0) return;
        setSearchParams({ node: urlPath.join('.') }, { replace: true });
    };

    return (
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-3.5rem)] overflow-hidden">
            <div className="flex gap-4 flex-1 min-h-0">
                <div className="w-56 shrink-0 flex flex-col gap-2 min-h-0">
                    <div className="relative shrink-0">
                        <Input
                            placeholder="Search nodes..."
                            value={fileSearch}
                            onChange={(e) => setFileSearch(e.target.value)}
                            className={fileSearch ? 'pr-8' : ''}
                        />
                        {fileSearch && (
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setFileSearch('')}
                            >
                                <XIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <ScrollArea className="flex-1 min-h-0 rounded-md border">
                        <div className="p-1">
                            {filteredFiles.map((file) => {
                                const name = file.replace('.json', '');
                                const isSelected = selectedFile === file;

                                return (
                                    <button
                                        key={file}
                                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm transition-colors ${
                                            isSelected
                                                ? 'bg-accent text-accent-foreground font-medium'
                                                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                                        }`}
                                        onClick={() => handleFileSelect(file)}
                                    >
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex-1 flex flex-col min-h-0 min-w-0">
                    {!selectedFile ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                            <NetworkIcon className="size-10 opacity-30" />
                            <p className="text-sm">Select a node file to preview its tree</p>
                        </div>
                    ) : isLoadingNode ? (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                            Loading...
                        </div>
                    ) : treeNode ? (
                        <NodeTreeView
                            key={selectedFile}
                            treeNode={treeNode}
                            initialPath={initialPath}
                            initialExpanded={false}
                            onPathChange={handlePathChange}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                            Failed to load node file.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
