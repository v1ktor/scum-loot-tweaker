import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { strToU8, zipSync } from 'fflate';
import { AlertCircleIcon, Download, List, ListChecks, Trash2, Upload } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { useImportedSpawners } from '@/hooks/use-imported-spawners.ts';
import { cn } from '@/lib/utils.ts';
import { columns, type MySpawnersTableMeta } from '@/pages/my-spawners/columns.tsx';
import { UploadSpawnerTab } from '@/pages/my-spawners/upload-spawner-tab.tsx';
import type { Spawner } from '@/pages/spawners/spawners.types.ts';
import { FixedItemsTab } from '@/pages/spawners/tabs/fixed-items-tab.tsx';
import { ItemsTab } from '@/pages/spawners/tabs/items-tab.tsx';
import { NodesTab } from '@/pages/spawners/tabs/nodes-tab.tsx';
import { SettingsTab } from '@/pages/spawners/tabs/settings-tab.tsx';
import { SubpresetsTab } from '@/pages/spawners/tabs/subpresets-tab.tsx';

type SpawnerOption = { value: string; label: string };

const formatLabel = (filename: string) => filename.replace(/-/g, ' ').replace(/_/g, ' ').replace('.json', '');

export function MySpawners() {
    const { importedSpawners, saveImportedSpawner, deleteImportedSpawner, deleteImportedSpawners } =
        useImportedSpawners();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();

    const [activeTab, setActiveTab] = useState('spawners');
    const [selectedFilename, setSelectedFilename] = useState('');
    const [spawner, setSpawner] = useState<Spawner>({});
    const [sorting, setSorting] = useState<SortingState>([{ id: 'filename', desc: false }]);
    const [rowSelection, setRowSelection] = useState({});

    const editorRef = useRef<HTMLDivElement>(null);

    const filenames = Object.keys(importedSpawners).sort((a, b) => a.localeCompare(b));
    const rows = useMemo(
        () => Object.entries(importedSpawners).map(([filename, data]) => ({ filename, spawner: data })),
        [importedSpawners],
    );
    const spawnerOptions: SpawnerOption[] = filenames
        .map((filename) => ({ value: filename, label: formatLabel(filename) }))
        .sort((a, b) => a.label.localeCompare(b.label));

    useEffect(() => {
        if (selectedFilename) {
            saveImportedSpawner(selectedFilename, spawner);
        }
    }, [spawner, selectedFilename, saveImportedSpawner]);

    const handleImport = (filename: string, importedSpawner: Spawner) => {
        saveImportedSpawner(filename, importedSpawner);
        if (filename === selectedFilename) {
            setSpawner(importedSpawner);
        }
    };

    const handleEdit = (filename: string) => {
        setSelectedFilename(filename);
        setSpawner(importedSpawners[filename]);
        setActiveTab('spawners');
        requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };

    const downloadBlob = (filename: string, blob: Blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleDownload = (filename: string, data: Spawner) => {
        const json = JSON.stringify(data, null, 2);
        downloadBlob(filename, new Blob([json], { type: 'application/json' }));
    };

    const handleDelete = async (filename: string) => {
        const confirmed = await confirm({
            title: `Delete "${filename}"?`,
            description: 'The imported spawner will be removed from your browser storage.',
        });

        if (!confirmed) {
            return;
        }

        deleteImportedSpawner(filename);
        if (filename === selectedFilename) {
            setSelectedFilename('');
            setSpawner({});
        }
        toast(`Deleted "${filename}"`);
    };

    const calculateNumberOfSettings = (data: Spawner) => {
        const excludedKeys: (keyof Spawner)[] = ['Items', 'Subpresets', 'FixedItems', 'Nodes'];
        const settingsKeys = Object.keys(data).filter((key) => !excludedKeys.includes(key as keyof Spawner));

        return settingsKeys.length;
    };

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row) => row.filename,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: { sorting, rowSelection },
        meta: {
            onEdit: handleEdit,
            onDownload: handleDownload,
            onDelete: handleDelete,
        } satisfies MySpawnersTableMeta,
    });

    const selectedRows = table.getSelectedRowModel().rows;

    const handleDownloadSelected = () => {
        const files: Record<string, Uint8Array> = {};
        for (const row of selectedRows) {
            files[row.original.filename] = strToU8(JSON.stringify(row.original.spawner, null, 2));
        }

        const zipped = zipSync(files);
        downloadBlob('my-spawners.zip', new Blob([zipped], { type: 'application/zip' }));
        toast(`${selectedRows.length} spawner(s) downloaded as my-spawners.zip`);
    };

    const handleDeleteSelected = async () => {
        const selectedFilenames = selectedRows.map((row) => row.original.filename);
        if (selectedFilenames.length === 0) {
            return;
        }

        const confirmed = await confirm({
            title: `Delete ${selectedFilenames.length} imported spawner(s)?`,
            description: 'The selected spawners will be removed from your browser storage.',
        });

        if (!confirmed) {
            return;
        }

        deleteImportedSpawners(selectedFilenames);
        if (selectedFilenames.includes(selectedFilename)) {
            setSelectedFilename('');
            setSpawner({});
        }
        setRowSelection({});
        toast(`${selectedFilenames.length} spawner(s) deleted`);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto w-full max-w-6xl rounded-xl text-base p-8">
                <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
                    My Spawners
                </h1>

                <p className="text-sm text-muted-foreground mt-2">
                    Edit your imported spawners. All changes are saved automatically.
                </p>

                <div className="grid w-full items-start gap-4 py-6">
                    <Alert>
                        <AlertCircleIcon />
                        <AlertTitle>
                            Imported spawners are stored in this browser only — they are not uploaded anywhere and are
                            not available on other devices.
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

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="spawners">
                            <List />
                            Spawners <Badge variant="secondary">{filenames.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="manage">
                            <ListChecks />
                            Manage
                        </TabsTrigger>
                        <TabsTrigger value="upload">
                            <Upload />
                            Upload
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="spawners" className="mt-2">
                        {filenames.length === 0 ? (
                            <div className="grid gap-3 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Nothing imported yet. Upload a spawner to get started.
                                </p>
                                <UploadSpawnerTab onImport={handleImport} />
                            </div>
                        ) : (
                            <div className="my-2 flex items-center gap-2">
                                <div className="flex-1">
                                    <Combobox
                                        items={spawnerOptions}
                                        itemToStringValue={(item: SpawnerOption) => item.label}
                                        value={
                                            spawnerOptions.find((option) => option.value === selectedFilename) ?? null
                                        }
                                        isItemEqualToValue={(a: SpawnerOption | null, b: SpawnerOption | null) =>
                                            a?.value === b?.value
                                        }
                                        onValueChange={(next) => {
                                            if (!next) {
                                                setSelectedFilename('');
                                                setSpawner({});
                                                return;
                                            }
                                            setSelectedFilename(next.value);
                                            setSpawner(importedSpawners[next.value]);
                                        }}
                                        autoHighlight={true}
                                    >
                                        <ComboboxInput placeholder="Select an imported spawner" showClear={true} />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(option: SpawnerOption) => (
                                                    <ComboboxItem key={option.value} value={option}>
                                                        {option.label}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </div>
                                {selectedFilename && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title="Delete spawner file"
                                        onClick={() => handleDelete(selectedFilename)}
                                    >
                                        <Trash2 />
                                    </Button>
                                )}
                            </div>
                        )}

                        {selectedFilename && (
                            <div ref={editorRef} className="mt-6 scroll-mt-20">
                                <Tabs defaultValue="settings">
                                    <TabsList>
                                        <TabsTrigger value="settings">
                                            Settings
                                            <Badge variant="secondary">{calculateNumberOfSettings(spawner)}</Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="items">
                                            Items <Badge variant="secondary">{spawner.Items?.length ?? 0}</Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="fixed-items">
                                            Fixed Items
                                            <Badge variant="secondary">{spawner.FixedItems?.length ?? 0}</Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="nodes">
                                            Nodes <Badge variant="secondary">{spawner.Nodes?.length ?? 0}</Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="subpresets">
                                            Subpresets{' '}
                                            <Badge variant="secondary">{spawner.Subpresets?.length ?? 0}</Badge>
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="settings" className="mt-0">
                                        <SettingsTab spawner={spawner} setSpawner={setSpawner} />
                                    </TabsContent>
                                    <TabsContent value="items" className="mt-0">
                                        <ItemsTab key={selectedFilename} spawner={spawner} setSpawner={setSpawner} />
                                    </TabsContent>
                                    <TabsContent value="fixed-items" className="mt-0">
                                        <FixedItemsTab
                                            key={selectedFilename}
                                            spawner={spawner}
                                            setSpawner={setSpawner}
                                        />
                                    </TabsContent>
                                    <TabsContent value="nodes" className="mt-0">
                                        <NodesTab key={selectedFilename} spawner={spawner} setSpawner={setSpawner} />
                                    </TabsContent>
                                    <TabsContent value="subpresets" className="mt-0">
                                        <SubpresetsTab
                                            key={selectedFilename}
                                            spawner={spawner}
                                            setSpawner={setSpawner}
                                        />
                                    </TabsContent>
                                </Tabs>

                                <div className="flex flex-wrap items-center gap-2 md:flex-row pt-8">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => handleDownload(selectedFilename, spawner)}
                                    >
                                        <Download />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="manage" className="mt-2">
                        {filenames.length === 0 ? (
                            <div className="grid gap-3 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Nothing imported yet. Upload a spawner to get started.
                                </p>
                                <UploadSpawnerTab onImport={handleImport} />
                            </div>
                        ) : (
                            <div>
                                {selectedRows.length > 0 && (
                                    <div className="flex items-center justify-end gap-2 pb-3">
                                        <Button variant="outline" size="sm" onClick={handleDownloadSelected}>
                                            <Download />
                                            Download selected ({selectedRows.length})
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                                            <Trash2 />
                                            Delete selected ({selectedRows.length})
                                        </Button>
                                    </div>
                                )}
                                <div className="overflow-hidden rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <TableHead key={header.id}>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header.column.columnDef.header,
                                                                      header.getContext(),
                                                                  )}
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                        <TableBody>
                                            {table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && 'selected'}
                                                    className={cn(
                                                        row.original.filename === selectedFilename && 'bg-muted/50',
                                                    )}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="pt-3 text-sm text-muted-foreground">
                                    {selectedRows.length} of {rows.length} row(s) selected.
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="upload" className="mt-2">
                        <UploadSpawnerTab onImport={handleImport} />
                    </TabsContent>
                </Tabs>
                {confirmDialog}
            </div>
        </div>
    );
}
