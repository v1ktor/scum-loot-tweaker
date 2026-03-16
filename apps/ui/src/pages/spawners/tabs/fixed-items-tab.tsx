import {Dispatch, SetStateAction} from 'react';
import {Spawner} from '@/pages/spawners/Spawners.types.ts';

interface FixedItemsTabProps {
  spawner: Spawner;
  setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function FixedItemsTab(_props: FixedItemsTabProps) {
  return (
    <div className="mt-4">
      <p>Fixed items tab content coming soon.</p>
    </div>
  );
}


