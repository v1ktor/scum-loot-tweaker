import type { Rarity } from '@/data/rarity.ts';

export type Node = {
    Name: string;
    Rarity: Rarity;
    Children?: Node[];
    Variations?: string[];
    PostSpawnActions?: string[];
};
