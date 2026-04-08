import type { Node } from '@/pages/nodes/nodes.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';

type Branch = Node & { Children: Node[] };

const isBranch = (node: Node): node is Branch => !!node.Children && node.Children.length > 0;
const isLeaf = (node: Node) => !isBranch(node);

export function countLeafItems(node: Node): number {
    return node.Children?.filter(isLeaf).length ?? 0;
}

export function countAllLeafItems(node: Node): number {
    if (!isBranch(node)) return 0;

    const branches = node.Children.filter(isBranch);

    return countLeafItems(node) + branches.reduce((sum, branch) => sum + countAllLeafItems(branch), 0);
}

export function nodeHasMatchingLeafs(node: Node, filter: string): boolean {
    return (
        node.Children?.some((c) => {
            return isLeaf(c) && getItemName(c.Name).toLowerCase().includes(filter.toLowerCase());
        }) ?? false
    );
}

export function nodeMatchesFilter(node: Node, filter: string): boolean {
    if (!filter) return true;

    if (!isBranch(node)) {
        return getItemName(node.Name).toLowerCase().includes(filter.toLowerCase());
    }

    return node.Children.some((child) => nodeMatchesFilter(child, filter));
}

export function countFilteredLeafItems(node: Node, filter: string): number {
    if (!isBranch(node)) return 0;

    return node.Children.reduce((sum, child) => {
        if (!child.Children || child.Children.length === 0) {
            return getItemName(child.Name).toLowerCase().includes(filter.toLowerCase()) ? sum + 1 : sum;
        }
        return sum + countFilteredLeafItems(child, filter);
    }, 0);
}
