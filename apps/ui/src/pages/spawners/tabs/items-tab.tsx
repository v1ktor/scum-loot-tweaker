import {Dispatch, SetStateAction} from 'react';
import {Spawner} from '@/pages/spawners/Spawners.types.ts';

interface ItemsTabProps {
  spawner: Spawner;
  setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function ItemsTab(_props: ItemsTabProps) {
  return (
    <div className="mt-4">
      <p>Items tab content coming soon.</p>
    </div>
  );
}


