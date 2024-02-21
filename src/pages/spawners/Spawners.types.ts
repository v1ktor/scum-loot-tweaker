export type Option = { label: string; value: string; }

export type SpawnerItem = {
  Id: string;
  Rarity: Rarity;
}

export type SpawnerNode = {
  Ids: string[];
  Rarity: Rarity;
}

export type Spawner = {
  Nodes?: SpawnerNode[];
  FixedItems?: string[];
  Items?: SpawnerItem[];
  Probability?: number;
  QuantityMin: number;
  QuantityMax: number;
  AllowDuplicates: boolean;
  ShouldFilterItemsByZone: boolean;
  InitialDamage: number;
  RandomDamage: number;
  InitialUsage: number;
  RandomUsage: number;
  PostSpawnActions?: string[];
}
