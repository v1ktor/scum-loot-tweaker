'use client'

import {ColumnDef,
  ColumnFiltersState, flexRender, getCoreRowModel,
  getFilteredRowModel, SortingState, useReactTable,
} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {Button} from '@/components/ui/button.tsx';
import React from 'react';
import {Input} from '@/components/ui/input.tsx';

import {Rarity} from '@/data/rarity.ts';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onDelete?: (rowIndex: number) => void
  onDeleteSelected?: (rowIndices: number[]) => void
  onUpdateRarity?: (rowIndex: number, rarity: Rarity) => void
  onUpdateItem?: (rowIndex: number, itemId: string) => void
  onSort?: (sorting: SortingState) => void
  onAddRow?: () => void
}

export function DataTable<TData, TValue>({columns, data, onDelete, onDeleteSelected, onUpdateRarity, onUpdateItem, onSort, onAddRow}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(next);
      onSort?.(next);
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: Number.MAX_SAFE_INTEGER,
      },
    },
    meta: {
      onDelete,
      onUpdateRarity,
      onUpdateItem,
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by item..."
          value={(table.getColumn("Id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          {table.getFilteredSelectedRowModel().rows.length > 0 && onDeleteSelected && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const indices = table.getFilteredSelectedRowModel().rows.map((row) => row.index);
                onDeleteSelected(indices);
                setRowSelection({});
              }}
            >
              Delete selected ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
          {onAddRow && (
            <Button variant="outline" size="sm" onClick={onAddRow}>
              Add item
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  )
}
