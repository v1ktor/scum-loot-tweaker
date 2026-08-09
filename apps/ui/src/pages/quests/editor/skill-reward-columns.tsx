import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox.tsx';
import type { Skill, SkillReward } from '@/data/quests/quests.types.ts';
import type { EditorColumnMeta } from './editor-data-table.tsx';
import { NumberInput } from './quest-editor-fields.tsx';

export type SkillOption = { value: Skill; label: string };

export const SKILL_OPTIONS: readonly SkillOption[] = (
    [
        'Archery',
        'Aviation',
        'Awareness',
        'Boxing',
        'Camouflage',
        'Cooking',
        'Demolition',
        'Driving',
        'Endurance',
        'Engineering',
        'Farming',
        'Handgun',
        'Medical',
        'MeleeWeapons',
        'Motorcycle',
        'Rifles',
        'Running',
        'Sniping',
        'Stealth',
        'Survival',
        'Tactics',
        'Thievery',
    ] as const
).map((skill) => ({ value: skill, label: skill }));

export interface SkillTableMeta {
    onUpdate: (index: number, next: SkillReward) => void;
    onRemove: (index: number) => void;
}

export const skillColumns: ColumnDef<SkillReward>[] = [
    {
        accessorKey: 'Skill',
        header: 'Skill *',
        meta: { className: 'min-w-48' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as SkillTableMeta;
            const skill = row.original;

            return (
                <Combobox
                    items={[...SKILL_OPTIONS]}
                    itemToStringValue={(o: SkillOption) => o.label}
                    value={SKILL_OPTIONS.find((o) => o.value === skill.Skill) ?? null}
                    isItemEqualToValue={(a: SkillOption | null, b: SkillOption | null) => a?.value === b?.value}
                    onValueChange={(next: SkillOption | null) => {
                        if (next) meta.onUpdate(row.index, { ...skill, Skill: next.value });
                    }}
                    autoHighlight
                >
                    <ComboboxInput placeholder="Select skill" />
                    <ComboboxContent>
                        <ComboboxEmpty>No matches.</ComboboxEmpty>
                        <ComboboxList>
                            {(o: SkillOption) => (
                                <ComboboxItem key={o.value} value={o}>
                                    {o.label}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            );
        },
    },
    {
        accessorKey: 'Experience',
        header: 'Experience',
        meta: { className: 'w-40' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as SkillTableMeta;
            const skill = row.original;
            return (
                <NumberInput
                    value={skill.Experience}
                    onChange={(Experience) => meta.onUpdate(row.index, { ...skill, Experience: Experience ?? 0 })}
                />
            );
        },
    },
    {
        id: 'actions',
        header: '',
        meta: { className: 'w-12' } satisfies EditorColumnMeta,
        cell: ({ row, table }) => {
            const meta = table.options.meta as SkillTableMeta;
            return (
                <Button variant="ghost" size="icon" title="Remove skill" onClick={() => meta.onRemove(row.index)}>
                    <Trash2 />
                </Button>
            );
        },
    },
];
