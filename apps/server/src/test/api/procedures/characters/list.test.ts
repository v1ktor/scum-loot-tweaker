import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { appRouter } from '../../../../api/procedures/router.ts';
import { characters } from '../../../../connections/database/schema/index.ts';
import { createCallerFactory } from '../../../../connections/trpc/trpc.ts';
import { cleanDb, createTestDb } from '../../../helpers.ts';

const createCaller = createCallerFactory(appRouter);
const caller = createCaller({});

const { db, end } = createTestDb();

beforeEach(() => cleanDb(db));
afterAll(() => end());

describe('characters.list', () => {
    it('returns empty array when no characters exist', async () => {
        const result = await caller.characters.list();

        expect(result).toEqual([]);
    });

    it('returns all characters', async () => {
        await db.insert(characters).values([
            { id: 'Puppet', name: 'Puppet' },
            { id: 'BP_Zombie_Nuclear', name: 'Nuclear Puppet' },
        ]);

        const result = await caller.characters.list();

        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 'Puppet', name: 'Puppet' }),
                expect.objectContaining({ id: 'BP_Zombie_Nuclear', name: 'Nuclear Puppet' }),
            ]),
        );
    });

    it('excludes characters retired by the seed', async () => {
        await db.insert(characters).values([
            { id: 'Puppet', name: 'Puppet' },
            { id: 'BP_Zombie_Nuclear', name: 'Nuclear Puppet', deletedAt: new Date() },
        ]);

        const result = await caller.characters.list();

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(expect.objectContaining({ id: 'Puppet' }));
    });

    it('returns an empty array when every character is retired', async () => {
        await db.insert(characters).values([{ id: 'Puppet', name: 'Puppet', deletedAt: new Date() }]);

        expect(await caller.characters.list()).toEqual([]);
    });
});
