import 'dotenv/config';
import path from 'node:path';

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? 'src/data');
export const NODES_DIR = path.join(DATA_DIR, 'Loot/Nodes/Default');
export const SPAWNERS_DIR = path.join(DATA_DIR, 'Loot/Spawners/Presets/Default');
