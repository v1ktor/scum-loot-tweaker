import type { LootNode } from '@scum-loot-tweaker/server/src/api/models/nodes';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';

type Branch = LootNode & { Children: LootNode[] };

const isBranch = (node: LootNode): node is Branch => !!node.Children && node.Children.length > 0;
const isLeaf = (node: LootNode) => !isBranch(node);

export function countLeafItems(node: LootNode): number {
    return node.Children?.filter(isLeaf).length ?? 0;
}

export function countAllLeafItems(node: LootNode): number {
    if (!isBranch(node)) return 0;

    const branches = node.Children.filter(isBranch);

    return countLeafItems(node) + branches.reduce((sum, branch) => sum + countAllLeafItems(branch), 0);
}

export function nodeHasMatchingLeafs(node: LootNode, filter: string, itemsOptions: Option[]): boolean {
    return (
        node.Children?.some((c) => {
            return isLeaf(c) && getItemName(c.Name, itemsOptions).toLowerCase().includes(filter.toLowerCase());
        }) ?? false
    );
}

export function nodeMatchesFilter(node: LootNode, filter: string, itemsOptions: Option[]): boolean {
    if (!filter) return true;

    if (!isBranch(node)) {
        return getItemName(node.Name, itemsOptions).toLowerCase().includes(filter.toLowerCase());
    }

    return node.Children.some((child) => nodeMatchesFilter(child, filter, itemsOptions));
}

export function countFilteredLeafItems(node: LootNode, filter: string, itemsOptions: Option[]): number {
    if (!isBranch(node)) return 0;

    return node.Children.reduce((sum, child) => {
        if (!child.Children || child.Children.length === 0) {
            return getItemName(child.Name, itemsOptions).toLowerCase().includes(filter.toLowerCase()) ? sum + 1 : sum;
        }
        return sum + countFilteredLeafItems(child, filter, itemsOptions);
    }, 0);
}
