import { useQuery } from '@tanstack/react-query';
import { AlertCircleIcon, CopyPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog/confirm-dialog.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import { useImportedSpawners } from '@/hooks/use-imported-spawners.ts';
import { filenameToBreadcrumbSegments } from '@/pages/spawners/spawner-tree/build-spawner-tree.ts';
import { SpawnerTreeSidebar } from '@/pages/spawners/spawner-tree/spawner-tree-sidebar.tsx';
import type { Spawner } from '@/pages/spawners/spawners.types.ts';
import { FixedItemsTab } from '@/pages/spawners/tabs/fixed-items-tab.tsx';
import { ItemsTab } from '@/pages/spawners/tabs/items-tab.tsx';
import { NodesTab } from '@/pages/spawners/tabs/nodes-tab.tsx';
import { SettingsTab } from '@/pages/spawners/tabs/settings-tab.tsx';
import { SubpresetsTab } from '@/pages/spawners/tabs/subpresets-tab.tsx';
import { queryClient } from '@/query-client.ts';
import { trpc } from '@/trpc.ts';

const SPAWNER_ARRAY_KEYS = ['Items', 'FixedItems', 'Nodes', 'Subpresets'] as const;

function withNormalizedArrays(s: Spawner): Spawner {
    const result = { ...s };

    for (const key of SPAWNER_ARRAY_KEYS) {
        result[key] ??= [];
    }

    return result;
}

function withoutEmptyArrays(s: Spawner): Spawner {
    const result = { ...s };

    for (const key of SPAWNER_ARRAY_KEYS) {
        if (result[key]?.length === 0) delete result[key];
    }
    return result;
}

export function Spawners() {
    const [spawner, setSpawner] = useState<Spawner>({});
    const [fileName, setFileName] = useState<string>('');
    const [downloadUrl, setDownloadUrl] = useState<string>('');

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const fileParam = searchParams.get('file');
    const { importedSpawners, saveImportedSpawner, saveImportedSpawners } = useImportedSpawners();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();

    const [categoryConflict, setCategoryConflict] = useState<{
        categoryName: string;
        totalCount: number;
        existingFilenames: string[];
        resolve: (action: 'skip' | 'overwrite' | null) => void;
    } | null>(null);

    const resolveCategoryConflict = (action: 'skip' | 'overwrite' | null) => {
        categoryConflict?.resolve(action);
        setCategoryConflict(null);
    };

    const askCategoryConflictAction = (categoryName: string, totalCount: number, existingFilenames: string[]) =>
        new Promise<'skip' | 'overwrite' | null>((resolve) => {
            setCategoryConflict({ categoryName, totalCount, existingFilenames, resolve });
        });

    const baselineSpawnerRef = useRef<Spawner>({});
    const isDirty = fileName !== '' && JSON.stringify(spawner) !== JSON.stringify(baselineSpawnerRef.current);

    const { data: spawners = [], isLoading } = useQuery(trpc.spawners.list.queryOptions());

    // The ?file= query param is the single source of truth for the selected spawner: the sidebar
    // only writes to the URL (see switchSpawner) and the effect below loads whatever it points at.
    // Keeping this one-directional avoids a URL<->state feedback loop that would otherwise revert a
    // fresh selection during the render tick where fileName has updated but the URL hasn't yet.
    const setFileParam = (filename: string | null) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                if (filename) {
                    next.set('file', filename);
                } else {
                    next.delete('file');
                }
                return next;
            },
            { replace: true },
        );
    };

    useEffect(() => {
        if (!fileParam) {
            if (fileName !== '') {
                setSpawner({});
                setFileName('');
                setDownloadUrl('');
                baselineSpawnerRef.current = {};
            }
            return;
        }

        if (fileParam === fileName || !spawners.includes(fileParam)) {
            return;
        }

        let cancelled = false;

        void queryClient.fetchQuery(trpc.spawners.get.queryOptions(fileParam)).then((fetched) => {
            if (cancelled) {
                return;
            }

            const normalized = withNormalizedArrays(fetched);
            setFileName(fileParam);
            setSpawner(normalized);
            baselineSpawnerRef.current = normalized;
        });

        return () => {
            cancelled = true;
        };
    }, [fileParam, spawners, fileName]);

    const switchSpawner = async (next: { value: string; label: string } | null) => {
        if (isDirty) {
            const confirmed = await confirm({
                title: 'Discard unsaved changes?',
                description:
                    'Unsaved changes — download this spawner or add it to My Spawners before switching, or your edits will be lost. Switching now will discard them.',
                confirmLabel: 'Discard changes',
            });

            if (!confirmed) {
                return;
            }
        }

        setFileParam(next ? next.value : null);
    };

    const handleDownload = () => {
        const json = JSON.stringify(withoutEmptyArrays(spawner), null, 2);
        const blob = new Blob([json], { type: 'application/json' });

        if (downloadUrl) {
            URL.revokeObjectURL(downloadUrl);
        }

        setDownloadUrl(URL.createObjectURL(blob));
    };

    const addSpawnerToMySpawners = async (filename: string) => {
        if (!filename) {
            return;
        }

        if (importedSpawners[filename]) {
            const confirmed = await confirm({
                title: `Replace "${filename}"?`,
                description: 'A spawner with this file name already exists in My Spawners. It will be overwritten.',
                confirmLabel: 'Replace',
            });

            if (!confirmed) {
                return;
            }
        }

        const targetSpawner =
            filename === fileName
                ? spawner
                : withNormalizedArrays(await queryClient.fetchQuery(trpc.spawners.get.queryOptions(filename)));

        saveImportedSpawner(filename, targetSpawner);

        if (filename === fileName) {
            baselineSpawnerRef.current = targetSpawner;
        }

        toast(`Added "${filename}" to My Spawners`, {
            action: {
                label: 'Open',
                onClick: () => navigate(NavigationPath.MySpawners),
            },
        });
    };

    const handleAddToMySpawners = () => addSpawnerToMySpawners(fileName);

    const addCategoryToMySpawners = async (filenames: string[], categoryName: string) => {
        if (filenames.length === 0) {
            return;
        }

        const existingFilenames = filenames.filter((filename) => importedSpawners[filename]);
        let filenamesToAdd = filenames;

        if (existingFilenames.length > 0) {
            const action = await askCategoryConflictAction(categoryName, filenames.length, existingFilenames);

            if (!action) {
                return;
            }

            if (action === 'skip') {
                filenamesToAdd = filenames.filter((filename) => !importedSpawners[filename]);
            }
        } else {
            const confirmed = await confirm({
                title: `Add ${filenames.length} spawner${filenames.length === 1 ? '' : 's'} from "${categoryName}"?`,
                description: 'This will add all spawners in this category to My Spawners.',
                confirmLabel: 'Add',
            });

            if (!confirmed) {
                return;
            }
        }

        if (filenamesToAdd.length === 0) {
            return;
        }

        const fetched = await Promise.all(
            filenamesToAdd.map(async (filename) => {
                const targetSpawner =
                    filename === fileName
                        ? spawner
                        : withNormalizedArrays(await queryClient.fetchQuery(trpc.spawners.get.queryOptions(filename)));
                return [filename, targetSpawner] as const;
            }),
        );

        saveImportedSpawners(Object.fromEntries(fetched));

        const savedCurrent = fetched.find(([filename]) => filename === fileName);
        if (savedCurrent) {
            baselineSpawnerRef.current = savedCurrent[1];
        }

        toast(`Added ${filenamesToAdd.length} spawner${filenamesToAdd.length === 1 ? '' : 's'} to My Spawners`, {
            action: {
                label: 'Open',
                onClick: () => navigate(NavigationPath.MySpawners),
            },
        });
    };

    const calculateNumberOfSettings = (data: Spawner) => {
        const excludedKeys: (keyof Spawner)[] = ['Items', 'Subpresets', 'FixedItems', 'Nodes'];
        const settingsKeys = Object.keys(data).filter((key) => !excludedKeys.includes(key as keyof Spawner));

        return settingsKeys.length;
    };

    const breadcrumbSegments = fileName ? filenameToBreadcrumbSegments(fileName) : [];

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col gap-4 overflow-hidden p-4">
            <div>
                <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
                    Spawners
                </h1>
            </div>

            <Alert className="shrink-0">
                <AlertCircleIcon />
                <AlertTitle>
                    Do not rename the files, as the name is used to reference the spawner in the game!
                </AlertTitle>
                <AlertCircleIcon />
                <AlertTitle>Place downloaded files in the following directories:</AlertTitle>
                <AlertDescription>
                    <ul>
                        <li className="py-1">
                            Single-Player:{' '}
                            <code className="bg-muted/70 font-mono px-1 py-0.5 rounded">
                                %LocalAppData%\SCUM\Saved\Config\WindowsNoEditor\Loot\Spawners\Presets\Override\
                            </code>
                        </li>
                        <li>
                            Multiplayer:{' '}
                            <code className="bg-muted/70 font-mono px-1 py-0.5 rounded">
                                %Server%\SCUM\Saved\Config\WindowsServer\Loot\Spawners\Presets\Override\
                            </code>
                        </li>
                    </ul>
                </AlertDescription>
            </Alert>

            <div className="flex min-h-0 flex-1 gap-4">
                <SpawnerTreeSidebar
                    filenames={spawners}
                    selectedFilename={fileName}
                    isLoading={isLoading}
                    onSelect={(filename, label) => void switchSpawner({ value: filename, label })}
                    onAddToMySpawners={(filename) => void addSpawnerToMySpawners(filename)}
                    onAddCategoryToMySpawners={(filenames, categoryName) =>
                        void addCategoryToMySpawners(filenames, categoryName)
                    }
                />

                <ScrollArea className="bg-muted/50 min-h-0 min-w-0 max-w-5xl flex-1 rounded-xl">
                    <div className="p-8">
                        {breadcrumbSegments.length > 0 && (
                            <div className="mb-6">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {[...breadcrumbSegments.slice(0, -1), fileName].map((segment, i, arr) => (
                                            <BreadcrumbItem key={segment}>
                                                {i > 0 && <BreadcrumbSeparator />}
                                                {i === arr.length - 1 ? (
                                                    <BreadcrumbPage className="break-all">{segment}</BreadcrumbPage>
                                                ) : (
                                                    segment
                                                )}
                                            </BreadcrumbItem>
                                        ))}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        )}
                        <Tabs defaultValue="settings">
                            <TabsList>
                                <TabsTrigger value="settings">
                                    Settings<Badge variant="secondary">{calculateNumberOfSettings(spawner)}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="items">
                                    Items <Badge variant="secondary">{spawner.Items?.length ?? 0}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="fixed-items">
                                    Fixed Items<Badge variant="secondary">{spawner.FixedItems?.length ?? 0}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="nodes">
                                    Nodes <Badge variant="secondary">{spawner.Nodes?.length ?? 0}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="subpresets">
                                    Subpresets <Badge variant="secondary">{spawner.Subpresets?.length ?? 0}</Badge>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="settings" className="mt-0">
                                <SettingsTab spawner={spawner} setSpawner={setSpawner} />
                            </TabsContent>
                            <TabsContent value="items" className="mt-0">
                                <ItemsTab key={fileName} spawner={spawner} setSpawner={setSpawner} />
                            </TabsContent>
                            <TabsContent value="fixed-items" className="mt-0">
                                <FixedItemsTab key={fileName} spawner={spawner} setSpawner={setSpawner} />
                            </TabsContent>
                            <TabsContent value="nodes" className="mt-0">
                                <NodesTab key={fileName} spawner={spawner} setSpawner={setSpawner} />
                            </TabsContent>
                            <TabsContent value="subpresets" className="mt-0">
                                <SubpresetsTab key={fileName} spawner={spawner} setSpawner={setSpawner} />
                            </TabsContent>
                        </Tabs>
                        {isDirty && (
                            <p className="pt-4 text-sm text-amber-400">
                                Unsaved changes — download this spawner or add it to My Spawners before switching, or
                                your edits will be lost.
                            </p>
                        )}
                        <div className="flex items-center gap-2 py-8">
                            {fileName ? (
                                <Button variant="outline" className="flex-4" asChild onClick={handleDownload}>
                                    <a href={downloadUrl} download={fileName}>
                                        Download
                                    </a>
                                </Button>
                            ) : (
                                <Button variant="outline" className="flex-4" disabled>
                                    Download
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                className="flex-1"
                                disabled={!fileName}
                                onClick={handleAddToMySpawners}
                            >
                                <CopyPlus />
                                Add to My Spawners
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            {confirmDialog}

            <Dialog
                open={!!categoryConflict}
                onOpenChange={(open) => {
                    if (!open) resolveCategoryConflict(null);
                }}
            >
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>
                            Add {categoryConflict?.totalCount} spawner{categoryConflict?.totalCount === 1 ? '' : 's'}{' '}
                            from "{categoryConflict?.categoryName}"?
                        </DialogTitle>
                        <DialogDescription>
                            {categoryConflict?.existingFilenames.length} of these already exist in My Spawners. Choose
                            whether to overwrite them or skip them and only add the new ones.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-48 overflow-y-auto rounded-md border p-2 text-sm">
                        {categoryConflict?.existingFilenames.map((filename) => (
                            <div key={filename} className="text-muted-foreground truncate">
                                {filenameToBreadcrumbSegments(filename).at(-1)}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => resolveCategoryConflict(null)}>
                            Cancel
                        </Button>
                        <Button variant="outline" onClick={() => resolveCategoryConflict('skip')}>
                            Skip existing
                        </Button>
                        <Button variant="destructive" onClick={() => resolveCategoryConflict('overwrite')}>
                            Overwrite all
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
