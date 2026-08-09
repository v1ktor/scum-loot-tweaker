import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { strToU8, zipSync } from 'fflate';
import { AlertCircleIcon, Download, List, ListChecks, Trash2, Upload } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
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
import type { Quest } from '@/data/quests/quests.types.ts';
import { useImportedQuests } from '@/hooks/use-imported-quests.ts';
import { cn } from '@/lib/utils.ts';
import { columns, type MyQuestsTableMeta } from '@/pages/my-quests/columns.tsx';
import { UploadQuestTab } from '@/pages/my-quests/upload-quest-tab.tsx';
import { QuestEditor } from '@/pages/quests/editor/quest-editor.tsx';
import { downloadBlob, downloadQuest, toGameQuest } from '@/pages/quests/quest-serialization.ts';
import { QUEST_ID_PATTERN } from '@/pages/quests/quest-validation.ts';
import type { QuestBody } from '@/utils/parse-quest.ts';

type QuestOption = { value: string; label: string };

export function MyQuests() {
    const { importedQuests, saveImportedQuest, deleteImportedQuest, deleteImportedQuests } = useImportedQuests();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();

    const [activeTab, setActiveTab] = useState('quests');
    const [selectedId, setSelectedId] = useState('');
    const [editorKey, setEditorKey] = useState('');
    const [sorting, setSorting] = useState<SortingState>([{ id: 'title', desc: false }]);
    const [rowSelection, setRowSelection] = useState({});

    const editorRef = useRef<HTMLDivElement>(null);

    const rows = useMemo(() => Object.entries(importedQuests).map(([id, quest]) => ({ id, quest })), [importedQuests]);
    const questOptions: QuestOption[] = rows
        .map(({ id, quest }) => ({ value: id, label: quest.Title || id }))
        .sort((a, b) => a.label.localeCompare(b.label));

    const handleImport = (filename: string, quest: QuestBody) => {
        const id = filename.replace(/\.json$/i, '') || `custom_${crypto.randomUUID()}`;
        saveImportedQuest(id, { ...quest, id });
    };

    const selectQuest = (id: string) => {
        setSelectedId(id);
        setEditorKey(id);
    };

    const handleEdit = (id: string) => {
        selectQuest(id);
        setActiveTab('quests');
        requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };

    const handleEditorChange = (quest: Quest) => {
        if (!selectedId) return;

        const canRename = QUEST_ID_PATTERN.test(quest.id) && !importedQuests[quest.id];
        const key = quest.id === selectedId || !canRename ? selectedId : quest.id;

        if (key !== selectedId) {
            deleteImportedQuest(selectedId);
            setSelectedId(key);
        }
        saveImportedQuest(key, quest);
    };

    const handleDelete = async (id: string) => {
        const quest = importedQuests[id];
        const confirmed = await confirm({
            title: `Delete "${quest?.Title || id}"?`,
            description: 'The quest will be removed from your browser storage.',
        });

        if (!confirmed) {
            return;
        }

        deleteImportedQuest(id);
        if (id === selectedId) {
            selectQuest('');
        }
        toast(`Deleted "${quest?.Title || id}"`);
    };

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row) => row.id,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: { sorting, rowSelection },
        meta: {
            onEdit: handleEdit,
            onDownload: (quest: Quest) => downloadQuest(quest),
            onDelete: handleDelete,
        } satisfies MyQuestsTableMeta,
    });

    const selectedRows = table.getSelectedRowModel().rows;

    const handleDownloadSelected = () => {
        const files: Record<string, Uint8Array> = {};
        for (const row of selectedRows) {
            files[`${row.original.id}.json`] = strToU8(JSON.stringify(toGameQuest(row.original.quest), null, 2));
        }

        const zipped = zipSync(files);
        downloadBlob('my-quests.zip', new Blob([zipped], { type: 'application/zip' }));
        toast(`${selectedRows.length} quest(s) downloaded as my-quests.zip`);
    };

    const handleDeleteSelected = async () => {
        const ids = selectedRows.map((row) => row.original.id);
        if (ids.length === 0) {
            return;
        }

        const confirmed = await confirm({
            title: `Delete ${ids.length} quest(s)?`,
            description: 'The selected quests will be removed from your browser storage.',
        });

        if (!confirmed) {
            return;
        }

        deleteImportedQuests(ids);
        if (ids.includes(selectedId)) {
            selectQuest('');
        }
        setRowSelection({});
        toast(`${ids.length} quest(s) deleted`);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto w-full max-w-5xl rounded-xl text-base p-8">
                <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
                    My Quests
                </h1>

                <p className="text-sm text-muted-foreground mt-2">
                    Quests you have edited or imported. Pick one to edit — all changes are saved automatically.
                </p>

                <div className="grid w-full items-start gap-4 py-6">
                    <Alert>
                        <AlertCircleIcon />
                        <AlertTitle>
                            Edited quests are stored in this browser only — they are not uploaded anywhere and are not
                            available on other devices.
                        </AlertTitle>
                        <AlertCircleIcon />
                        <AlertTitle>
                            A downloaded file is a single quest Override. Registering it in the game's quest list is
                            manual.
                        </AlertTitle>
                        <AlertDescription>
                            <ul>
                                <li className="py-1">
                                    Single-Player:{' '}
                                    <code className="bg-muted/70 font-mono px-1 py-0.5 rounded">
                                        %LocalAppData%\SCUM\Saved\Config\WindowsNoEditor\Quests\Override\
                                    </code>
                                </li>
                                <li>
                                    Multiplayer:{' '}
                                    <code className="bg-muted/70 font-mono px-1 py-0.5 rounded">
                                        %Server%\SCUM\Saved\Config\WindowsServer\Quests\Override\
                                    </code>
                                </li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="quests">
                            <List />
                            Quests <Badge variant="secondary">{rows.length}</Badge>
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

                    <TabsContent value="quests" className="mt-2">
                        {rows.length === 0 ? (
                            <div className="grid gap-3 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Nothing here yet. Upload a quest to get started.
                                </p>
                                <UploadQuestTab onImport={handleImport} />
                            </div>
                        ) : (
                            <div className="my-2 flex items-center gap-2">
                                <div className="flex-1">
                                    <Combobox
                                        items={questOptions}
                                        itemToStringValue={(item: QuestOption) => item.label}
                                        value={questOptions.find((option) => option.value === selectedId) ?? null}
                                        isItemEqualToValue={(a: QuestOption | null, b: QuestOption | null) =>
                                            a?.value === b?.value
                                        }
                                        onValueChange={(next) => selectQuest(next?.value ?? '')}
                                        autoHighlight={true}
                                    >
                                        <ComboboxInput placeholder="Select an imported quest" showClear={true} />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No quests found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(option: QuestOption) => (
                                                    <ComboboxItem key={option.value} value={option}>
                                                        {option.label}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </div>
                                {selectedId && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title="Delete quest"
                                        onClick={() => handleDelete(selectedId)}
                                    >
                                        <Trash2 />
                                    </Button>
                                )}
                            </div>
                        )}

                        {selectedId && importedQuests[selectedId] && (
                            <div ref={editorRef} className="mt-6 scroll-mt-20">
                                <QuestEditor
                                    key={editorKey}
                                    initialQuest={importedQuests[selectedId]}
                                    heading="Edit quest"
                                    onChange={handleEditorChange}
                                    onCancel={() => selectQuest('')}
                                />
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="manage" className="mt-2">
                        {rows.length === 0 ? (
                            <div className="grid gap-3 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Nothing here yet. Upload a quest to get started.
                                </p>
                                <UploadQuestTab onImport={handleImport} />
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
                                                    className={cn(row.original.id === selectedId && 'bg-muted/50')}
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
                        <UploadQuestTab onImport={handleImport} />
                    </TabsContent>
                </Tabs>
                {confirmDialog}
            </div>
        </div>
    );
}
