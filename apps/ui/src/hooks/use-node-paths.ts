import { useQuery } from '@tanstack/react-query';
import type { NodePathEntry } from '@/pages/spawners/spawners.types.ts';
import { trpc } from '@/trpc.ts';

export function useNodePaths(): { nodePaths: NodePathEntry[]; isLoading: boolean } {
    const { data: nodePaths = [], isLoading } = useQuery(trpc.nodes.paths.queryOptions());

    return { nodePaths, isLoading };
}
