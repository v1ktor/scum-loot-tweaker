import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../connections/database/schema/index.ts';

export function createTestDb() {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    return {
        db: drizzle(pool, { schema }),
        async end() {
            await pool.end();
        },
    };
}

export async function cleanDb(db: ReturnType<typeof createTestDb>['db']) {
    await db.delete(schema.items);
    await db.delete(schema.itemCategories);
}
