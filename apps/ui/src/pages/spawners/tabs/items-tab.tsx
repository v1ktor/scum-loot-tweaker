import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {Spawner, SpawnerItem} from '@/pages/spawners/Spawners.types.ts';
import {DataTable} from '@/pages/spawners/items/data-table.tsx';
import {columns} from '@/pages/spawners/items/columns.tsx';
import {Rarity} from '@/data/rarity.ts';
import {SortingState} from '@tanstack/react-table';
import {ITEMS_OPTIONS} from '@/data/items-options.ts';

interface ItemsTabProps {
  spawner: Spawner;
  setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function ItemsTab(props: ItemsTabProps) {
  const {spawner, setSpawner} = props;
  const [rows, setRows] = useState<SpawnerItem[]>(spawner.Items ?? []);

  const syncToSpawner = useCallback((updatedRows: SpawnerItem[]) => {
    setSpawner((prev) => ({
      ...prev,
      Items: updatedRows.filter((item) => item.Id !== ''),
    }));
  }, [setSpawner]);

  useEffect(() => {
    syncToSpawner(rows);
  }, [rows, syncToSpawner]);

  const handleDelete = (rowIndex: number) => {
    setRows(prev => prev.filter((_, i) => i !== rowIndex));
  };

  const handleDeleteSelected = (rowIndices: number[]) => {
    const indexSet = new Set(rowIndices);

    setRows(prev => prev.filter((_, i) => !indexSet.has(i)));
  };

  const handleUpdateRarity = (rowIndex: number, rarity: Rarity) => {
    setRows(prev => prev.map((item, i) =>
      i === rowIndex ? { ...item, Rarity: rarity } : item
    ));
  };

  const handleUpdateItem = (rowIndex: number, itemId: string) => {
    setRows(prev => prev.map((item, i) =>
      i === rowIndex ? { ...item, Id: itemId } : item
    ));
  };

  const handleAddRow = () => {
    setRows(prev => [...prev, { Id: '', Rarity: Rarity.Common }]);
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
