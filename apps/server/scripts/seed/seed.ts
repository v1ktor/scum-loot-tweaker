/** biome-ignore-all lint/suspicious/noConsole: Seed script - ok to use */
import { sql } from 'drizzle-orm';
import { db } from '../../src/connections/database/index.ts';
import { items } from '../../src/connections/database/schema/index.ts';
import { itemsSeedData } from './items-seed-data.ts';

async function seed() {
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
            },
        });

    console.log(`Seeded ${itemsSeedData.length} items.`);
}

seed()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
