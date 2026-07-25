import fs from 'node:fs';
import path from 'node:path';
import { NODES_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';
import { GetNodeSchema, type LootNode } from '../../models/nodes/index.ts';

export type NodePathEntry = {
    path: string;
    isLeaf: boolean;
    rarity: string;
};

function flatten(node: LootNode, prefix: string[], out: NodePathEntry[]): void {
    const parts = [...prefix, node.Name];

    if (prefix.length > 0) {
        out.push({ path: parts.join('.'), isLeaf: (node.Children?.length ?? 0) === 0, rarity: node.Rarity });
    }

    for (const child of node.Children ?? []) {
        flatten(child, parts, out);
    }
}

export const paths = publicProcedure.query(() => {
    if (!fs.existsSync(NODES_DIR)) {
        return [];
    }

    const out: NodePathEntry[] = [];

    for (const file of fs.readdirSync(NODES_DIR)) {
        if (!file.endsWith('.json')) continue;

        const fullPath = path.join(NODES_DIR, file);
        const parsed = GetNodeSchema.parse(JSON.parse(fs.readFileSync(fullPath, 'utf-8')));

        flatten(parsed, [], out);
    }

    return out;
});
