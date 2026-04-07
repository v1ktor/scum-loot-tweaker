import type { SortingState } from '@tanstack/react-table';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { ITEMS_OPTIONS } from '@/data/items-options.ts';
import { columns } from '@/pages/spawners/fixed-items/columns.tsx';
import { DataTable } from '@/pages/spawners/items/data-table.tsx';
import type { Spawner } from '@/pages/spawners/Spawners.types.ts';

interface FixedItemsTabProps {
    spawner: Spawner;
    setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function FixedItemsTab(props: FixedItemsTabProps) {
    const { spawner, setSpawner } = props;
    const [rows, setRows] = useState<string[]>(spawner.FixedItems ?? []);

    const syncToSpawner = (updatedRows: string[]) => {
        setSpawner((prev) => ({
            ...prev,
            FixedItems: updatedRows.filter((item) => item !== '' || item),
        }));
    };

    const handleDelete = (rowIndex: number) => {
        const next = rows.filter((_, i) => i !== rowIndex);
        setRows(next);
        syncToSpawner(next);
    };

    const handleDeleteSelected = (rowIndices: number[]) => {
        const indexSet = new Set(rowIndices);
        const next = rows.filter((_, i) => !indexSet.has(i));
        setRows(next);
        syncToSpawner(next);
    };

    const handleUpdateItem = (rowIndex: number, itemId: string) => {
        const next = rows.map((item, i) => (i === rowIndex ? itemId : item));
        setRows(next);
        syncToSpawner(next);
    };

    const handleAddRow = () => {
        setRows((prev) => [...prev, '']);
    };

    const handleSort = (sorting: SortingState) => {
        if (sorting.length === 0) return;
        const { id, desc } = sorting[0];

        setRows((prev) => {
            const filled = prev.filter((item) => item !== '');
            const empty = prev.filter((item) => item === '');

            filled.sort((a, b) => {
                let cmp = 0;

                if (id === 'Id') {
                    const labelA = ITEMS_OPTIONS.find((o) => o.value === a)?.label ?? '';
                    const labelB = ITEMS_OPTIONS.find((o) => o.value === b)?.label ?? '';
                    cmp = labelA.localeCompare(labelB);
                }

                return desc ? -cmp : cmp;
            });

            return [...filled, ...empty];
        });
    };

    return (
        <div className="mt-4">
            <DataTable
                columns={columns}
                data={rows}
                onDelete={handleDelete}
                onDeleteSelected={handleDeleteSelected}
                onUpdateItem={handleUpdateItem}
                onAddRow={handleAddRow}
                onSort={handleSort}
            />
        </div>
    );
}
