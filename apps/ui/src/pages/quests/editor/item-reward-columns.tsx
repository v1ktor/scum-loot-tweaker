import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { FreeTextCombobox } from '@/components/free-text-combobox/free-text-combobox.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import type { EditorColumnMeta } from './editor-data-table.tsx';

export interface ItemTableMeta {
    itemsOptions: Option[];
    onUpdate: (index: number, value: string) => void;
    onRemove: (index: number) => void;
}

export const itemRewardColumns: ColumnDef<string>[] = [
    {
        id: 'item',
        header: 'Item *',
        meta: { className: 'min-w-48' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as ItemTableMeta;

            return (
                <FreeTextCombobox
                    value={row.original}
                    options={meta.itemsOptions}
                    placeholder="Select item"
                    onChange={(next) => meta.onUpdate(row.index, next)}
                />
            );
        },
    },
    {
        id: 'actions',
        header: '',
        meta: { className: 'w-12' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as ItemTableMeta;
            return (
                <Button variant="ghost" size="icon" title="Remove item" onClick={() => meta.onRemove(row.index)}>
                    <Trash2 />
                </Button>
            );
        },
    },
];
