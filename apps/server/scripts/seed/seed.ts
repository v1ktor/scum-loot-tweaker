/** biome-ignore-all lint/suspicious/noConsole: Seed script - ok to use */
import { seedCharacters } from './characters-seed.ts';
import { seedItems } from './items-seed.ts';

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
