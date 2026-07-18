import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { trpc } from '@/trpc.ts';

export function useItemsOptions(): { itemsOptions: Option[]; isLoading: boolean } {
    const { data: items, isLoading } = useQuery(trpc.items.list.queryOptions());

    const itemsOptions = useMemo<Option[]>(
        () => items?.map((item) => ({ value: item.id, label: item.name })) ?? [],
        [items],
    );

    return { itemsOptions, isLoading };
}
