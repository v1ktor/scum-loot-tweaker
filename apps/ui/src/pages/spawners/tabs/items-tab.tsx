import type { SortingState } from '@tanstack/react-table';
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ITEMS_OPTIONS } from '@/data/items-options.ts';
import { Rarity } from '@/data/rarity.ts';
import { columns } from '@/pages/spawners/items/columns.tsx';
import { DataTable } from '@/pages/spawners/items/data-table.tsx';
import type { Spawner, SpawnerItem } from '@/pages/spawners/Spawners.types.ts';

interface ItemsTabProps {
    spawner: Spawner;
    setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function ItemsTab(props: ItemsTabProps) {
    const { spawner, setSpawner } = props;
    const [rows, setRows] = useState<SpawnerItem[]>(spawner.Items ?? []);

    const syncToSpawner = useCallback(
        (updatedRows: SpawnerItem[]) => {
            setSpawner((prev) => ({
                ...prev,
                Items: updatedRows.filter((item) => item.Id !== ''),
            }));
        },
        [setSpawner],
    );

    useEffect(() => {
        syncToSpawner(rows);
    }, [rows, syncToSpawner]);

    const handleDelete = (rowIndex: number) => {
        const snapshot = [...rows];

        setRows((prev) => prev.filter((_, i) => i !== rowIndex));

        toast('Item deleted', {
            action: {
                label: 'Undo',
                onClick: () => setRows(snapshot),
            },
        });
    };

    const handleDeleteSelected = (rowIndices: number[]) => {
        const snapshot = [...rows];
        const indexSet = new Set(rowIndices);

        setRows((prev) => prev.filter((_, i) => !indexSet.has(i)));

        toast(`${rowIndices.length} item(s) deleted`, {
            action: {
                label: 'Undo',
                onClick: () => setRows(snapshot),
            },
        });
    };

    const handleUpdateRarity = (rowIndex: number, rarity: Rarity) => {
        setRows((prev) => prev.map((item, i) => (i === rowIndex ? { ...item, Rarity: rarity } : item)));
    };

    const handleUpdateItem = (rowIndex: number, itemId: string) => {
        setRows((prev) => prev.map((item, i) => (i === rowIndex ? { ...item, Id: itemId } : item)));
    };

    const handleAddRow = () => {
        setRows((prev) => [...prev, { Id: '', Rarity: Rarity.Common }]);
    };

    const handleSort = (sorting: SortingState) => {
        if (sorting.length === 0) return;

        const { id, desc } = sorting[0];

        setRows((prev) => {
            const filled = prev.filter((item) => item.Id !== '');
            const empty = prev.filter((item) => item.Id === '');

            filled.sort((a, b) => {
                let cmp = 0;

                if (id === 'Id') {
                    const labelA = ITEMS_OPTIONS.find((o) => o.value === a.Id)?.label ?? '';
                    const labelB = ITEMS_OPTIONS.find((o) => o.value === b.Id)?.label ?? '';

                    cmp = labelA.localeCompare(labelB);
                }

                if (id === 'Rarity') {
                    cmp = (a.Rarity ?? '').localeCompare(b.Rarity ?? '');
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
                onUpdateRarity={handleUpdateRarity}
                onUpdateItem={handleUpdateItem}
                onAddRow={handleAddRow}
                onSort={handleSort}
            />
        </div>
    );
}
