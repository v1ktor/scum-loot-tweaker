import type { NodePathEntry } from '@/pages/spawners/spawners.types.ts';

export type VanillaChild = {
    name: string;
    path: string;
    isSubNode: boolean;
    rarity?: string;
};

export function getVanillaChildren(paths: NodePathEntry[], nodeId: string, takenNames?: Set<string>): VanillaChild[] {
    const prefix = `${nodeId.trim()}.`;

    if (prefix === '.') {
        return [];
    }

    const byName = new Map<string, VanillaChild>();

    for (const entry of paths) {
        if (entry.isCustom || !entry.path.startsWith(prefix)) {
            continue;
        }

        const name = entry.path.slice(prefix.length);

        if (name === '' || name.includes('.') || takenNames?.has(name) || byName.has(name)) {
            continue;
        }

        byName.set(name, { name, path: entry.path, isSubNode: !entry.isLeaf, rarity: entry.rarity });
    }

    return [...byName.values()];
}
