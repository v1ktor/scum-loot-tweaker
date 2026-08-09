import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { trpc } from '@/trpc.ts';

export function useCharacterOptions(): { characterOptions: Option[]; isLoading: boolean } {
    const { data: characters, isLoading } = useQuery(trpc.characters.list.queryOptions());

    const characterOptions = useMemo<Option[]>(
        () => characters?.map((character) => ({ value: character.id, label: character.name })) ?? [],
        [characters],
    );

    return { characterOptions, isLoading };
}
