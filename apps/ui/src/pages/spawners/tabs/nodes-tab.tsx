import {Dispatch, SetStateAction} from 'react';
import {Spawner} from '@/pages/spawners/Spawners.types.ts';

interface NodesTabProps {
  spawner: Spawner;
  setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function NodesTab({spawner: _spawner, setSpawner: _setSpawner}: NodesTabProps) {
  return (
    <div className="mt-4">
      <p>Nodes tab content coming soon.</p>
    </div>
  );
}


