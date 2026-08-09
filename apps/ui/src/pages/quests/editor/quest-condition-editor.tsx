import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, GripVertical, Plus, Trash2 } from 'lucide-react';
import { type DragEvent, Fragment, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { FreeTextCombobox } from '@/components/free-text-combobox/free-text-combobox.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import type {
    Condition,
    CookLevel,
    CookQuality,
    EliminationCondition,
    FetchCondition,
    InteractionCondition,
    QuestType,
    RequiredItem,
} from '@/data/quests/quests.types.ts';
import { useCharacterOptions } from '@/hooks/use-character-options.ts';
import { move, removeAt, updateAt } from '@/lib/array.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { type ConditionTab, conditionHasContent, type QuestError } from '../quest-validation.ts';
import {
    BoolSwitch,
    Field,
    NumberInput,
    OptionalSelect,
    Select,
    TextInput,
    tabErrorClass,
} from './quest-editor-fields.tsx';
import { InteractionLocationsEditor, MapLocationsEditor } from './quest-location-editors.tsx';

const COOK_LEVELS = ['Raw', 'Undercooked', 'Cooked', 'Overcooked', 'Burned'] as const;
const COOK_QUALITIES = ['Ruined', 'Bad', 'Poor', 'Good', 'Excellent', 'Perfect'] as const;
const TYPE_OPTIONS: readonly { value: QuestType; label: string }[] = [
    { value: 'Fetch', label: 'Fetch' },
    { value: 'Elimination', label: 'Elimination' },
    { value: 'Interaction', label: 'Interaction' },
];

const CONDITION_TYPES: readonly { type: QuestType; label: string; description: string }[] = [
    { type: 'Fetch', label: 'Fetch', description: 'Bring required items to the NPC' },
    { type: 'Elimination', label: 'Elimination', description: 'Kill target characters' },
    { type: 'Interaction', label: 'Interaction', description: 'Interact with points in the world' },
];

function changeType(condition: Condition, type: QuestType): Condition {
    const base = {
        uid: condition.uid,
        SequenceIndex: condition.SequenceIndex,
        TrackingCaption: condition.TrackingCaption,
        CanBeAutoCompleted: condition.CanBeAutoCompleted,
        LocationsShownOnMap: condition.LocationsShownOnMap,
    };

    if (type === 'Fetch') {
        return { ...base, Type: 'Fetch', RequiredItems: [{ AcceptedItems: [''], RequiredNum: 1 }] };
    }
    if (type === 'Elimination') {
        return { ...base, Type: 'Elimination', TargetCharacters: [''], Amount: 1 };
    }
    return { ...base, Type: 'Interaction', Locations: [], MinNeeded: 1, MaxNeeded: 1 };
}

function newCondition(type: QuestType): Condition {
    const uid = crypto.randomUUID();
    if (type === 'Fetch') {
        return { uid, Type: 'Fetch', SequenceIndex: 0, RequiredItems: [{ AcceptedItems: [''], RequiredNum: 1 }] };
    }
    if (type === 'Elimination') {
        return { uid, Type: 'Elimination', SequenceIndex: 0, TargetCharacters: [''], Amount: 1 };
    }
    return { uid, Type: 'Interaction', SequenceIndex: 0, Locations: [], MinNeeded: 1, MaxNeeded: 1 };
}

export function ensureConditionIds(conditions: Condition[]): Condition[] {
    return conditions.map((condition) => (condition.uid ? condition : { ...condition, uid: crypto.randomUUID() }));
}

function RequiredItemEditor({
    label,
    value,
    itemsOptions,
    onChange,
    onRemove,
}: {
    label: string;
    value: RequiredItem;
    itemsOptions: Option[];
    onChange: (next: RequiredItem) => void;
    onRemove: () => void;
}) {
    const set = (patch: Partial<RequiredItem>) => onChange({ ...value, ...patch });
    const accepted = value.AcceptedItems;

    const itemsCount = accepted.filter((v) => v !== '').length;
    const advancedCount = [
        value.MinAcceptedItemHealth,
        value.MinAcceptedItemUses,
        value.MinAcceptedItemMass,
        value.MinAcceptedItemResourceRatio,
        value.MinAcceptedItemResourceAmount,
        value.MinAcceptedCookLevel,
        value.MaxAcceptedCookLevel,
        value.MinAcceptedCookQuality,
    ].filter((v) => v !== undefined).length;

    return (
        <div className="rounded-md border p-3">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                <Button variant="ghost" size="icon" title="Remove group" onClick={onRemove}>
                    <Trash2 />
                </Button>
            </div>
            <Tabs defaultValue="items">
                <TabsList>
                    <TabsTrigger value="items">
                        Items
                        {itemsCount > 0 && (
                            <Badge variant="secondary" className="ml-1">
                                {itemsCount}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="advanced">
                        Advanced
                        {advancedCount > 0 && (
                            <Badge variant="secondary" className="ml-1">
                                {advancedCount}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="mt-3 grid gap-4 lg:grid-cols-[2fr_1fr]">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                Accepted items (any of)
                                <span className="ml-0.5 text-destructive">*</span>
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => set({ AcceptedItems: [...accepted, ''] })}
                            >
                                <Plus />
                                Add item
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {accepted.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <FreeTextCombobox
                                            value={item}
                                            options={itemsOptions}
                                            placeholder="Select item"
                                            onChange={(next) => set({ AcceptedItems: updateAt(accepted, i, next) })}
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        title="Remove item"
                                        onClick={() => set({ AcceptedItems: removeAt(accepted, i) })}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:border-l lg:pl-4">
                        <Field label="Required number" required>
                            <NumberInput value={value.RequiredNum} onChange={(v) => set({ RequiredNum: v ?? 0 })} />
                        </Field>
                        <Field label="Random additional">
                            <NumberInput
                                value={value.RandomAdditionalRequiredNum}
                                onChange={(v) => set({ RandomAdditionalRequiredNum: v })}
                                hint="Extra items required on top of the required number, added at random."
                            />
                        </Field>
                    </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-3">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <Field label="Min durability (%)">
                            <NumberInput
                                value={value.MinAcceptedItemHealth}
                                onChange={(v) => set({ MinAcceptedItemHealth: v })}
                            />
                        </Field>
                        <Field label="Min uses">
                            <NumberInput
                                value={value.MinAcceptedItemUses}
                                onChange={(v) => set({ MinAcceptedItemUses: v })}
                            />
                        </Field>
                        <Field label="Min mass">
                            <NumberInput
                                value={value.MinAcceptedItemMass}
                                onChange={(v) => set({ MinAcceptedItemMass: v })}
                            />
                        </Field>
                        <Field label="Min resource ratio (0-1)">
                            <NumberInput
                                step={0.05}
                                value={value.MinAcceptedItemResourceRatio}
                                onChange={(v) => set({ MinAcceptedItemResourceRatio: v })}
                            />
                        </Field>
                        <Field label="Min resource amount">
                            <NumberInput
                                value={value.MinAcceptedItemResourceAmount}
                                onChange={(v) => set({ MinAcceptedItemResourceAmount: v })}
                            />
                        </Field>
                        <Field label="Cook level (min)">
                            <OptionalSelect
                                value={value.MinAcceptedCookLevel}
                                options={COOK_LEVELS}
                                onChange={(v: CookLevel | undefined) => set({ MinAcceptedCookLevel: v })}
                            />
                        </Field>
                        <Field label="Cook level (max)">
                            <OptionalSelect
                                value={value.MaxAcceptedCookLevel}
                                options={COOK_LEVELS}
                                onChange={(v: CookLevel | undefined) => set({ MaxAcceptedCookLevel: v })}
                            />
                        </Field>
                        <Field label="Cook quality (min)">
                            <OptionalSelect
                                value={value.MinAcceptedCookQuality}
                                options={COOK_QUALITIES}
                                onChange={(v: CookQuality | undefined) => set({ MinAcceptedCookQuality: v })}
                            />
                        </Field>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function FetchEditor({
    condition,
    itemsOptions,
    onChange,
}: {
    condition: FetchCondition;
    itemsOptions: Option[];
    onChange: (next: Condition) => void;
}) {
    const set = (patch: Partial<FetchCondition>) => onChange({ ...condition, ...patch });
    const items = condition.RequiredItems;

    const addGroup = () => set({ RequiredItems: [...items, { AcceptedItems: [''], RequiredNum: 1 }] });
    const removeGroup = (index: number) => {
        const previous = items;
        set({ RequiredItems: removeAt(items, index) });
        toast('Item group removed', { action: { label: 'Undo', onClick: () => set({ RequiredItems: previous }) } });
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Required item groups</span>
                <Button variant="outline" size="sm" onClick={addGroup}>
                    <Plus />
                    Add item group
                </Button>
            </div>
            {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No item groups.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {items.map((ri, i) => (
                        <RequiredItemEditor
                            key={i}
                            label={`Item group ${i + 1}`}
                            value={ri}
                            itemsOptions={itemsOptions}
                            onChange={(next) => set({ RequiredItems: updateAt(items, i, next) })}
                            onRemove={() => removeGroup(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function EliminationEditor({
    condition,
    onChange,
}: {
    condition: EliminationCondition;
    onChange: (next: Condition) => void;
}) {
    const set = (patch: Partial<EliminationCondition>) => onChange({ ...condition, ...patch });
    const targets = condition.TargetCharacters;
    const { characterOptions } = useCharacterOptions();

    return (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                        Target characters
                        <span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <Button variant="outline" size="sm" onClick={() => set({ TargetCharacters: [...targets, ''] })}>
                        <Plus />
                        Add target
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    {targets.map((target, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="flex-1">
                                <FreeTextCombobox
                                    value={target}
                                    options={characterOptions}
                                    placeholder="Select character"
                                    onChange={(next) => set({ TargetCharacters: updateAt(targets, i, next) })}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Remove target"
                                onClick={() => set({ TargetCharacters: removeAt(targets, i) })}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:border-l lg:pl-4">
                <Field label="Amount to kill" required>
                    <NumberInput value={condition.Amount} onChange={(v) => set({ Amount: v ?? 0 })} />
                </Field>
            </div>
        </div>
    );
}

function EliminationWeaponsEditor({
    condition,
    itemsOptions,
    onChange,
}: {
    condition: EliminationCondition;
    itemsOptions: Option[];
    onChange: (next: Condition) => void;
}) {
    const set = (patch: Partial<EliminationCondition>) => onChange({ ...condition, ...patch });
    const stored = condition.AllowedWeapons ?? [];
    const weapons = stored.length > 0 ? stored : [''];

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Allowed weapons (optional)</span>
                <Button variant="outline" size="sm" onClick={() => set({ AllowedWeapons: [...weapons, ''] })}>
                    <Plus />
                    Add weapon
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                {weapons.map((weapon, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="flex-1">
                            <FreeTextCombobox
                                value={weapon}
                                options={itemsOptions}
                                placeholder="Select item"
                                onChange={(next) => set({ AllowedWeapons: updateAt(weapons, i, next) })}
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Remove weapon"
                            onClick={() => set({ AllowedWeapons: removeAt(weapons, i) })}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function InteractionEditor({
    condition,
    onChange,
}: {
    condition: InteractionCondition;
    onChange: (next: Condition) => void;
}) {
    const set = (patch: Partial<InteractionCondition>) => onChange({ ...condition, ...patch });

    return (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <InteractionLocationsEditor value={condition.Locations} onChange={(Locations) => set({ Locations })} />

            <div className="flex flex-col gap-3 lg:border-l lg:pl-4">
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Min needed" required={true}>
                        <NumberInput value={condition.MinNeeded} onChange={(v) => set({ MinNeeded: v ?? 0 })} />
                    </Field>
                    <Field label="Max needed" required={true}>
                        <NumberInput value={condition.MaxNeeded} onChange={(v) => set({ MaxNeeded: v ?? 0 })} />
                    </Field>
                </div>
                <Field label="World marker distance (m)">
                    <NumberInput
                        value={condition.WorldMarkerShowDistance}
                        onChange={(v) => set({ WorldMarkerShowDistance: v })}
                    />
                </Field>
                <BoolSwitch
                    label="Spawn only needed"
                    hint={
                        'The game rolls a required count between Min and Max needed.\n' +
                        'On — only that many points spawn, so those specific ones must be used.\n' +
                        'Off — every point spawns and any of them count towards the total.\n\n' +
                        'Example: 7 bollards along a road, with Min 3 / Max 5 — say the roll lands on 4.\n' +
                        'On — only 4 bollards are there and all 4 must be used.\n' +
                        'Off — all 7 are there and any 4 will do.'
                    }
                    checked={!!condition.SpawnOnlyNeeded}
                    onChange={(v) => set({ SpawnOnlyNeeded: v })}
                />
            </div>
        </div>
    );
}

function conditionSummary(condition: Condition): string {
    // Show it's unconfigured before anything else, so a collapsed card can't look complete when it
    // would actually be dropped on export.
    if (!conditionHasContent(condition)) {
        if (condition.Type === 'Fetch') return 'Empty — add an item';
        if (condition.Type === 'Elimination') return 'Empty — add a target';
        return 'Empty — add a point';
    }
    if (condition.TrackingCaption) return condition.TrackingCaption;
    if (condition.Type === 'Fetch') {
        const total = condition.RequiredItems.reduce((sum, group) => sum + (group.RequiredNum ?? 0), 0);
        return `Bring ${total} item${total === 1 ? '' : 's'}`;
    }
    if (condition.Type === 'Elimination') {
        return `Kill ${condition.Amount} target${condition.Amount === 1 ? '' : 's'}`;
    }
    const range =
        condition.MinNeeded === condition.MaxNeeded
            ? `${condition.MinNeeded}`
            : `${condition.MinNeeded}–${condition.MaxNeeded}`;
    return `Interact with ${range} location${condition.MaxNeeded === 1 ? '' : 's'}`;
}

function ConditionCardEditor({
    condition,
    itemsOptions,
    errors,
    autoExpand,
    onAutoExpandDone,
    canMoveUp,
    canMoveDown,
    onMoveUp,
    onMoveDown,
    onChange,
    onRemove,
    onDragStart,
    onDragEnd,
}: {
    condition: Condition;
    itemsOptions: Option[];
    errors: QuestError[];
    autoExpand: boolean;
    onAutoExpandDone: () => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onChange: (next: Condition) => void;
    onRemove: () => void;
    onDragStart: (event: DragEvent) => void;
    onDragEnd: () => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!autoExpand) return;
        setExpanded(true);
        headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        onAutoExpandDone();
    }, [autoExpand, onAutoExpandDone]);

    const tabErrorCount = (tab: ConditionTab) => errors.filter((e) => e.conditionTab === tab).length;

    const base = (patch: Partial<Condition>) => onChange({ ...condition, ...patch } as Condition);

    return (
        <div className="rounded-lg border bg-card">
            <div ref={headerRef} className="flex items-center gap-2 p-3">
                <span
                    draggable
                    onDragStart={(event) => {
                        // Use just the header row as the drag ghost, so an expanded card doesn't
                        // produce a full-page-sized drag image.
                        if (headerRef.current) event.dataTransfer.setDragImage(headerRef.current, 16, 16);
                        onDragStart(event);
                    }}
                    onDragEnd={onDragEnd}
                    title="Drag to reorder"
                    className="shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing"
                >
                    <GripVertical className="h-4 w-4" />
                </span>
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                    {expanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <Badge variant="outline" className="shrink-0">
                        {condition.Type}
                    </Badge>
                    <span className="truncate text-sm text-muted-foreground">{conditionSummary(condition)}</span>
                    {errors.length > 0 && (
                        <Badge variant="destructive" className="ml-auto shrink-0">
                            {errors.length}
                        </Badge>
                    )}
                </button>
                {/* Keyboard/touch fallback for the drag handle. */}
                <Button variant="ghost" size="icon" title="Move up" disabled={!canMoveUp} onClick={onMoveUp}>
                    <ArrowUp />
                </Button>
                <Button variant="ghost" size="icon" title="Move down" disabled={!canMoveDown} onClick={onMoveDown}>
                    <ArrowDown />
                </Button>
                <Button variant="ghost" size="icon" title="Remove condition" onClick={onRemove}>
                    <Trash2 />
                </Button>
            </div>

            {expanded && (
                <div className="border-t p-4">
                    {errors.length > 0 && (
                        <ul className="mb-4 list-disc rounded-md border border-destructive/40 bg-destructive/10 py-2 pr-2 pl-6 text-sm text-destructive">
                            {errors.map((e) => (
                                <li key={e.message}>{e.message}</li>
                            ))}
                        </ul>
                    )}
                    <Tabs defaultValue="requirements">
                        <TabsList>
                            <TabsTrigger value="objective" className={tabErrorClass(tabErrorCount('objective') > 0)}>
                                Objective
                                {tabErrorCount('objective') > 0 && (
                                    <Badge variant="destructive">{tabErrorCount('objective')}</Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value="requirements"
                                className={tabErrorClass(tabErrorCount('requirements') > 0)}
                            >
                                Requirements
                                {tabErrorCount('requirements') > 0 && (
                                    <Badge variant="destructive">{tabErrorCount('requirements')}</Badge>
                                )}
                            </TabsTrigger>
                            {(condition.Type === 'Fetch' || condition.Type === 'Elimination') && (
                                <TabsTrigger value="options" className={tabErrorClass(tabErrorCount('options') > 0)}>
                                    Options
                                    {tabErrorCount('options') > 0 && (
                                        <Badge variant="destructive">{tabErrorCount('options')}</Badge>
                                    )}
                                </TabsTrigger>
                            )}
                            <TabsTrigger value="map" className={tabErrorClass(tabErrorCount('map') > 0)}>
                                Show on map
                                {tabErrorCount('map') > 0 && (
                                    <Badge variant="destructive">{tabErrorCount('map')}</Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="objective" className="mt-4 flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_10rem]">
                                <Field label="Tracking caption">
                                    <TextInput
                                        value={condition.TrackingCaption ?? ''}
                                        onChange={(v) => base({ TrackingCaption: v || undefined })}
                                        placeholder="Objective shown in-game"
                                    />
                                </Field>
                                <Field label="Type">
                                    <Select
                                        value={condition.Type}
                                        options={TYPE_OPTIONS}
                                        onChange={(type: QuestType) => onChange(changeType(condition, type))}
                                    />
                                </Field>
                            </div>
                            <BoolSwitch
                                label="Can be auto-completed"
                                checked={!!condition.CanBeAutoCompleted}
                                onChange={(v) => base({ CanBeAutoCompleted: v })}
                            />
                        </TabsContent>

                        <TabsContent value="requirements" className="mt-4">
                            {condition.Type === 'Fetch' && (
                                <FetchEditor condition={condition} itemsOptions={itemsOptions} onChange={onChange} />
                            )}
                            {condition.Type === 'Elimination' && (
                                <EliminationEditor condition={condition} onChange={onChange} />
                            )}
                            {condition.Type === 'Interaction' && (
                                <InteractionEditor condition={condition} onChange={onChange} />
                            )}
                        </TabsContent>

                        {condition.Type === 'Fetch' && (
                            <TabsContent value="options" className="mt-4 flex flex-col gap-2">
                                <BoolSwitch
                                    label="Player keeps items"
                                    checked={!!condition.PlayerKeepsItems}
                                    onChange={(v) => onChange({ ...condition, PlayerKeepsItems: v })}
                                />
                                <BoolSwitch
                                    label="Disable purchase of required items"
                                    checked={!!condition.DisablePurchaseOfRequiredItems}
                                    onChange={(v) => onChange({ ...condition, DisablePurchaseOfRequiredItems: v })}
                                />
                            </TabsContent>
                        )}
                        {condition.Type === 'Elimination' && (
                            <TabsContent value="options" className="mt-4">
                                <EliminationWeaponsEditor
                                    condition={condition}
                                    itemsOptions={itemsOptions}
                                    onChange={onChange}
                                />
                            </TabsContent>
                        )}

                        <TabsContent value="map" className="mt-4">
                            <MapLocationsEditor
                                value={condition.LocationsShownOnMap ?? []}
                                onChange={(next) => base({ LocationsShownOnMap: next.length > 0 ? next : undefined })}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
}

function resequence(conditions: Condition[]): Condition[] {
    return conditions.map((condition, i) => ({ ...condition, SequenceIndex: i }) as Condition);
}

export function QuestConditionEditor({
    conditions,
    itemsOptions,
    onChange,
    onAdd,
    errors = [],
}: {
    conditions: Condition[];
    itemsOptions: Option[];
    onChange: (conditions: Condition[]) => void;
    onAdd?: (uid: string) => void;
    errors?: QuestError[];
}) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dropTarget, setDropTarget] = useState<{ index: number; after: boolean } | null>(null);
    const [justAddedIndex, setJustAddedIndex] = useState<number | null>(null);

    const add = (type: QuestType) => {
        const created = newCondition(type);
        setJustAddedIndex(conditions.length);
        if (created.uid) onAdd?.(created.uid);
        onChange(resequence([...conditions, created]));
    };

    const remove = (index: number) => {
        const previous = conditions;
        onChange(resequence(removeAt(conditions, index)));
        toast('Condition removed', { action: { label: 'Undo', onClick: () => onChange(previous) } });
    };

    const moveCondition = (from: number, to: number) => onChange(resequence(move(conditions, from, to)));

    const handleDrop = (from: number | null) => {
        if (from !== null && dropTarget) {
            let to = dropTarget.after ? dropTarget.index + 1 : dropTarget.index;
            if (from < to) to -= 1;
            if (to !== from) {
                const next = [...conditions];
                const [moved] = next.splice(from, 1);
                next.splice(to, 0, moved);
                onChange(resequence(next));
            }
        }
        setDragIndex(null);
        setDropTarget(null);
    };

    const insertIndex =
        dragIndex !== null && dropTarget ? (dropTarget.after ? dropTarget.index + 1 : dropTarget.index) : null;

    const placeholder = (
        <div className="pointer-events-none flex items-center rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-3 text-sm text-muted-foreground">
            Drop here
        </div>
    );

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Conditions</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Plus />
                            Add condition
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {CONDITION_TYPES.map(({ type, label, description }) => (
                            <DropdownMenuItem key={type} onSelect={() => add(type)}>
                                <div className="flex flex-col">
                                    <span className="font-medium">{label}</span>
                                    <span className="text-xs text-muted-foreground">{description}</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {conditions.length === 0 && <p className="text-sm text-muted-foreground">No conditions.</p>}
            {conditions.map((condition, i) => (
                <Fragment key={condition.uid ?? i}>
                    {insertIndex === i && placeholder}
                    <div
                        onDragOver={(e) => {
                            if (dragIndex === null) return;
                            e.preventDefault();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const after = e.clientY > rect.top + rect.height / 2;
                            setDropTarget((prev) =>
                                prev?.index === i && prev.after === after ? prev : { index: i, after },
                            );
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            const from = Number(e.dataTransfer.getData('text/plain'));
                            handleDrop(Number.isNaN(from) ? dragIndex : from);
                        }}
                    >
                        <ConditionCardEditor
                            condition={condition}
                            itemsOptions={itemsOptions}
                            errors={errors.filter((e) => e.conditionIndex === i)}
                            autoExpand={justAddedIndex === i}
                            onAutoExpandDone={() => setJustAddedIndex(null)}
                            canMoveUp={i > 0}
                            canMoveDown={i < conditions.length - 1}
                            onMoveUp={() => moveCondition(i, i - 1)}
                            onMoveDown={() => moveCondition(i, i + 1)}
                            onChange={(next) => onChange(updateAt(conditions, i, next))}
                            onRemove={() => remove(i)}
                            onDragStart={(event) => {
                                event.dataTransfer.setData('text/plain', String(i));
                                event.dataTransfer.effectAllowed = 'move';
                                setDragIndex(i);
                            }}
                            onDragEnd={() => {
                                setDragIndex(null);
                                setDropTarget(null);
                            }}
                        />
                    </div>
                </Fragment>
            ))}
            {insertIndex === conditions.length && placeholder}
        </div>
    );
}
