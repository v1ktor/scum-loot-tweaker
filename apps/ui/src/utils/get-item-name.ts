import type { Option } from '@/pages/spawners/spawners.types.ts';

export function getItemName(itemId: string, itemsOptions: Option[]): string {
    const foundItemOption = itemsOptions.find((item) => item.value === itemId);

    return foundItemOption?.label ?? itemId;
}
