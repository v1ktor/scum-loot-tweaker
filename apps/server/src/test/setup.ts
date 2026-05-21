import { config } from 'dotenv';

config();

if (process.env.DATABASE_TEST_URL) {
    process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
}
