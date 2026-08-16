import { Rarity } from '@/data/rarity.ts';
import type { LootNode, NodePathEntry } from '@/pages/spawners/spawners.types.ts';

export const ROOT_NODE_NAME = 'ItemLootTreeNodes';

export const isSubNode = (node: LootNode) => Array.isArray(node.Children);

export function createNodeTree(topLevelName?: string): LootNode {
    const children = topLevelName?.trim() ? [createSubNode(topLevelName.trim())] : [];

    return { Name: ROOT_NODE_NAME, Rarity: Rarity.Uncommon, Children: children };
}

export function createSubNode(name: string): LootNode {
    return { Name: name, Rarity: Rarity.Uncommon, Children: [] };
}

export function createItemNode(): LootNode {
    return { Name: '', Rarity: Rarity.Common };
}

export function getNodeAt(root: LootNode, path: number[]): LootNode | undefined {
    let current: LootNode | undefined = root;

    for (const index of path) {
        current = current?.Children?.[index];
    }

    return current;
}

export function getNamePath(root: LootNode, path: number[]): string[] {
    const names = [root.Name];
    let current: LootNode | undefined = root;

    for (const index of path) {
        current = current?.Children?.[index];
        if (!current) break;
        names.push(current.Name);
    }

    return names;
}

export function updateNodeAt(root: LootNode, path: number[], updater: (node: LootNode) => LootNode): LootNode {
    if (path.length === 0) {
        return updater(root);
    }

    const [index, ...rest] = path;
    const children = root.Children ?? [];

    if (!children[index]) {
        return root;
    }

    return {
        ...root,
        Children: children.map((child, i) => (i === index ? updateNodeAt(child, rest, updater) : child)),
    };
}

export function uniqueChildName(parent: LootNode, base: string): string {
    const taken = new Set((parent.Children ?? []).map((child) => child.Name));

    if (!taken.has(base)) {
        return base;
    }

    let counter = 2;
    while (taken.has(`${base}_${counter}`)) {
        counter++;
    }

    return `${base}_${counter}`;
}

export function addChildAt(root: LootNode, parentPath: number[], child: LootNode): LootNode {
    return updateNodeAt(root, parentPath, (node) => ({ ...node, Children: [...(node.Children ?? []), child] }));
}

export function removeNodeAt(root: LootNode, path: number[]): LootNode {
    if (path.length === 0) {
        return root;
    }

    const index = path[path.length - 1];

    return updateNodeAt(root, path.slice(0, -1), (node) => ({
        ...node,
        Children: (node.Children ?? []).filter((_, i) => i !== index),
    }));
}

export function duplicateNodeAt(root: LootNode, path: number[]): LootNode {
    if (path.length === 0) {
        return root;
    }

    const parentPath = path.slice(0, -1);
    const index = path[path.length - 1];
    const parent = getNodeAt(root, parentPath);
    const original = parent?.Children?.[index];

    if (!parent || !original) {
        return root;
    }

    const copy = { ...structuredClone(original), Name: uniqueChildName(parent, original.Name) };

    return updateNodeAt(root, parentPath, (node) => {
        const children = [...(node.Children ?? [])];
        children.splice(index + 1, 0, copy);

        return { ...node, Children: children };
    });
}

export function adjustPathAfterRemoval(selected: number[], removed: number[]): number[] {
    if (removed.length === 0) {
        return selected;
    }

    const parentDepth = removed.length - 1;

    if (selected.length >= removed.length && removed.every((index, i) => selected[i] === index)) {
        return removed.slice(0, -1);
    }

    const isLaterSibling =
        selected.length > parentDepth &&
        removed.slice(0, parentDepth).every((index, i) => selected[i] === index) &&
        selected[parentDepth] > removed[parentDepth];

    if (!isLaterSibling) {
        return selected;
    }

    const adjusted = [...selected];
    adjusted[parentDepth] -= 1;

    return adjusted;
}

function cleanNode(node: LootNode): LootNode | null {
    const name = node.Name.trim();
    const variations = node.Variations?.filter((variation) => variation.trim() !== '') ?? [];
    const postSpawnActions = node.PostSpawnActions ?? [];

    if (name === '') {
        return null;
    }

    const cleaned: LootNode = { Name: name };

    if (node.Rarity !== undefined) {
        cleaned.Rarity = node.Rarity;
    }

    if (isSubNode(node)) {
        const children = (node.Children ?? []).map(cleanNode).filter((child): child is LootNode => child !== null);

        if (children.length === 0) {
            return null;
        }

        if (node.ChildrenMergeMode === 'Replace') {
            cleaned.ChildrenMergeMode = 'Replace';
        }

        cleaned.Children = children;
    }

    if (variations.length > 0) {
        cleaned.Variations = variations;
    }

    if (postSpawnActions.length > 0) {
        cleaned.PostSpawnActions = postSpawnActions;
    }

    return cleaned;
}

export function serializeNodeTree(root: LootNode): LootNode {
    const name = root.Name.trim() || ROOT_NODE_NAME;

    return cleanNode({ ...root, Name: name }) ?? { Name: name, Rarity: root.Rarity, Children: [] };
}

export type NodeTreeIssue = { path: string; message: string };

export function validateNodeTree(root: LootNode): NodeTreeIssue[] {
    const issues: NodeTreeIssue[] = [];

    const walk = (node: LootNode, prefix: string[]) => {
        const label = prefix.length > 0 ? prefix.join('.') : node.Name;

        if (!isSubNode(node)) {
            if (node.Name.trim() === '') {
                issues.push({ path: prefix.slice(0, -1).join('.') || root.Name, message: 'An item has no Id' });
            }
            return;
        }

        const children = node.Children ?? [];

        if (children.length === 0) {
            issues.push({ path: label, message: 'Sub-node is empty and will be skipped' });
        }

        const seen = new Set<string>();
        for (const child of children) {
            const name = child.Name.trim();
            if (name !== '' && seen.has(name)) {
                issues.push({ path: label, message: `Duplicate child "${name}"` });
            }
            seen.add(name);
        }

        for (const child of children) {
            walk(child, [...prefix, child.Name]);
        }
    };

    walk(root, []);

    return issues;
}

export function flattenNodePaths(root: LootNode, isCustom = false): NodePathEntry[] {
    const out: NodePathEntry[] = [];

    const walk = (node: LootNode, prefix: string[]) => {
        const parts = [...prefix, node.Name];

        if (prefix.length > 0) {
            out.push({
                path: parts.join('.'),
                isLeaf: (node.Children?.length ?? 0) === 0,
                rarity: node.Rarity,
                isCustom,
            });
        }

        for (const child of node.Children ?? []) {
            walk(child, parts);
        }
    };

    walk(root, []);

    return out;
}

export function countNodeTree(root: LootNode): { subNodes: number; items: number } {
    let subNodes = 0;
    let items = 0;

    const walk = (node: LootNode) => {
        for (const child of node.Children ?? []) {
            if (isSubNode(child)) {
                subNodes++;
                walk(child);
            } else {
                items++;
            }
        }
    };

    walk(root);

    return { subNodes, items };
}
