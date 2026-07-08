import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import type { Spawner } from '@/pages/spawners/spawners.types.ts';

export interface ImportedSpawnerRow {
    filename: string;
    spawner: Spawner;
}

export interface MySpawnersTableMeta {
    onEdit?: (filename: string) => void;
    onDownload?: (filename: string, spawner: Spawner) => void;
    onDelete?: (filename: string) => void;
}

const RightAligned = ({ value }: { value: number }) => <div className="text-right tabular-nums">{value}</div>;

export const columns: ColumnDef<ImportedSpawnerRow>[] = [
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
        accessorKey: 'filename',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                File name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row, table }) => {
            const meta = table.options.meta as MySpawnersTableMeta | undefined;

            return (
                <span className="font-mono text-xs">
                    <a className="cursor-pointer hover:underline" onClick={() => meta?.onEdit?.(row.original.filename)}>
                        {row.original.filename}
                    </a>
                </span>
            );
        },
    },
    {
        id: 'items',
        accessorFn: (row) => row.spawner.Items?.length ?? 0,
        header: () => <div className="text-right">Items</div>,
        cell: ({ getValue }) => <RightAligned value={getValue<number>()} />,
    },
    {
        id: 'fixedItems',
        accessorFn: (row) => row.spawner.FixedItems?.length ?? 0,
        header: () => <div className="text-right">Fixed Items</div>,
        cell: ({ getValue }) => <RightAligned value={getValue<number>()} />,
    },
    {
        id: 'nodes',
        accessorFn: (row) => row.spawner.Nodes?.length ?? 0,
        header: () => <div className="text-right">Nodes</div>,
        cell: ({ getValue }) => <RightAligned value={getValue<number>()} />,
    },
    {
        id: 'subpresets',
        accessorFn: (row) => row.spawner.Subpresets?.length ?? 0,
        header: () => <div className="text-right">Subpresets</div>,
        cell: ({ getValue }) => <RightAligned value={getValue<number>()} />,
    },
    {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row, table }) => {
            const meta = table.options.meta as MySpawnersTableMeta | undefined;
            const { filename, spawner } = row.original;

            return (
                <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" title="Edit" onClick={() => meta?.onEdit?.(filename)}>
                        <Pencil />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="Download"
                        onClick={() => meta?.onDownload?.(filename, spawner)}
                    >
                        <Download />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete" onClick={() => meta?.onDelete?.(filename)}>
                        <Trash2 />
                    </Button>
                </div>
            );
        },
    },
];
