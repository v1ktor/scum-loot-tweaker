import { Upload } from 'lucide-react';
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils.ts';
import type { Spawner } from '@/pages/spawners/spawners.types.ts';
import { parseSpawnerJson } from '@/utils/parse-spawner.ts';

interface UploadSpawnerTabProps {
    onImport: (filename: string, spawner: Spawner) => void;
}

export function UploadSpawnerTab(props: UploadSpawnerTabProps) {
    const { onImport } = props;

    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    const importFiles = async (files: File[]) => {
        if (files.length === 0) {
            return;
        }

        const errors: string[] = [];
        let importedCount = 0;

        for (const file of files) {
            const result = parseSpawnerJson(await file.text());
            if (result.ok) {
                onImport(file.name, result.spawner);
                importedCount++;
            } else {
                errors.push(`${file.name}: ${result.error}`);
            }
        }

        if (importedCount > 0) {
            toast(`${importedCount} spawner(s) imported`);
        }

        setError(errors.join('\n'));
    };

    const handleFilesChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = '';
        await importFiles(files);
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragCounter.current++;
        setIsDragging(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragCounter.current = 0;
        setIsDragging(false);
        await importFiles(Array.from(event.dataTransfer.files));
    };

    return (
        <div className="grid gap-4">
            <div
                role="button"
                tabIndex={0}
                aria-label="Upload spawner files"
                className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-12 text-center cursor-pointer transition-colors',
                    isDragging
                        ? 'border-primary bg-primary/10'
                        : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50',
                )}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        fileInputRef.current?.click();
                    }
                }}
                onDragEnter={handleDragEnter}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Upload className={cn('size-10', isDragging ? 'text-primary' : 'text-muted-foreground')} />
                <p className="text-sm font-medium">
                    {isDragging ? 'Drop the files to import' : 'Drag & drop spawner files here'}
                </p>
                <p className="text-xs text-muted-foreground">
                    or click to browse — <code className="font-mono">.json</code> files from your Override folder
                </p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    multiple
                    className="hidden"
                    onChange={handleFilesChange}
                />
            </div>

            {error && <p className="text-sm text-destructive whitespace-pre-wrap">{error}</p>}
        </div>
    );
}
