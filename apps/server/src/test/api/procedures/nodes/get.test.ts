import fs from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GetNode } from '../../../../api/models/nodes/index.ts';
import { nodesRouter } from '../../../../api/procedures/nodes/router.ts';
import { createCallerFactory } from '../../../../connections/trpc/trpc.ts';

vi.mock('node:fs');

const createCaller = createCallerFactory(nodesRouter);
const caller = createCaller({});

const FILENAME = 'test_node.json';

const validNode: GetNode = {
    Name: 'ItemLootTreeNodes',
    Rarity: 'Uncommon',
    Children: [
        {
            Name: 'Airfield',
            Rarity: 'Uncommon',
            Children: [
                {
                    Name: 'Clothes',
                    Rarity: 'Uncommon',
                    Children: [
                        {
                            Name: 'Feet',
                            Rarity: 'Uncommon',
                            Children: [
                                {
                                    Name: 'CombatBoots',
                                    Rarity: 'Rare',
                                },
                                {
                                    Name: 'HH_Wedge_Heels_01_01',
                                    Rarity: 'VeryRare',
                                },
                                {
                                    Name: 'MilitaryBoots_JNA',
                                    Rarity: 'VeryRare',
                                },
                                {
                                    Name: 'MilitaryBoots_Peace',
                                    Rarity: 'VeryRare',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

describe('nodes.get', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('throws NOT_FOUND when nodes directory does not exist', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(false);

        await expect(caller.get(FILENAME)).rejects.toMatchObject({
            code: 'NOT_FOUND',
            message: `Could not find node ${FILENAME}`,
        });
    });

    it('throws NOT_FOUND when file does not exist', async () => {
        vi.mocked(fs.existsSync).mockReturnValueOnce(true).mockReturnValueOnce(false);

        await expect(caller.get(FILENAME)).rejects.toMatchObject({
            code: 'NOT_FOUND',
            message: `Could not find node ${FILENAME}`,
        });
    });

    it('returns parsed node when file exists', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true);
        vi.mocked(fs.readFileSync).mockImplementation(() => JSON.stringify(validNode));

        const result = await caller.get(FILENAME);

        expect(result).toEqual(validNode);
    });

    it('throws on invalid JSON content', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true);
        vi.mocked(fs.readFileSync).mockImplementation(() => 'not valid json');

        await expect(caller.get(FILENAME)).rejects.toThrow();
    });
});
