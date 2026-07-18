import { useQuery } from '@tanstack/react-query';
import { AlertCircleIcon, CopyPlus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog/confirm-dialog.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import { useImportedSpawners } from '@/hooks/use-imported-spawners.ts';
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
    const { importedSpawners, saveImportedSpawner } = useImportedSpawners();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();

    const baselineSpawnerRef = useRef<Spawner>({});
    const isDirty = fileName !== '' && JSON.stringify(spawner) !== JSON.stringify(baselineSpawnerRef.current);

    const { data: spawners = [], isLoading } = useQuery(trpc.spawners.list.queryOptions());
    const spawnerOptions = spawners
        .map((filename) => ({
            value: filename,
            label: filename.replace(/-/g, ' ').replace(/_/g, ' ').replace('.json', ''),
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    const handleChange = async (args: { value: string; label: string }) => {
        const fetched = await queryClient.fetchQuery(trpc.spawners.get.queryOptions(args.value));
        const normalized = withNormalizedArrays(fetched);
        setFileName(args.value);
        setSpawner(normalized);
        baselineSpawnerRef.current = normalized;
    };

    const handleClear = () => {
        setSpawner({});
        setFileName('');
        setDownloadUrl('');
        baselineSpawnerRef.current = {};
    };

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

        if (!next) {
            handleClear();
            return;
        }

        const selected = spawnerOptions.find((x) => x.value === next.value);
        if (selected) {
            await handleChange(selected);
        }
    };

    const handleDownload = () => {
        const json = JSON.stringify(withoutEmptyArrays(spawner), null, 2);
        const blob = new Blob([json], { type: 'application/json' });

        if (downloadUrl) {
            URL.revokeObjectURL(downloadUrl);
        }

        setDownloadUrl(URL.createObjectURL(blob));
    };

    const handleAddToMySpawners = async () => {
        if (!fileName) {
            return;
        }

        if (importedSpawners[fileName]) {
            const confirmed = await confirm({
                title: `Replace "${fileName}"?`,
                description: 'A spawner with this file name already exists in My Spawners. It will be overwritten.',
                confirmLabel: 'Replace',
            });

            if (!confirmed) {
                return;
            }
        }

        saveImportedSpawner(fileName, spawner);
        baselineSpawnerRef.current = spawner;
        toast(`Added "${fileName}" to My Spawners`, {
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

    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto w-full max-w-6xl rounded-xl text-base p-8">
                <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
                    Spawners
                </h1>

                <div className="grid w-full items-start gap-4 py-6">
                    <Alert>
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
                </div>

                <div className="my-4">
                    <Combobox
                        items={spawnerOptions}
                        itemToStringValue={(item: { label: string; value: string }) => item.label}
                        value={spawnerOptions.find((x) => x.value === fileName) ?? null}
                        isItemEqualToValue={(
                            a: { label: string; value: string } | null,
                            b: { label: string; value: string } | null,
                        ) => a?.value === b?.value}
                        onValueChange={(next) => void switchSpawner(next)}
                        autoHighlight={true}
                    >
                        <ComboboxInput
                            placeholder={isLoading ? 'Loading spawners...' : 'Select a spawner'}
                            disabled={isLoading}
                            showClear={true}
                        />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(spawner: { label: string; value: string }) => (
                                    <ComboboxItem key={spawner.value} value={spawner}>
                                        {spawner.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>

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
                        Unsaved changes — download this spawner or add it to My Spawners before switching, or your edits
                        will be lost.
                    </p>
                )}
                <div className="flex items-center gap-2 pt-8">
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
                    <Button variant="outline" className="flex-1" disabled={!fileName} onClick={handleAddToMySpawners}>
                        <CopyPlus />
                        Add to My Spawners
                    </Button>
                </div>
                {confirmDialog}
            </div>
        </div>
    );
}
