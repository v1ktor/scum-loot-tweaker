import fs from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GetNode } from '../../../../api/models/nodes/index.ts';
import { nodesRouter } from '../../../../api/procedures/nodes/router.ts';
import { createCallerFactory } from '../../../../connections/trpc/trpc.ts';

vi.mock('node:fs');

const createCaller = createCallerFactory(nodesRouter);
const caller = createCaller({});

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
                            Name: 'Parachute',
                            Rarity: 'Rare',
                        },
                    ],
                },
            ],
        },
    ],
};

describe('nodes.paths', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('must return an empty array when the nodes directory does not exist', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(false);

        const result = await caller.paths();

        expect(result).toEqual([]);
    });

    it('must flatten every node in every file into a dotted path', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true);
        vi.mocked(fs.readdirSync).mockReturnValue(['Airfield.json'] as unknown as ReturnType<typeof fs.readdirSync>);
        vi.mocked(fs.readFileSync).mockImplementation(() => JSON.stringify(validNode));

        const result = await caller.paths();

        expect(result).toEqual([
            { path: 'ItemLootTreeNodes.Airfield', isLeaf: false, rarity: 'Uncommon' },
            { path: 'ItemLootTreeNodes.Airfield.Clothes', isLeaf: false, rarity: 'Uncommon' },
            { path: 'ItemLootTreeNodes.Airfield.Clothes.Parachute', isLeaf: true, rarity: 'Rare' },
        ]);
    });

    it('must ignore non-json files', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true);
        vi.mocked(fs.readdirSync).mockReturnValue(['readme.txt'] as unknown as ReturnType<typeof fs.readdirSync>);
        vi.mocked(fs.readFileSync).mockImplementation(() => JSON.stringify(validNode));

        const result = await caller.paths();

        expect(result).toEqual([]);
    });
});
