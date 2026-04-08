import { nodeFiles } from 'virtual:file-list';
import type { Option } from '@/pages/spawners/spawners.types.ts';

export const NODES_OPTIONS: Option[] = nodeFiles
    .map((filename) => ({
        value: filename,
        label: filename.replace('.json', ''),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
