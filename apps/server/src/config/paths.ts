import 'dotenv/config';
import path from 'node:path';

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? '../../public/data');
