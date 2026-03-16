import { Rarity } from '@/data/rarity.ts';

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
  Subpresets?: SpawnerItem[];
  Probability?: number;
  QuantityMin?: number;
  QuantityMax?: number;
  AllowDuplicates?: boolean;
  InitialDamage?: number;
  RandomDamage?: number;
  InitialUsage?: number;
  RandomUsage?: number;
  ShouldFilterItemsByZone?: boolean;
  ShouldApplyLocationSpecificDamageModifier?: boolean;
  ShouldApplyLocationSpecificProbabilityModifier?: boolean;
  PostSpawnActions?: string[];
}

export type ItemSelection = {
  selectedItem: Option | null;
  selectedRarity: Option | null;
}

export type SettingsState = {
  probabilityValue: string;
  quantityMinValue: string;
  quantityMaxValue: string;
  allowDuplicatesValue: string;
  shouldFilterItemsByZoneValue: string;
  initialDamageValue: string;
  randomDamageValue: string;
  initialUsageValue: string;
  randomUsageValue: string;
}

export type DataTableMeta = {
  onDelete?: (rowIndex: number) => void;
  onUpdateRarity?: (rowIndex: number, rarity: Rarity) => void;
  onUpdateItem?: (rowIndex: number, itemId: string) => void;
}

export const settingsInitialState: SettingsState = {
    probabilityValue: '',
    quantityMinValue: '',
    quantityMaxValue: '',
    allowDuplicatesValue: '',
    shouldFilterItemsByZoneValue: '',
    initialDamageValue: '',
    randomDamageValue: '',
    initialUsageValue: '',
    randomUsageValue: '',
}
