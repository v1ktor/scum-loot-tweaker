import type { Dispatch, SetStateAction } from 'react';
import type { Spawner } from '@/pages/spawners/Spawners.types.ts';

interface SubpresetsTabProps {
    spawner: Spawner;
    setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function SubpresetsTab({ spawner: _spawner, setSpawner: _setSpawner }: SubpresetsTabProps) {
    return (
        <div className="mt-4">
            <p>Subpresets tab content coming soon.</p>
        </div>
    );
}
