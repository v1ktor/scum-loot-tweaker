import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { LootNode } from '@/pages/spawners/spawners.types.ts';

const STORAGE_KEY = 'imported-nodes';

export type ImportedNodes = Record<string, LootNode>;

export function readImportedNodes(): ImportedNodes {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ImportedNodes) : {};
    } catch {
        return {};
    }
}

function writeStorage(nodes: ImportedNodes) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
    } catch {
        toast.error('Failed to save the node file to browser storage');
    }
}

export function useImportedNodes() {
    const [importedNodes, setImportedNodes] = useState<ImportedNodes>(readImportedNodes);

    const saveImportedNode = useCallback((filename: string, node: LootNode) => {
        setImportedNodes((prev) => {
            const next = { ...prev, [filename]: node };
            writeStorage(next);
            return next;
        });
    }, []);

    const deleteImportedNodes = useCallback((filenames: string[]) => {
        setImportedNodes((prev) => {
            const next = { ...prev };
            for (const filename of filenames) {
                delete next[filename];
            }
            writeStorage(next);
            return next;
        });
    }, []);

    const deleteImportedNode = useCallback(
        (filename: string) => deleteImportedNodes([filename]),
        [deleteImportedNodes],
    );

    return {
        importedNodes,
        saveImportedNode,
        deleteImportedNode,
        deleteImportedNodes,
    };
}
