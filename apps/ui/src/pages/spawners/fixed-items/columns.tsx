import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { FreeTextCombobox } from '@/components/free-text-combobox/free-text-combobox.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import type { DataTableMeta, Option } from '@/pages/spawners/spawners.types.ts';

export const createColumns = (itemsOptions: Option[]): ColumnDef<string>[] => [
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
        accessorFn: (row) => row || undefined,
        filterFn: (row, _columnId, filterValue: string) => {
            const label = itemsOptions.find((o) => o.value === row.getValue('Id'))?.label ?? '';
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

            return (
                <FreeTextCombobox
                    value={row.getValue('Id') as string}
                    options={itemsOptions}
                    placeholder="Select item"
                    className="h-8 min-w-48"
                    showClear={false}
                    emptyText="No items found."
                    onChange={(next) => next && meta?.onUpdateItem?.(row.index, next)}
                />
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
