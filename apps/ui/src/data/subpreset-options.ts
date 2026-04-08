import { spawnerFiles } from 'virtual:file-list';
import type { Option } from '@/pages/spawners/Spawners.types.ts';

function filenameToId(filename: string): string {
    return filename.replace('.json', '');
}

function filenameToLabel(filename: string): string {
    return filename.replace(/-/g, ' ').replace(/_/g, ' ').replace('.json', '');
}

export const SUBPRESET_OPTIONS: Option[] = spawnerFiles
    .map((filename) => ({
        value: filenameToId(filename),
        label: filenameToLabel(filename),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
