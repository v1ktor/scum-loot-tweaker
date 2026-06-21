import { useQuery } from '@tanstack/react-query';
import {
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { columns } from '@/pages/parameters/columns.tsx';
import { trpc } from '@/trpc.ts';

function getPageItems(current: number, total: number): (number | '…')[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set<number>([1, total, current, current - 1, current + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

    const items: (number | '…')[] = [];
    let previous = 0;
    for (const page of sorted) {
        if (page - previous > 1) {
            items.push('…');
        }
        items.push(page);
        previous = page;
    }

    return items;
}

export function Parameters() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const { data, isLoading } = useQuery(trpc.parameters.get.queryOptions());
    const parameters = data?.Parameters ?? [];

    const filterValue = (columnFilters.find((filter) => filter.id === 'Id')?.value as string) ?? '';

    const table = useReactTable({
        data: parameters,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        initialState: { pagination: { pageSize: 25 } },
        state: { sorting, columnFilters },
    });

    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 w-full rounded-xl text-base p-8">
                <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
                    Parameters
                </h1>

                <div className="flex items-center py-4">
                    <div className="relative max-w-sm w-full">
                        <Input
                            placeholder="Search by item..."
                            value={filterValue}
                            onChange={(event) => table.getColumn('Id')?.setFilterValue(event.target.value)}
                            className="pr-9"
                        />
                        {filterValue && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Clear search"
                                className="absolute right-1 top-1/2 size-7 -translate-y-1/2 cursor-pointer text-muted-foreground"
                                onClick={() => table.getColumn('Id')?.setFilterValue('')}
                            >
                                <X className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>

                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Loading parameters...
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between gap-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} item(s)
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        {getPageItems(table.getState().pagination.pageIndex + 1, table.getPageCount() || 1).map(
                            (item, index) =>
                                item === '…' ? (
                                    <span key={`gap-${index}`} className="px-2 text-sm text-muted-foreground">
                                        …
                                    </span>
                                ) : (
                                    <Button
                                        key={item}
                                        variant={
                                            item === table.getState().pagination.pageIndex + 1 ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        className="w-9 cursor-pointer"
                                        onClick={() => table.setPageIndex(item - 1)}
                                    >
                                        {item}
                                    </Button>
                                ),
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
