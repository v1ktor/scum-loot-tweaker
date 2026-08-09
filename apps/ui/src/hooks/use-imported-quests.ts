import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { Quest } from '@/data/quests/quests.types.ts';

const STORAGE_KEY = 'imported-quests';

type ImportedQuests = Record<string, Quest>;

function readStorage(): ImportedQuests {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ImportedQuests) : {};
    } catch {
        return {};
    }
}

function writeStorage(quests: ImportedQuests) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quests));
    } catch {
        toast.error('Failed to save the quest to browser storage');
    }
}

export function useImportedQuests() {
    const [importedQuests, setImportedQuests] = useState<ImportedQuests>(readStorage);

    const saveImportedQuest = useCallback((id: string, quest: Quest) => {
        setImportedQuests((prev) => {
            const next = { ...prev, [id]: quest };
            writeStorage(next);
            return next;
        });
    }, []);

    const deleteImportedQuests = useCallback((ids: string[]) => {
        setImportedQuests((prev) => {
            const next = { ...prev };
            for (const id of ids) {
                delete next[id];
            }
            writeStorage(next);
            return next;
        });
    }, []);

    const deleteImportedQuest = useCallback((id: string) => deleteImportedQuests([id]), [deleteImportedQuests]);

    return {
        importedQuests,
        saveImportedQuest,
        deleteImportedQuest,
        deleteImportedQuests,
    };
}
