/** biome-ignore-all lint/suspicious/noConsole: Script - ok to use */
import * as readline from 'node:readline';
import { sql } from 'drizzle-orm';
import { db } from '../src/connections/database/index.ts';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question: string): Promise<string> {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function nuke() {
    if (process.env.NODE_ENV === 'production') {
        console.error('Refusing to nuke a production database.');
        process.exit(1);
    }

    console.log('WARNING: This will drop ALL tables and data from the database.');
    const answer = await ask('Type "yes" to confirm: ');

    if (answer.trim().toLowerCase() !== 'yes') {
        console.log('Aborted.');
        process.exit(0);
    }

    await db.execute(sql`DROP SCHEMA public CASCADE`);
    await db.execute(sql`CREATE SCHEMA public`);

    console.log('Database nuked. Run db:migrate and db:seed to rebuild.');
}

nuke()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
