import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getVanillaChildren, type VanillaChild } from '@/pages/my-nodes/vanilla-children.ts';
import { trpc } from '@/trpc.ts';

const SEPARATOR = '\n';

export function useVanillaChildren(nodeId: string, takenNames: string[]): VanillaChild[] {
    const { data: vanillaPaths = [] } = useQuery(trpc.nodes.paths.queryOptions());
    const takenKey = takenNames.join(SEPARATOR);

    return useMemo(
        () => getVanillaChildren(vanillaPaths, nodeId, new Set(takenKey === '' ? [] : takenKey.split(SEPARATOR))),
        [vanillaPaths, nodeId, takenKey],
    );
}
