import { ITEMS_OPTIONS } from "../data/items-options.ts";

export function getItemName(itemId: string): string {
  const foundItemOption = ITEMS_OPTIONS.find(item => item.value === itemId);

  return foundItemOption?.label ?? itemId;
}
