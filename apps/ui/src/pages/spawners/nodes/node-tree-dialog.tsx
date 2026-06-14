import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { NodeTreeView } from '@/pages/spawners/nodes/node-tree-view.tsx';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';
import { queryClient } from '@/query-client.ts';
import { trpc } from '@/trpc.ts';

interface NodeTreeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NodeTreeDialog({ open, onOpenChange }: NodeTreeDialogProps) {
    const [title, setTitle] = useState('');
    const [treeNode, setTreeNode] = useState<LootNode | null>(null);

    const openForNode = async (nodeId: string) => {
        const parts = nodeId.split('.');
        const fileName = `${parts[1]}.json`;
        const pathParts = parts.slice(1);

        try {
            let current: LootNode | undefined = await queryClient.fetchQuery(trpc.nodes.get.queryOptions(fileName));
            let parent: LootNode | undefined;

            for (const part of pathParts) {
                parent = current;
                current = current?.Children?.find((c) => {
                    return c.Name.toLowerCase() === part.toLowerCase();
                });
                if (!current) break;
            }

            if (current && (!current.Children || current.Children.length === 0)) {
                const wrapper: LootNode = {
                    Name: parent?.Name ?? nodeId,
                    Rarity: parent?.Rarity ?? current.Rarity,
                    Children: [current],
                };
                setTreeNode(wrapper);
            } else {
                setTreeNode(current ?? null);
            }

            setTitle(nodeId);
            onOpenChange(true);
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
