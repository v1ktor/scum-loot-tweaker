'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { ITEMS_OPTIONS } from '@/data/items-options.ts';
import type { Rarity } from '@/data/rarity.ts';
import { RARITY_OPTIONS } from '@/data/rarity-options.ts';
import type { DataTableMeta, Option, SpawnerItem } from '@/pages/spawners/Spawners.types.ts';

export const columns: ColumnDef<SpawnerItem>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'Id',
        accessorFn: (row) => row.Id || undefined,
        filterFn: (row, _columnId, filterValue: string) => {
            const label = ITEMS_OPTIONS.find((o) => o.value === row.getValue('Id'))?.label ?? '';
            return label.toLowerCase().includes(filterValue.toLowerCase());
        },
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Item
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row, table }) => {
            const meta = table.options.meta as DataTableMeta | undefined;
            const currentId = row.getValue('Id') as string;
            const currentOption = ITEMS_OPTIONS.find((o) => o.value === currentId);

            return (
                <Combobox
                    items={ITEMS_OPTIONS}
                    itemToStringValue={(item: Option) => item.label}
                    value={currentOption ?? null}
                    onValueChange={(next) => {
                        if (next) {
                            meta?.onUpdateItem?.(row.index, next.value);
                        }
                    }}
                    autoHighlight={true}
                >
                    <ComboboxInput placeholder="Select item" className="h-8 min-w-48" />
                    <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                            {(item: Option) => (
                                <ComboboxItem key={item.value} value={item}>
                                    {item.label}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            );
        },
    },
    {
        accessorKey: 'Rarity',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Rarity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row, table }) => {
            const meta = table.options.meta as DataTableMeta | undefined;
            const currentRarity = row.getValue('Rarity') as string;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 px-2">
                            <Badge variant="outline">{currentRarity}</Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Change Rarity</DropdownMenuLabel>
                        {RARITY_OPTIONS.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => meta?.onUpdateRarity?.(row.index, option.value as Rarity)}
                            >
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const meta = table.options.meta as DataTableMeta | undefined;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => meta?.onDelete?.(row.index)}>Delete item</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
