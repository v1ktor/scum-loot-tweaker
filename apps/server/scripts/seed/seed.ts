/** biome-ignore-all lint/suspicious/noConsole: Seed script - ok to use */
import { seedCharacters } from './characters-seed.ts';
import { seedItems } from './items-seed.ts';

/**
 * Entry point for `npm run db:seed`.
 *
 * Every catalog is seeded the same way: upsert each entry, then retire whatever the seed file no
 * longer lists.
 *
 * Retiring stamps `deletedAt` instead of deleting the row. Item and character ids are referenced by
 * string — not by foreign key — from spawner presets and quest files that live in the user's
 * browser, so a removed entry has to stay identifiable rather than vanish. The list queries filter
 * on `deletedAt`, and re-adding an id to the seed clears the stamp, so a removal is reversible.
 *
 * An empty seed file is treated as "nothing to do" rather than "retire everything", so a bad import
 * or a botched merge can't silently empty a table.
 */
async function seed() {
    await seedItems();
    await seedCharacters();
}

seed()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
