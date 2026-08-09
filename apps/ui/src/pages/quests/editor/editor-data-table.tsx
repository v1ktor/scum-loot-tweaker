import {type ColumnDef, flexRender, getCoreRowModel, type TableMeta, useReactTable} from '@tanstack/react-table';
import {Plus, Trash2} from 'lucide-react';
import {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Checkbox} from '@/components/ui/checkbox.tsx';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx';

export type EditorColumnMeta = {className?: string};

const readColumnClassName = (meta: unknown) => (meta as EditorColumnMeta | undefined)?.className;

export function EditorDataTable<TData>({
                                         title,
                                         addLabel,
                                         emptyText,
                                         columns,
                                         data,
                                         meta,
                                         onAdd,
                                         onDeleteIndices,
                                       }: {
  title: string;
  addLabel: string;
  emptyText: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  meta: unknown;
  onAdd: () => void;
  onDeleteIndices: (indices: number[]) => void;
}) {
  const [rowSelection, setRowSelection] = useState({});

  const selectColumn: ColumnDef<TData> = {
    id: 'select',
    meta: {className: 'w-10'} satisfies EditorColumnMeta,
    enableSorting: false,
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  };

  const table = useReactTable({
    data,
    columns: [selectColumn, ...columns],
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {rowSelection},
    meta: meta as TableMeta<TData>,
  });

  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDeleteIndices(selectedRows.map((row) => row.index));
                setRowSelection({});
              }}
            >
              <Trash2/>
              Delete selected ({selectedRows.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus/>
            {addLabel}
          </Button>
        </div>
      </div>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={readColumnClassName(header.column.columnDef.meta)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={readColumnClassName(cell.column.columnDef.meta)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
