import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';

export interface CooldownGroup {
    Name: string;
    _comment?: string;
    CooldownMin: number;
    CooldownMax: number;
    IsAffectedByLowerGroups: boolean;
}

export const columns: ColumnDef<CooldownGroup>[] = [
    {
        accessorKey: 'Name',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.original.Name}</span>,
    },
    {
        id: 'cooldown',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Cooldown
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        accessorFn: (row) => row.CooldownMin,
        cell: ({ row }) => {
            const { CooldownMin: min, CooldownMax: max } = row.original;
            return <span className="text-sm tabular-nums">{min === max ? `${min}h` : `${min}h – ${max}h`}</span>;
        },
    },
    {
        accessorKey: 'IsAffectedByLowerGroups',
        header: 'Affected by Lower Groups',
        cell: ({ row }) =>
            row.original.IsAffectedByLowerGroups ? (
                <Badge variant="outline">Yes</Badge>
            ) : (
                <Badge variant="secondary">No</Badge>
            ),
    },
];
