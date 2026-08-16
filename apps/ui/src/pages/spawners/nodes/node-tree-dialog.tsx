import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { readImportedNodes } from '@/hooks/use-imported-nodes.ts';
import { NodeTreeView } from '@/pages/spawners/nodes/node-tree-view.tsx';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';
import { queryClient } from '@/query-client.ts';
import { trpc } from '@/trpc.ts';

interface NodeTreeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type Walked = { current: LootNode | undefined; parent: LootNode | undefined };

function walk(root: LootNode | undefined, pathParts: string[]): Walked {
    let current = root;
    let parent: LootNode | undefined;

    for (const part of pathParts) {
        parent = current;
        current = current?.Children?.find((child) => child.Name.toLowerCase() === part.toLowerCase());
        if (!current) break;
    }

    return { current, parent };
}

function walkImportedNodes(parts: string[]): Walked | undefined {
    for (const tree of Object.values(readImportedNodes())) {
        if (tree.Name.toLowerCase() !== parts[0].toLowerCase()) continue;

        const walked = walk(tree, parts.slice(1));
        if (walked.current) return walked;
    }

    return undefined;
}

export function NodeTreeDialog({ open, onOpenChange }: NodeTreeDialogProps) {
    const [title, setTitle] = useState('');
    const [treeNode, setTreeNode] = useState<LootNode | null>(null);

    const openForNode = async (nodeId: string) => {
        const parts = nodeId.split('.');
        const fileName = `${parts[1]}.json`;
        const pathParts = parts.slice(1);

        const show = ({ current, parent }: Walked) => {
            if (current && (!current.Children || current.Children.length === 0)) {
                setTreeNode({
                    Name: parent?.Name ?? nodeId,
                    Rarity: parent?.Rarity ?? current.Rarity,
                    Children: [current],
                });
            } else {
                setTreeNode(current ?? null);
            }

            setTitle(nodeId);
            onOpenChange(true);
        };

        const custom = walkImportedNodes(parts);

        if (custom) {
            show(custom);
            return;
        }

        try {
            const vanilla: LootNode = await queryClient.fetchQuery(trpc.nodes.get.queryOptions(fileName));
            show(walk(vanilla, pathParts));
        } catch {
            setTitle(nodeId);
            setTreeNode(null);
            onOpenChange(true);
        }
    };

    return {
        openForNode,
        dialog: (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>Node tree structure.</DialogDescription>
                    </DialogHeader>
                    {treeNode ? (
                        <NodeTreeView key={title} treeNode={treeNode} initialExpanded={true} />
                    ) : (
                        <p className="text-sm text-muted-foreground">Node not found.</p>
                    )}
                </DialogContent>
            </Dialog>
        ),
    };
}
