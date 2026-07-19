import type { NodePathEntry } from '@/pages/spawners/spawners.types.ts';

function normalize(value: string): string {
    return value.replace(/[._-]/g, ' ').toLowerCase();
}

export function searchNodePaths(entries: NodePathEntry[], query: string, limit = 50): NodePathEntry[] {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
        return [];
    }

    const normalizedQuery = normalize(trimmed);
    const leafMatches: NodePathEntry[] = [];
    const otherMatches: NodePathEntry[] = [];

    for (const entry of entries) {
        if (!normalize(entry.path).includes(normalizedQuery)) {
            continue;
        }

        const lastSegment = entry.path.slice(entry.path.lastIndexOf('.') + 1);

        if (normalize(lastSegment).includes(normalizedQuery)) {
            leafMatches.push(entry);
        } else {
            otherMatches.push(entry);
        }

        if (leafMatches.length >= limit) {
            break;
        }
    }

    return [...leafMatches, ...otherMatches].slice(0, limit);
}
