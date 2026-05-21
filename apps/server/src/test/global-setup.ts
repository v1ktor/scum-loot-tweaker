import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsFolder = path.resolve(__dirname, '../../drizzle');
const TEST_DB = 'scum_tools_test';

function isEconnRefused(x: unknown): boolean {
    return typeof x === 'object' && x !== null && 'code' in x && x.code === 'ECONNREFUSED';
}

function isConnectionError(err: unknown): boolean {
    if (isEconnRefused(err)) return true;
    if (typeof err !== 'object' || err === null) return false;
    if ('errors' in err && Array.isArray(err.errors)) return err.errors.some(isEconnRefused);
    return false;
}

function adminUrl(testDbUrl: string): string {
    const url = new URL(testDbUrl);
    url.pathname = '/postgres';
    return url.toString();
}

export async function setup() {
    config();

    const testDbUrl = process.env.DATABASE_TEST_URL;
    if (!testDbUrl) {
        console.warn('\n[test] DATABASE_TEST_URL not set — skipping test DB setup. Integration tests will fail.\n');
        return;
    }

    const admin = new pg.Pool({
        connectionString: adminUrl(testDbUrl),
        connectionTimeoutMillis: 3000,
    });

    let client: pg.PoolClient;

    try {
        client = await admin.connect();
    } catch (err) {
        await admin.end();
        if (isConnectionError(err)) {
            console.warn('\n[test] Dev DB not reachable — skipping test DB setup. Integration tests will fail.\n');
            return;
        }
        throw err;
    }

    await client.query(`DROP DATABASE IF EXISTS "${TEST_DB}" WITH (FORCE)`);
    await client.query(`CREATE DATABASE "${TEST_DB}"`);
    client.release();
    await admin.end();

    const testPool = new pg.Pool({ connectionString: testDbUrl });
    await migrate(drizzle(testPool), { migrationsFolder });
    await testPool.end();
}

export async function teardown() {
    const testDbUrl = process.env.DATABASE_TEST_URL;
    if (!testDbUrl) return;

    const admin = new pg.Pool({ connectionString: adminUrl(testDbUrl) });
    const client = await admin.connect();
    await client.query(`DROP DATABASE IF EXISTS "${TEST_DB}" WITH (FORCE)`);
    client.release();
    await admin.end();
}
