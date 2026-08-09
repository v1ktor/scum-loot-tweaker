import type { ColumnDef } from '@tanstack/react-table';
import { CircleHelp, Trash2 } from 'lucide-react';
import { FreeTextCombobox } from '@/components/free-text-combobox/free-text-combobox.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import type { TradeDeal } from '@/data/quests/quests.types.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import type { EditorColumnMeta } from './editor-data-table.tsx';
import { NumberInput } from './quest-editor-fields.tsx';

export interface TradeDealTableMeta {
    itemsOptions: Option[];
    onUpdate: (index: number, next: TradeDeal) => void;
    onRemove: (index: number) => void;
}

export const tradeDealColumns: ColumnDef<TradeDeal>[] = [
    {
        accessorKey: 'Item',
        header: 'Item *',
        meta: { className: 'min-w-48' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as TradeDealTableMeta;
            const deal = row.original;

            return (
                <FreeTextCombobox
                    value={deal.Item}
                    options={meta.itemsOptions}
                    placeholder="Item"
                    onChange={(Item) => meta.onUpdate(row.index, { ...deal, Item })}
                />
            );
        },
    },
    {
        accessorKey: 'Amount',
        header: 'Qty',
        meta: { className: 'w-24' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as TradeDealTableMeta;
            const deal = row.original;
            return (
                <NumberInput value={deal.Amount} onChange={(Amount) => meta.onUpdate(row.index, { ...deal, Amount })} />
            );
        },
    },
    {
        accessorKey: 'Price',
        header: 'Price ($)',
        meta: { className: 'w-28' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as TradeDealTableMeta;
            const deal = row.original;
            return (
                <NumberInput value={deal.Price} onChange={(Price) => meta.onUpdate(row.index, { ...deal, Price })} />
            );
        },
    },
    {
        accessorKey: 'Fame',
        header: 'Fame',
        meta: { className: 'w-24' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as TradeDealTableMeta;
            const deal = row.original;
            return <NumberInput value={deal.Fame} onChange={(Fame) => meta.onUpdate(row.index, { ...deal, Fame })} />;
        },
    },
    {
        id: 'excl',
        meta: { className: 'w-20 text-center' } satisfies EditorColumnMeta,
        header: () => (
            <div className="flex items-center justify-center gap-1">
                Excl
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CircleHelp className="h-3.5 w-3.5 cursor-help text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>Allow excluded items</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        ),
        cell: ({ row, table }) => {
            const meta = table.options.meta as TradeDealTableMeta;
            const deal = row.original;
            return (
                <Switch
                    checked={!!deal.AllowExcluded}
                    onCheckedChange={(AllowExcluded) => meta.onUpdate(row.index, { ...deal, AllowExcluded })}
                />
            );
        },
    },
    {
        id: 'actions',
        header: '',
        meta: { className: 'w-12' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as TradeDealTableMeta;
            return (
                <Button variant="ghost" size="icon" title="Remove trade deal" onClick={() => meta.onRemove(row.index)}>
                    <Trash2 />
                </Button>
            );
        },
    },
];
