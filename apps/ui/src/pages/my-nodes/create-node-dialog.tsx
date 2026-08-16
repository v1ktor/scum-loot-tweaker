import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { createNodeTree } from '@/pages/my-nodes/node-tree-ops.ts';
import type { LootNode, Option } from '@/pages/spawners/spawners.types.ts';
import { trpc } from '@/trpc.ts';

interface CreateNodeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    existingFilenames: string[];
    onCreate: (filename: string, node: LootNode) => void;
}

const withJsonExtension = (name: string) => (name.toLowerCase().endsWith('.json') ? name : `${name}.json`);

export function CreateNodeDialog({ open, onOpenChange, existingFilenames, onCreate }: CreateNodeDialogProps) {
    const [name, setName] = useState('');
    const [template, setTemplate] = useState<Option | null>(null);
    const [dialogElement, setDialogElement] = useState<HTMLDivElement | null>(null);

    const { data: nodeFiles = [] } = useQuery(trpc.nodes.list.queryOptions());
    const { data: templateNode, isFetching: isFetchingTemplate } = useQuery({
        ...trpc.nodes.get.queryOptions(template?.value ?? ''),
        enabled: !!template,
    });

    const templateOptions: Option[] = nodeFiles.map((file) => ({ value: file, label: file.replace('.json', '') }));

    const trimmed = name.trim();
    const filename = trimmed ? withJsonExtension(trimmed) : '';
    const isTaken = existingFilenames.includes(filename);
    const canCreate = filename !== '' && !isTaken && !(template && isFetchingTemplate);

    const reset = () => {
        setName('');
        setTemplate(null);
    };

    const handleCreate = () => {
        if (!canCreate) return;

        onCreate(
            filename,
            template && templateNode ? structuredClone(templateNode) : createNodeTree(filename.replace('.json', '')),
        );
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!next) reset();
                onOpenChange(next);
            }}
        >
            <DialogContent ref={setDialogElement}>
                <DialogHeader>
                    <DialogTitle>New node file</DialogTitle>
                    <DialogDescription>
                        Name the file the same as the vanilla file you want to extend, or pick a new name for a branch
                        of your own.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <span className="text-sm font-medium">File name</span>
                        <Input
                            autoFocus
                            value={name}
                            placeholder="MyLoot.json"
                            onChange={(event) => setName(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') handleCreate();
                            }}
                        />
                        {isTaken && <p className="text-xs text-destructive">"{filename}" already exists.</p>}
                    </div>

                    <div className="grid gap-1">
                        <span className="text-sm font-medium">Start from</span>
                        <Combobox
                            items={templateOptions}
                            itemToStringValue={(item: Option) => item.label}
                            value={template}
                            isItemEqualToValue={(a: Option | null, b: Option | null) => a?.value === b?.value}
                            onValueChange={setTemplate}
                            autoHighlight
                        >
                            <ComboboxInput placeholder="Empty tree" showClear={true} />
                            <ComboboxContent container={dialogElement}>
                                <ComboboxEmpty>No node files found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(option: Option) => (
                                        <ComboboxItem key={option.value} value={option}>
                                            {option.label}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        <p className="text-xs text-muted-foreground">
                            Optional. Copies a vanilla node file so you can tweak it instead of starting from scratch.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button disabled={!canCreate} onClick={handleCreate}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
