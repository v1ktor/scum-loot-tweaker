import {
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import type { QuestDisplayType } from '@/data/quests/index.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { COLUMN_LABELS, makeColumns } from './quest-columns.tsx';
import { computeDefaultColumnVisibility, type Row } from './quest-rows.ts';

const QUEST_TYPES: QuestDisplayType[] = ['Fetch', 'Elimination', 'Interaction', 'Mix'];

export function QuestDataTable({
    rows,
    globalFilter,
    onGlobalFilterChange,
    showNpc = false,
    itemsOptions,
}: {
    rows: Row[];
    globalFilter: string;
    onGlobalFilterChange: (v: string) => void;
    showNpc?: boolean;
    itemsOptions: Option[];
}) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
        computeDefaultColumnVisibility(rows),
    );
    const [localFilter, setLocalFilter] = useState('');

    const columns = makeColumns(showNpc, itemsOptions);

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange,
        globalFilterFn: (row, _columnId, value: string) => {
            const q = value.toLowerCase();
            return (
                row.original.quest.Title.toLowerCase().includes(q) ||
                row.original.type.toLowerCase().includes(q) ||
                row.original.conditionSummary.toLowerCase().includes(q) ||
                row.original.moneySummary.toLowerCase().includes(q) ||
                row.original.fpSummary.toLowerCase().includes(q) ||
                row.original.xpSummary.toLowerCase().includes(q) ||
                row.original.itemsSummary.toLowerCase().includes(q) ||
                row.original.tradeDealSummary.toLowerCase().includes(q)
            );
        },
        state: { sorting, columnFilters, columnVisibility, globalFilter: globalFilter || localFilter },
    });

    const typeFilter = (table.getColumn('type')?.getFilterValue() as string) ?? '';

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                    {QUEST_TYPES.map((type) => (
                        <Button
                            key={type}
                            variant={typeFilter === type ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => table.getColumn('type')?.setFilterValue(typeFilter === type ? '' : type)}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Filter..."
                        value={localFilter}
                        onChange={(e) => setLocalFilter(e.target.value)}
                        className="h-8 w-48"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1.5">
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table.getAllLeafColumns().map((col) => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    checked={col.getIsVisible()}
                                    onCheckedChange={(value) => col.toggleVisibility(value)}
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {COLUMN_LABELS[col.id] ?? col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="max-w-full rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((h) => (
                                    <TableHead key={h.id} colSpan={h.colSpan}>
                                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllLeafColumns().length}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    No quests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={
                                                cell.column.id === 'conditions' ? { whiteSpace: 'normal' } : undefined
                                            }
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <p className="text-xs text-muted-foreground">{table.getFilteredRowModel().rows.length} quests</p>
        </div>
    );
}
