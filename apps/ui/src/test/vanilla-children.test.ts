import { describe, expect, it } from 'vitest';
import { findVanillaNode, getVanillaChildren, vanillaFileName } from '@/pages/my-nodes/vanilla-children.ts';
import type { LootNode, NodePathEntry } from '@/pages/spawners/spawners.types.ts';

const entry = (path: string, isLeaf: boolean, rarity?: string, isCustom?: boolean): NodePathEntry => ({
    path,
    isLeaf,
    rarity,
    isCustom,
});

const paths: NodePathEntry[] = [
    entry('ItemLootTreeNodes.Bar', false, 'Uncommon'),
    entry('ItemLootTreeNodes.Bar.Drinks', false, 'Common'),
    entry('ItemLootTreeNodes.Bar.Drinks.Beer', true, 'Abundant'),
    entry('ItemLootTreeNodes.Bar.Ashtray', true, 'Rare'),
    entry('ItemLootTreeNodes.Barn', false, 'Uncommon'),
];

describe('getVanillaChildren', () => {
    it('returns only the direct children of the given Id, in file order', () => {
        expect(getVanillaChildren(paths, 'ItemLootTreeNodes.Bar')).toEqual([
            { name: 'Drinks', path: 'ItemLootTreeNodes.Bar.Drinks', isSubNode: true, rarity: 'Common' },
            { name: 'Ashtray', path: 'ItemLootTreeNodes.Bar.Ashtray', isSubNode: false, rarity: 'Rare' },
        ]);
    });

    it('returns the top-level nodes for the root Id', () => {
        expect(getVanillaChildren(paths, 'ItemLootTreeNodes').map((child) => child.name)).toEqual(['Bar', 'Barn']);
    });

    it('skips children the user already defines', () => {
        expect(
            getVanillaChildren(paths, 'ItemLootTreeNodes.Bar', new Set(['Drinks'])).map((child) => child.name),
        ).toEqual(['Ashtray']);
    });

    it('ignores custom paths so a node file does not list itself', () => {
        const withCustom = [...paths, entry('ItemLootTreeNodes.Bar.MyLoot', true, 'Rare', true)];

        expect(getVanillaChildren(withCustom, 'ItemLootTreeNodes.Bar').map((child) => child.name)).toEqual([
            'Drinks',
            'Ashtray',
        ]);
    });

    it('dedupes children with the same name coming from different files', () => {
        const duplicated = [...paths, entry('ItemLootTreeNodes.Bar.Ashtray', true, 'Common')];

        expect(getVanillaChildren(duplicated, 'ItemLootTreeNodes.Bar')).toHaveLength(2);
    });

    it('returns nothing for an empty Id', () => {
        expect(getVanillaChildren(paths, '   ')).toEqual([]);
    });
});

const barFile: LootNode = {
    Name: 'ItemLootTreeNodes',
    Rarity: 'Uncommon',
    Children: [
        {
            Name: 'Bar',
            Rarity: 'Uncommon',
            Children: [
                { Name: 'Drinks', Rarity: 'Common', Children: [{ Name: 'Beer', Rarity: 'Abundant' }] },
                { Name: 'Ashtray', Rarity: 'Rare' },
            ],
        },
    ],
};

describe('vanillaFileName', () => {
    it('takes the file name from the second segment of the path', () => {
        expect(vanillaFileName('ItemLootTreeNodes.Bar.Drinks')).toBe('Bar.json');
    });
});

describe('findVanillaNode', () => {
    it('walks the file down to the node the path points at', () => {
        expect(findVanillaNode(barFile, 'ItemLootTreeNodes.Bar.Drinks')?.Children).toEqual([
            { Name: 'Beer', Rarity: 'Abundant' },
        ]);
    });

    it('finds a leaf item', () => {
        expect(findVanillaNode(barFile, 'ItemLootTreeNodes.Bar.Ashtray')).toEqual({ Name: 'Ashtray', Rarity: 'Rare' });
    });

    it('returns the root itself for a single-segment path', () => {
        expect(findVanillaNode(barFile, 'ItemLootTreeNodes')).toBe(barFile);
    });

    it('returns nothing when the path is not in the file', () => {
        expect(findVanillaNode(barFile, 'ItemLootTreeNodes.Bar.Nope.Deeper')).toBeUndefined();
    });
});
