import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { getQuestType, QUEST_GIVERS } from '@/data/quests/index.ts';
import type { Quest } from '@/data/quests/quests.types.ts';

export interface ImportedQuestRow {
    id: string;
    quest: Quest;
}

export interface MyQuestsTableMeta {
    onEdit?: (id: string) => void;
    onDownload?: (quest: Quest) => void;
    onDelete?: (id: string) => void;
}

const giverName = (npc: string) => QUEST_GIVERS.find((g) => g.npc === npc)?.name ?? npc;

export const columns: ColumnDef<ImportedQuestRow>[] = [
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
        accessorFn: (row) => row.quest.Title,
        id: 'title',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row, table }) => {
            const meta = table.options.meta as MyQuestsTableMeta | undefined;

            return (
                <a
                    className="cursor-pointer font-medium hover:underline"
                    onClick={() => meta?.onEdit?.(row.original.id)}
                >
                    {row.original.quest.Title || row.original.id}
                </a>
            );
        },
    },
    {
        id: 'giver',
        accessorFn: (row) => giverName(row.quest.AssociatedNPC),
        header: 'Giver',
        cell: ({ getValue }) => <span className="text-muted-foreground text-sm">{getValue<string>()}</span>,
    },
    {
        id: 'tier',
        accessorFn: (row) => row.quest.Tier,
        header: () => <div className="text-right">Tier</div>,
        cell: ({ getValue }) => <div className="text-right tabular-nums">{getValue<number>()}</div>,
    },
    {
        id: 'type',
        accessorFn: (row) => getQuestType(row.quest),
        header: 'Type',
        cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
    },
    {
        id: 'conditions',
        accessorFn: (row) => row.quest.Conditions.length,
        header: () => <div className="text-right">Conditions</div>,
        cell: ({ getValue }) => <div className="text-right tabular-nums">{getValue<number>()}</div>,
    },
    {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row, table }) => {
            const meta = table.options.meta as MyQuestsTableMeta | undefined;
            const { id, quest } = row.original;

            return (
                <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" title="Edit" onClick={() => meta?.onEdit?.(id)}>
                        <Pencil />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download" onClick={() => meta?.onDownload?.(quest)}>
                        <Download />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete" onClick={() => meta?.onDelete?.(id)}>
                        <Trash2 />
                    </Button>
                </div>
            );
        },
    },
];
