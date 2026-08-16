import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { countNodeTree } from '@/pages/my-nodes/node-tree-ops.ts';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';

export interface ImportedNodeRow {
    filename: string;
    node: LootNode;
}

export interface MyNodesTableMeta {
    onEdit?: (filename: string) => void;
    onDownload?: (filename: string, node: LootNode) => void;
    onDelete?: (filename: string) => void;
}

const RightAligned = ({ value }: { value: number }) => <div className="text-right tabular-nums">{value}</div>;

export const columns: ColumnDef<ImportedNodeRow>[] = [
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
            const meta = table.options.meta as MyNodesTableMeta | undefined;

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
        id: 'subNodes',
        accessorFn: (row) => countNodeTree(row.node).subNodes,
        header: () => <div className="text-right">Sub-nodes</div>,
        cell: ({ getValue }) => <RightAligned value={getValue<number>()} />,
    },
    {
        id: 'items',
        accessorFn: (row) => countNodeTree(row.node).items,
        header: () => <div className="text-right">Items</div>,
        cell: ({ getValue }) => <RightAligned value={getValue<number>()} />,
    },
    {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row, table }) => {
            const meta = table.options.meta as MyNodesTableMeta | undefined;
            const { filename, node } = row.original;

            return (
                <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" title="Edit" onClick={() => meta?.onEdit?.(filename)}>
                        <Pencil />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="Download"
                        onClick={() => meta?.onDownload?.(filename, node)}
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
