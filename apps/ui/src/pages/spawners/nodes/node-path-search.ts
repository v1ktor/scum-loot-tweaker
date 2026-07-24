import type { NodePathEntry } from '@/pages/spawners/spawners.types.ts';

function normalize(value: string): string {
    return value.replace(/[._-]/g, ' ').toLowerCase();
}

export function searchNodePaths(entries: NodePathEntry[], query: string, limit = 50): NodePathEntry[] {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
        return [];
    }

    const tokens = normalize(trimmed).split(' ').filter(Boolean);
    const leafMatches: NodePathEntry[] = [];
    const otherMatches: NodePathEntry[] = [];

    for (const entry of entries) {
        const normalizedPath = normalize(entry.path);

        if (!tokens.every((token) => normalizedPath.includes(token))) {
            continue;
        }

        const lastSegment = normalize(entry.path.slice(entry.path.lastIndexOf('.') + 1));

        if (tokens.every((token) => lastSegment.includes(token))) {
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
