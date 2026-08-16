import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useImportedNodes } from '@/hooks/use-imported-nodes.ts';
import { flattenNodePaths, serializeNodeTree } from '@/pages/my-nodes/node-tree-ops.ts';
import type { NodePathEntry } from '@/pages/spawners/spawners.types.ts';
import { trpc } from '@/trpc.ts';

export function useNodePaths(): { nodePaths: NodePathEntry[]; isLoading: boolean } {
    const { data: vanillaPaths = [], isLoading } = useQuery(trpc.nodes.paths.queryOptions());
    const { importedNodes } = useImportedNodes();

    const nodePaths = useMemo(() => {
        const customPaths = Object.values(importedNodes).flatMap((node) =>
            flattenNodePaths(serializeNodeTree(node), true),
        );

        const byPath = new Map<string, NodePathEntry>();
        for (const entry of [...customPaths, ...vanillaPaths]) {
            if (!byPath.has(entry.path)) {
                byPath.set(entry.path, entry);
            }
        }

        return [...byPath.values()];
    }, [vanillaPaths, importedNodes]);

    return { nodePaths, isLoading };
}
