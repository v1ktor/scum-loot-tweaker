import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { Spawner } from '@/pages/spawners/spawners.types.ts';

const STORAGE_KEY = 'imported-spawners';

type ImportedSpawners = Record<string, Spawner>;

function readStorage(): ImportedSpawners {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ImportedSpawners) : {};
    } catch {
        return {};
    }
}

function writeStorage(spawners: ImportedSpawners) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(spawners));
    } catch {
        toast.error('Failed to save the spawner to browser storage');
    }
}

export function useImportedSpawners() {
    const [importedSpawners, setImportedSpawners] = useState<ImportedSpawners>(readStorage);

    const saveImportedSpawner = useCallback((filename: string, spawner: Spawner) => {
        setImportedSpawners((prev) => {
            const next = { ...prev, [filename]: spawner };
            writeStorage(next);
            return next;
        });
    }, []);

    const saveImportedSpawners = useCallback((entries: Record<string, Spawner>) => {
        setImportedSpawners((prev) => {
            const next = { ...prev, ...entries };
            writeStorage(next);
            return next;
        });
    }, []);

    const deleteImportedSpawners = useCallback((filenames: string[]) => {
        setImportedSpawners((prev) => {
            const next = { ...prev };
            for (const filename of filenames) {
                delete next[filename];
            }
            writeStorage(next);
            return next;
        });
    }, []);

    const deleteImportedSpawner = useCallback(
        (filename: string) => deleteImportedSpawners([filename]),
        [deleteImportedSpawners],
    );

    return {
        importedSpawners,
        saveImportedSpawner,
        saveImportedSpawners,
        deleteImportedSpawner,
        deleteImportedSpawners,
    };
}
