import { describe, expect, it } from 'vitest';
import { Rarity } from '@/data/rarity.ts';
import {
    addChildAt,
    adjustPathAfterRemoval,
    countNodeTree,
    createItemNode,
    createNodeTree,
    createSubNode,
    duplicateNodeAt,
    flattenNodePaths,
    getNamePath,
    getNodeAt,
    isSubNode,
    ROOT_NODE_NAME,
    removeNodeAt,
    serializeNodeTree,
    uniqueChildName,
    updateNodeAt,
    validateNodeTree,
} from '@/pages/my-nodes/node-tree-ops.ts';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';

const item = (Name: string, Rarity: LootNode['Rarity'] = 'Common'): LootNode => ({ Name, Rarity });

const branch = (Name: string, Children: LootNode[], Rarity: LootNode['Rarity'] = 'Uncommon'): LootNode => ({
    Name,
    Rarity,
    Children,
});

const tree = (): LootNode =>
    branch(ROOT_NODE_NAME, [
        branch('MyLoot', [branch('Guns', [item('AK47', 'Rare'), item('M1911')]), item('Bandage', 'Abundant')]),
    ]);

describe('createNodeTree', () => {
    it('creates an empty root when no top-level name is given', () => {
        expect(createNodeTree()).toEqual({ Name: ROOT_NODE_NAME, Rarity: Rarity.Uncommon, Children: [] });
    });

    it('seeds a top-level branch named after the file', () => {
        expect(createNodeTree('MyLoot').Children?.[0].Name).toBe('MyLoot');
    });

    it('ignores a blank top-level name', () => {
        expect(createNodeTree('   ').Children).toEqual([]);
    });
});

describe('isSubNode', () => {
    it('counts a brand new sub-node as a folder even before it has children', () => {
        expect(isSubNode(createSubNode('Guns'))).toBe(true);
    });

    it('counts a node with no children list as an item', () => {
        expect(isSubNode(createItemNode())).toBe(false);
    });
});

describe('getNodeAt / getNamePath', () => {
    it('finds the root when given no position', () => {
        expect(getNodeAt(tree(), [])?.Name).toBe(ROOT_NODE_NAME);
    });

    it('finds a nested node by its position in the tree', () => {
        expect(getNodeAt(tree(), [0, 0, 1])?.Name).toBe('M1911');
    });

    it('finds nothing when the position does not exist', () => {
        expect(getNodeAt(tree(), [0, 9])).toBeUndefined();
    });

    it('spells out the full path of names down to a node', () => {
        expect(getNamePath(tree(), [0, 0])).toEqual([ROOT_NODE_NAME, 'MyLoot', 'Guns']);
    });
});

describe('updateNodeAt', () => {
    it('edits a nested node without touching the original tree', () => {
        const original = tree();
        const updated = updateNodeAt(original, [0, 0, 0], (node) => ({ ...node, Rarity: 'ExtremelyRare' }));

        expect(getNodeAt(updated, [0, 0, 0])?.Rarity).toBe('ExtremelyRare');
        expect(getNodeAt(original, [0, 0, 0])?.Rarity).toBe('Rare');
    });

    it('leaves the tree alone when the position does not exist', () => {
        const original = tree();
        expect(updateNodeAt(original, [0, 9], (node) => ({ ...node, Name: 'x' }))).toEqual(original);
    });
});

describe('uniqueChildName', () => {
    it('keeps a name that nothing else is using', () => {
        expect(uniqueChildName(branch('p', [item('A')]), 'B')).toBe('B');
    });

    it('adds a suffix when the name is taken', () => {
        expect(uniqueChildName(branch('p', [item('A')]), 'A')).toBe('A_2');
    });

    it('keeps counting until it finds a free suffix', () => {
        expect(uniqueChildName(branch('p', [item('A'), item('A_2')]), 'A')).toBe('A_3');
    });
});

describe('addChildAt / removeNodeAt / duplicateNodeAt', () => {
    it('adds a child to the node you point at', () => {
        const updated = addChildAt(tree(), [0, 0], item('Deagle'));
        expect(getNodeAt(updated, [0, 0])?.Children?.map((c) => c.Name)).toEqual(['AK47', 'M1911', 'Deagle']);
    });

    it('removes the node you point at', () => {
        const updated = removeNodeAt(tree(), [0, 0, 0]);
        expect(getNodeAt(updated, [0, 0])?.Children?.map((c) => c.Name)).toEqual(['M1911']);
    });

    it('puts the copy right after the original and gives it a free name', () => {
        const updated = duplicateNodeAt(tree(), [0, 0]);
        expect(getNodeAt(updated, [0])?.Children?.map((c) => c.Name)).toEqual(['Guns', 'Guns_2', 'Bandage']);
    });

    it('copies the children too, so editing one does not change the other', () => {
        const updated = duplicateNodeAt(tree(), [0, 0]);
        expect(getNodeAt(updated, [0, 1])?.Children).not.toBe(getNodeAt(updated, [0, 0])?.Children);
        expect(getNodeAt(updated, [0, 1])?.Children?.map((c) => c.Name)).toEqual(['AK47', 'M1911']);
    });
});

describe('adjustPathAfterRemoval', () => {
    it('leaves an unrelated selection alone', () => {
        expect(adjustPathAfterRemoval([0, 1], [1, 0])).toEqual([0, 1]);
    });

    it('falls back to the parent when the selected node is deleted', () => {
        expect(adjustPathAfterRemoval([0, 1, 2], [0, 1])).toEqual([0]);
    });

    it('follows a node that moves up when an earlier sibling is deleted', () => {
        expect(adjustPathAfterRemoval([0, 2], [0, 1])).toEqual([0, 1]);
    });

    it('follows a node nested inside one that moves up', () => {
        expect(adjustPathAfterRemoval([0, 2, 5], [0, 1])).toEqual([0, 1, 5]);
    });

    it('leaves a node above the deleted one alone', () => {
        expect(adjustPathAfterRemoval([0, 0], [0, 1])).toEqual([0, 0]);
    });
});

describe('serializeNodeTree', () => {
    it('drops the empty children list from an item', () => {
        const result = serializeNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [item('AK47')])]));
        expect(result.Children?.[0].Children?.[0]).toEqual({ Name: 'AK47', Rarity: 'Common' });
    });

    it('skips sub-nodes that ended up empty', () => {
        const result = serializeNodeTree(
            branch(ROOT_NODE_NAME, [branch('MyLoot', [item('AK47'), createSubNode('Empty')])]),
        );
        expect(result.Children?.[0].Children?.map((c) => c.Name)).toEqual(['AK47']);
    });

    it('skips items that were never given an Id', () => {
        const result = serializeNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [item('AK47'), item('  ')])]));
        expect(result.Children?.[0].Children?.map((c) => c.Name)).toEqual(['AK47']);
    });

    it('skips a sub-node left empty once its unusable children are dropped', () => {
        const result = serializeNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [branch('Guns', [item('')])])]));
        expect(result.Children).toEqual([]);
    });

    it('keeps variations and post spawn actions that have entries, drops the empty ones', () => {
        const withExtras: LootNode = {
            Name: 'AK47',
            Rarity: 'Rare',
            Variations: ['AK47_Wood', '  '],
            PostSpawnActions: [],
        };
        const result = serializeNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [withExtras])]));

        expect(result.Children?.[0].Children?.[0]).toEqual({
            Name: 'AK47',
            Rarity: 'Rare',
            Variations: ['AK47_Wood'],
        });
    });

    it('trims stray spaces from names', () => {
        const result = serializeNodeTree(branch(ROOT_NODE_NAME, [branch('  MyLoot  ', [item(' AK47 ')])]));
        expect(result.Children?.[0].Name).toBe('MyLoot');
        expect(result.Children?.[0].Children?.[0].Name).toBe('AK47');
    });

    it('still writes a root when there is nothing left to put in it', () => {
        expect(serializeNodeTree(createNodeTree())).toEqual({
            Name: ROOT_NODE_NAME,
            Rarity: Rarity.Uncommon,
            Children: [],
        });
    });

    it('only writes the merge mode when it is set to Replace', () => {
        const withMode = (mode?: 'UpdateOrAdd' | 'Replace'): LootNode => ({
            Name: ROOT_NODE_NAME,
            Rarity: 'Uncommon',
            Children: [{ Name: 'Trash', Rarity: 'Uncommon', ChildrenMergeMode: mode, Children: [item('Apple')] }],
        });

        expect(serializeNodeTree(withMode('Replace')).Children?.[0].ChildrenMergeMode).toBe('Replace');
        expect(serializeNodeTree(withMode('UpdateOrAdd')).Children?.[0]).not.toHaveProperty('ChildrenMergeMode');
        expect(serializeNodeTree(withMode()).Children?.[0]).not.toHaveProperty('ChildrenMergeMode');
    });

    it('never puts a merge mode on an item', () => {
        const result = serializeNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [item('AK47')])]));
        expect(result.Children?.[0].Children?.[0]).not.toHaveProperty('ChildrenMergeMode');
    });

    it('leaves the rarity out when it was never set', () => {
        const noRarity: LootNode = {
            Name: 'ItemLootTreeNodes',
            Children: [{ Name: 'Trash', Children: [{ Name: 'Apple' }] }],
        };
        const result = serializeNodeTree(noRarity);

        expect(result).not.toHaveProperty('Rarity');
        expect(result.Children?.[0]).not.toHaveProperty('Rarity');
        expect(result.Children?.[0].Children?.[0]).toEqual({ Name: 'Apple' });
    });

    it('keeps a renamed root', () => {
        const result = serializeNodeTree(branch('VehicleLootTreeNodes', [branch('MyLoot', [item('AK47')])]));
        expect(result.Name).toBe('VehicleLootTreeNodes');
    });

    it('falls back to the vanilla root name without losing the tree', () => {
        const result = serializeNodeTree(branch('   ', [branch('MyLoot', [item('AK47')])]));

        expect(result.Name).toBe(ROOT_NODE_NAME);
        expect(result.Children?.[0].Children?.map((c) => c.Name)).toEqual(['AK47']);
    });
});

describe('validateNodeTree', () => {
    it('has nothing to say about a well-formed tree', () => {
        expect(validateNodeTree(tree())).toEqual([]);
    });

    it('warns about sub-nodes with nothing in them', () => {
        const issues = validateNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [createSubNode('Empty')])]));
        expect(issues).toContainEqual({ path: 'MyLoot.Empty', message: 'Sub-node is empty and will be skipped' });
    });

    it('warns about items with no Id', () => {
        const issues = validateNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [item('')])]));
        expect(issues).toContainEqual({ path: 'MyLoot', message: 'An item has no Id' });
    });

    it('warns when two children share a name', () => {
        const issues = validateNodeTree(branch(ROOT_NODE_NAME, [branch('MyLoot', [item('AK47'), item('AK47')])]));
        expect(issues).toContainEqual({ path: 'MyLoot', message: 'Duplicate child "AK47"' });
    });

    it('says nothing when the root is left unnamed, since it falls back on its own', () => {
        expect(validateNodeTree(branch('  ', [branch('MyLoot', [item('AK47')])]))).toEqual([]);
    });

    it('accepts a renamed root', () => {
        expect(validateNodeTree(branch('VehicleLootTreeNodes', [branch('MyLoot', [item('AK47')])]))).toEqual([]);
    });
});

describe('flattenNodePaths', () => {
    it('starts every path at the root without listing the root itself', () => {
        expect(flattenNodePaths(tree()).map((entry) => entry.path)).toEqual([
            'ItemLootTreeNodes.MyLoot',
            'ItemLootTreeNodes.MyLoot.Guns',
            'ItemLootTreeNodes.MyLoot.Guns.AK47',
            'ItemLootTreeNodes.MyLoot.Guns.M1911',
            'ItemLootTreeNodes.MyLoot.Bandage',
        ]);
    });

    it('marks nodes with no children as items', () => {
        const entries = flattenNodePaths(tree());
        expect(entries.find((e) => e.path.endsWith('.Guns'))?.isLeaf).toBe(false);
        expect(entries.find((e) => e.path.endsWith('.AK47'))?.isLeaf).toBe(true);
    });

    it('tags the paths as custom when asked', () => {
        expect(flattenNodePaths(tree(), true).every((entry) => entry.isCustom)).toBe(true);
    });

    it('starts every path at a renamed root', () => {
        const renamed = branch('VehicleLootTreeNodes', [branch('MyLoot', [item('AK47')])]);
        expect(flattenNodePaths(renamed).map((entry) => entry.path)).toEqual([
            'VehicleLootTreeNodes.MyLoot',
            'VehicleLootTreeNodes.MyLoot.AK47',
        ]);
    });
});

describe('countNodeTree', () => {
    it('counts every sub-node and item in the tree', () => {
        expect(countNodeTree(tree())).toEqual({ subNodes: 2, items: 3 });
    });
});
