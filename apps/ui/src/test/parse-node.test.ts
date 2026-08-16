import { describe, expect, it } from 'vitest';
import { parseNodeJson } from '@/utils/parse-node.ts';

const docsMyTrashJson = JSON.stringify({
    Name: 'ItemLootTreeNodes',
    Children: [
        {
            Name: 'Trash',
            ChildrenMergeMode: 'Replace',
            Children: [
                {
                    Name: 'Drinks',
                    Rarity: 'Abundant',
                    Children: [
                        { Name: 'Water_05l', Rarity: 'Abundant' },
                        { Name: 'Beer', Rarity: 'Rare' },
                    ],
                },
                {
                    Name: 'Food',
                    Rarity: 'Common',
                    Children: [{ Name: 'Apple' }, { Name: 'Banana' }],
                },
            ],
        },
    ],
});

describe('parseNodeJson', () => {
    it('rejects a file that is not valid JSON', () => {
        const result = parseNodeJson('{ nope');
        expect(result).toEqual({ ok: false, error: 'The file is not valid JSON' });
    });

    it('rejects a file holding a list instead of a node', () => {
        const result = parseNodeJson('[]');
        expect(result.ok).toBe(false);
    });

    it('rejects a node with no name', () => {
        const result = parseNodeJson(JSON.stringify({ Rarity: 'Common' }));
        expect(result.ok).toBe(false);
    });

    it('rejects a rarity the game does not have', () => {
        const result = parseNodeJson(JSON.stringify({ Name: 'A', Rarity: 'Mythic' }));
        expect(result.ok).toBe(false);
    });

    it("accepts the guide's example file, which leaves the rarity off the root and its only-children", () => {
        const result = parseNodeJson(docsMyTrashJson);

        expect(result.ok).toBe(true);
        if (!result.ok) return;

        expect(result.node.Rarity).toBeUndefined();
        expect(result.node.Children?.[0].Children?.[1].Children).toEqual([{ Name: 'Apple' }, { Name: 'Banana' }]);
    });

    it('keeps the merge mode instead of silently dropping it', () => {
        const result = parseNodeJson(docsMyTrashJson);

        expect(result.ok).toBe(true);
        if (!result.ok) return;

        expect(result.node.Children?.[0].ChildrenMergeMode).toBe('Replace');
    });

    it('accepts variations and post spawn actions on an item', () => {
        const result = parseNodeJson(
            JSON.stringify({
                Name: 'ItemLootTreeNodes',
                Rarity: 'Uncommon',
                Children: [
                    {
                        Name: 'Clothes',
                        Rarity: 'Uncommon',
                        Children: [
                            {
                                Name: 'Shirt',
                                Rarity: 'Common',
                                Variations: ['Shirt_Red', 'Shirt_Blue'],
                                PostSpawnActions: ['SetClothesDirtiness_DirtyClothes'],
                            },
                        ],
                    },
                ],
            }),
        );

        expect(result.ok).toBe(true);
        if (!result.ok) return;

        const shirt = result.node.Children?.[0].Children?.[0];
        expect(shirt?.Variations).toEqual(['Shirt_Red', 'Shirt_Blue']);
        expect(shirt?.PostSpawnActions).toEqual(['SetClothesDirtiness_DirtyClothes']);
    });
});
