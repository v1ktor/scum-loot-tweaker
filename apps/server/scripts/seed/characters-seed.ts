/** biome-ignore-all lint/suspicious/noConsole: Seed script - ok to use */
import { and, isNull, notInArray, sql } from 'drizzle-orm';
import { db } from '../../src/connections/database/index.ts';
import { characters } from '../../src/connections/database/schema/index.ts';
import { charactersSeedData } from './characters-seed-data.ts';

export async function seedCharacters() {
    if (charactersSeedData.length === 0) {
        console.log('No characters to seed.');
        return;
    }

    await db
        .insert(characters)
        .values(charactersSeedData)
        .onConflictDoUpdate({
            target: characters.id,
            set: {
                name: sql`excluded.name`,
                updatedAt: new Date(),
                deletedAt: null,
            },
        });

    const seededIds = charactersSeedData.map((character) => character.id);

    const retired = await db
        .update(characters)
        .set({ deletedAt: new Date() })
        .where(and(notInArray(characters.id, seededIds), isNull(characters.deletedAt)))
        .returning({ id: characters.id });

    console.log(`Seeded ${charactersSeedData.length} characters (retired ${retired.length}).`);
}
