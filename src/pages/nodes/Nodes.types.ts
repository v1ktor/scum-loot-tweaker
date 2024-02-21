export type Node = {
  Name: string;
  Rarity: Rarity;
  Children?: Node[];
  Variations?: string[];
  PostSpawnActions?: string[];
}
