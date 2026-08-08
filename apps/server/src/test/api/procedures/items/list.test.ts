import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { appRouter } from '../../../../api/procedures/router.ts';
import { items } from '../../../../connections/database/schema/index.ts';
import { createCallerFactory } from '../../../../connections/trpc/trpc.ts';
import { cleanDb, createTestDb } from '../../../helpers.ts';

const createCaller = createCallerFactory(appRouter);
const caller = createCaller({});

const { db, end } = createTestDb();

beforeEach(() => cleanDb(db));
afterAll(() => end());

describe('items.list', () => {
    it('returns empty array when no items exist', async () => {
        const result = await caller.items.list();

        expect(result).toEqual([]);
    });

    it('returns all items', async () => {
        await db.insert(items).values([
            { id: 'Apple', name: 'Apple' },
            { id: 'Beer', name: 'Beer' },
        ]);

        const result = await caller.items.list();

        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 'Apple', name: 'Apple' }),
                expect.objectContaining({ id: 'Beer', name: 'Beer' }),
            ]),
        );
    });

    it('excludes items retired by the seed', async () => {
        await db.insert(items).values([
            { id: 'Apple', name: 'Apple' },
            { id: 'Beer', name: 'Beer', deletedAt: new Date() },
        ]);

        const result = await caller.items.list();

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(expect.objectContaining({ id: 'Apple' }));
    });

    it('returns an empty array when every item is retired', async () => {
        await db.insert(items).values([{ id: 'Apple', name: 'Apple', deletedAt: new Date() }]);

        expect(await caller.items.list()).toEqual([]);
    });
});
