import { useQuery } from '@tanstack/react-query';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { trpc } from '@/trpc.ts';

function filenameToId(filename: string): string {
    return filename.replace('.json', '');
}

function filenameToLabel(filename: string): string {
    return filename.replace(/-/g, ' ').replace(/_/g, ' ').replace('.json', '');
}

export function useSpawnerOptions(): { spawnerOptions: Option[]; isLoading: boolean } {
    const { data: files, isLoading } = useQuery(trpc.spawners.list.queryOptions());

    const spawnerOptions: Option[] =
        files
            ?.map((filename) => ({
                value: filenameToId(filename),
                label: filenameToLabel(filename),
            }))
            .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

    return { spawnerOptions, isLoading };
}
