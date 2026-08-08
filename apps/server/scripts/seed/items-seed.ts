/** biome-ignore-all lint/suspicious/noConsole: Seed script - ok to use */
import { and, isNull, notInArray, sql } from 'drizzle-orm';
import { db } from '../../src/connections/database/index.ts';
import { items } from '../../src/connections/database/schema/index.ts';
import { itemsSeedData } from './items-seed-data.ts';

export async function seedItems() {
    if (itemsSeedData.length === 0) {
        console.log('No items to seed.');
        return;
    }

    await db
        .insert(items)
        .values(itemsSeedData)
        .onConflictDoUpdate({
            target: items.id,
            set: {
                name: sql`excluded.name`,
                description: sql`excluded.description`,
                updatedAt: new Date(),
                deletedAt: null,
            },
        });

    const seededIds = itemsSeedData.map((item) => item.id);

    const retired = await db
        .update(items)
        .set({ deletedAt: new Date() })
        .where(and(notInArray(items.id, seededIds), isNull(items.deletedAt)))
        .returning({ id: items.id });

    console.log(`Seeded ${itemsSeedData.length} items (retired ${retired.length}).`);
}
