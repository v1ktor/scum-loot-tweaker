import 'dotenv/config';
import path from 'node:path';

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? 'src/data');
export const NODES_DIR = path.join(DATA_DIR, 'Loot/Nodes/Default');
export const SPAWNERS_DIR = path.join(DATA_DIR, 'Loot/Spawners/Presets/Default');
export const PARAMETERS_FILE = path.join(DATA_DIR, 'Loot/Items/Default/Parameters.json');
export const COOLDOWN_GROUPS_FILE = path.join(DATA_DIR, 'Loot/CooldownGroups/Default/CooldownGroups.json');
