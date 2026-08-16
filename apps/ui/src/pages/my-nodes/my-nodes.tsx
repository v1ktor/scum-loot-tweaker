import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { strToU8, zipSync } from 'fflate';
import { AlertCircleIcon, Download, List, ListChecks, Plus, Trash2, TriangleAlertIcon, Upload } from 'lucide-react';
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
import { useImportedNodes } from '@/hooks/use-imported-nodes.ts';
import { cn } from '@/lib/utils.ts';
import { columns, type MyNodesTableMeta } from '@/pages/my-nodes/columns.tsx';
import { CreateNodeDialog } from '@/pages/my-nodes/create-node-dialog.tsx';
import { NodeEditor } from '@/pages/my-nodes/node-editor.tsx';
import { createNodeTree, serializeNodeTree, validateNodeTree } from '@/pages/my-nodes/node-tree-ops.ts';
import { UploadNodeTab } from '@/pages/my-nodes/upload-node-tab.tsx';
import type { LootNode, Option } from '@/pages/spawners/spawners.types.ts';

const formatLabel = (filename: string) => filename.replace('.json', '');

export function MyNodes() {
    const { importedNodes, saveImportedNode, deleteImportedNode, deleteImportedNodes } = useImportedNodes();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();

    const [activeTab, setActiveTab] = useState('nodes');
    const [selectedFilename, setSelectedFilename] = useState('');
    const [node, setNode] = useState<LootNode>(createNodeTree);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'filename', desc: false }]);
    const [rowSelection, setRowSelection] = useState({});
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);

    const filenames = Object.keys(importedNodes).sort((a, b) => a.localeCompare(b));
    const rows = useMemo(
        () => Object.entries(importedNodes).map(([filename, data]) => ({ filename, node: data })),
        [importedNodes],
    );
    const nodeOptions: Option[] = filenames
        .map((filename) => ({ value: filename, label: formatLabel(filename) }))
        .sort((a, b) => a.label.localeCompare(b.label));

    useEffect(() => {
        if (selectedFilename) {
            saveImportedNode(selectedFilename, node);
        }
    }, [node, selectedFilename, saveImportedNode]);

    const issues = useMemo(() => (selectedFilename ? validateNodeTree(node) : []), [node, selectedFilename]);

    const openForEditing = (filename: string, data: LootNode) => {
        setSelectedFilename(filename);
        setNode(data);
        setActiveTab('nodes');
        requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };

    const handleImport = (filename: string, importedNode: LootNode) => {
        saveImportedNode(filename, importedNode);
        if (filename === selectedFilename) {
            setNode(importedNode);
        }
    };

    const handleCreate = (filename: string, created: LootNode) => {
        saveImportedNode(filename, created);
        openForEditing(filename, created);
        toast(`Created "${filename}"`);
    };

    const handleEdit = (filename: string) => openForEditing(filename, importedNodes[filename]);

    const downloadBlob = (filename: string, blob: Blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleDownload = (filename: string, data: LootNode) => {
        const json = JSON.stringify(serializeNodeTree(data), null, 2);
        downloadBlob(filename, new Blob([json], { type: 'application/json' }));
    };

    const handleDelete = async (filename: string) => {
        const confirmed = await confirm({
            title: `Delete "${filename}"?`,
            description: 'The node file will be removed from your browser storage.',
        });

        if (!confirmed) {
            return;
        }

        deleteImportedNode(filename);
        if (filename === selectedFilename) {
            setSelectedFilename('');
            setNode(createNodeTree());
        }
        toast(`Deleted "${filename}"`);
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
        } satisfies MyNodesTableMeta,
    });

    const selectedRows = table.getSelectedRowModel().rows;

    const handleDownloadSelected = () => {
        const files: Record<string, Uint8Array> = {};
        for (const row of selectedRows) {
            files[row.original.filename] = strToU8(JSON.stringify(serializeNodeTree(row.original.node), null, 2));
        }

        const zipped = zipSync(files);
        downloadBlob('my-nodes.zip', new Blob([zipped], { type: 'application/zip' }));
        toast(`${selectedRows.length} node file(s) downloaded as my-nodes.zip`);
    };

    const handleDeleteSelected = async () => {
        const selectedFilenames = selectedRows.map((row) => row.original.filename);
        if (selectedFilenames.length === 0) {
            return;
        }

        const confirmed = await confirm({
            title: `Delete ${selectedFilenames.length} node file(s)?`,
            description: 'The selected node files will be removed from your browser storage.',
        });

        if (!confirmed) {
            return;
        }

        deleteImportedNodes(selectedFilenames);
        if (selectedFilenames.includes(selectedFilename)) {
            setSelectedFilename('');
            setNode(createNodeTree());
        }
        setRowSelection({});
        toast(`${selectedFilenames.length} node file(s) deleted`);
    };

    const emptyState = (
        <div className="grid gap-3 py-4">
            <p className="text-sm text-muted-foreground">
                Nothing here yet. Create a node file, or upload one you already have.
            </p>
            <Button className="w-fit" onClick={() => setCreateDialogOpen(true)}>
                <Plus />
                New node file
            </Button>
            <UploadNodeTab onImport={handleImport} />
        </div>
    );

    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto w-full max-w-6xl rounded-xl text-base p-8">
                <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
                    My Nodes
                </h1>

                <p className="text-sm text-muted-foreground mt-2">
                    Build your own loot node trees and reference them from your spawners. All changes are saved
                    automatically.
                </p>

                <div className="grid w-full items-start gap-4 py-6">
                    <Alert>
                        <AlertCircleIcon />
                        <AlertTitle>
                            Node files are stored in this browser only — they are not uploaded anywhere and are not
                            available on other devices.
                        </AlertTitle>
                        <AlertCircleIcon />
                        <AlertTitle>Place downloaded files in the following directories:</AlertTitle>
                        <AlertDescription>
                            <ul>
                                <li className="py-1">
                                    Single-Player:{' '}
                                    <code className="bg-muted/70 font-mono px-1 py-0.5 rounded">
                                        %LocalAppData%\SCUM\Saved\Config\WindowsNoEditor\Loot\Nodes\Override\
                                    </code>
                                </li>
                                <li>
                                    Multiplayer:{' '}
                                    <code className="bg-muted/70 font-mono px-1 py-0.5 rounded">
                                        %Server%\SCUM\Saved\Config\WindowsServer\Loot\Nodes\Override\
                                    </code>
                                </li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="nodes">
                            <List />
                            Nodes <Badge variant="secondary">{filenames.length}</Badge>
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

                    <TabsContent value="nodes" className="mt-2">
                        {filenames.length === 0 ? (
                            emptyState
                        ) : (
                            <div className="my-2 flex items-center gap-2">
                                <div className="flex-1">
                                    <Combobox
                                        items={nodeOptions}
                                        itemToStringValue={(item: Option) => item.label}
                                        value={nodeOptions.find((option) => option.value === selectedFilename) ?? null}
                                        isItemEqualToValue={(a: Option | null, b: Option | null) =>
                                            a?.value === b?.value
                                        }
                                        onValueChange={(next) => {
                                            if (!next) {
                                                setSelectedFilename('');
                                                setNode(createNodeTree());
                                                return;
                                            }
                                            setSelectedFilename(next.value);
                                            setNode(importedNodes[next.value]);
                                        }}
                                        autoHighlight={true}
                                    >
                                        <ComboboxInput placeholder="Select a node file" showClear={true} />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(option: Option) => (
                                                    <ComboboxItem key={option.value} value={option}>
                                                        {option.label}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </div>
                                <Button variant="outline" onClick={() => setCreateDialogOpen(true)}>
                                    <Plus />
                                    New
                                </Button>
                                {selectedFilename && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title="Delete node file"
                                        onClick={() => handleDelete(selectedFilename)}
                                    >
                                        <Trash2 />
                                    </Button>
                                )}
                            </div>
                        )}

                        {selectedFilename && (
                            <div ref={editorRef} className="mt-6 scroll-mt-20">
                                <NodeEditor key={selectedFilename} node={node} onChange={setNode} />

                                {issues.length > 0 && (
                                    <Alert className="mt-4">
                                        <TriangleAlertIcon />
                                        <AlertTitle>
                                            {issues.length} thing(s) will be skipped when the file is downloaded
                                        </AlertTitle>
                                        <AlertDescription>
                                            <ul className="list-disc pl-4">
                                                {issues.map((issue, index) => (
                                                    <li key={index}>
                                                        <span className="font-mono text-xs">{issue.path}</span> —{' '}
                                                        {issue.message}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <div className="flex flex-wrap items-center gap-2 md:flex-row pt-8">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => handleDownload(selectedFilename, node)}
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
                            emptyState
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
                        <UploadNodeTab onImport={handleImport} />
                    </TabsContent>
                </Tabs>

                <CreateNodeDialog
                    open={createDialogOpen}
                    onOpenChange={setCreateDialogOpen}
                    existingFilenames={filenames}
                    onCreate={handleCreate}
                />
                {confirmDialog}
            </div>
        </div>
    );
}
