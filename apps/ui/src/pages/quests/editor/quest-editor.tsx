import { Download, FileText, Gift, Save, Target, TriangleAlert, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useConfirmDialog } from '@/components/confirm-dialog/confirm-dialog.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import type { Quest } from '@/data/quests/quests.types.ts';
import { useItemsOptions } from '@/hooks/use-items-options.ts';
import { downloadQuest } from '../quest-serialization.ts';
import { type QuestError, type QuestErrorTab, validateQuest } from '../quest-validation.ts';
import { ensureConditionIds, QuestConditionEditor } from './quest-condition-editor.tsx';
import { tabErrorClass } from './quest-editor-fields.tsx';
import { QuestMetaEditor } from './quest-meta-editor.tsx';
import { countRewards, QuestRewardEditor } from './quest-reward-editor.tsx';

export function QuestEditor({
    initialQuest,
    heading,
    onSave,
    onChange,
    onCancel,
}: {
    initialQuest: Quest;
    heading: string;
    onSave?: (quest: Quest) => void;
    onChange?: (quest: Quest) => void;
    onCancel: () => void;
}) {
    const { itemsOptions } = useItemsOptions();
    const { confirm, dialog: confirmDialog } = useConfirmDialog();
    const confirmDiscard = () =>
        confirm({
            title: 'Discard unsaved changes?',
            description: 'This quest has edits that have not been saved to My Quests.',
            confirmLabel: 'Discard',
        });
    const [draft, setDraft] = useState<Quest>(() => {
        const clone = structuredClone(initialQuest);
        clone.Conditions = ensureConditionIds(clone.Conditions);
        return clone;
    });
    const autoSaves = onChange !== undefined;
    const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(draft));
    const isDirty = useMemo(
        () => !autoSaves && JSON.stringify(draft) !== savedSnapshot,
        [autoSaves, draft, savedSnapshot],
    );

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        onChangeRef.current?.(draft);
    }, [draft]);

    useEffect(() => {
        if (!isDirty) return;
        const warn = (event: BeforeUnloadEvent) => event.preventDefault();
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [isDirty]);
    const [showErrors, setShowErrors] = useState(false);
    const [freshConditionUids, setFreshConditionUids] = useState<string[]>([]);

    const patchDraft = (patch: Partial<Quest>) => {
        setDraft((prev) => ({ ...prev, ...patch }));
    };

    const isFreshConditionNag = (error: QuestError) =>
        error.missing === true &&
        error.conditionIndex !== undefined &&
        freshConditionUids.includes(draft.Conditions[error.conditionIndex]?.uid ?? '');

    const liveErrors = validateQuest(draft);
    const shownErrors = liveErrors.filter((error) => !isFreshConditionNag(error));
    const summaryErrors = showErrors ? shownErrors : [];
    const fieldErrors = showErrors ? shownErrors : shownErrors.filter((e) => !e.missing);
    const tabErrorCount = (tab: QuestErrorTab) => fieldErrors.filter((e) => e.tab === tab).length;

    const handleDownload = () => {
        if (liveErrors.length > 0) {
            setShowErrors(true);
            setFreshConditionUids([]);
            return;
        }
        downloadQuest(draft);
    };

    const handleSave = () => {
        if (liveErrors.some((e) => e.field === 'id')) {
            setShowErrors(true);
            return;
        }
        setSavedSnapshot(JSON.stringify(draft));
        onSave?.(draft);
    };

    const handleCancel = async () => {
        if (isDirty && !(await confirmDiscard())) return;
        onCancel();
    };

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{heading}</span>
                    <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold tracking-tight">
                        {draft.Title || 'Untitled quest'}
                        {isDirty && (
                            <Badge
                                variant="outline"
                                className="border-orange-500/30 bg-orange-500/20 font-normal text-orange-400"
                            >
                                Unsaved changes
                            </Badge>
                        )}
                        {autoSaves && (
                            <Badge variant="outline" className="font-normal text-muted-foreground">
                                Saved automatically
                            </Badge>
                        )}
                    </h1>
                </div>

                {summaryErrors.length > 0 && (
                    <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4">
                        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-destructive">
                                Fix {summaryErrors.length} issue{summaryErrors.length === 1 ? '' : 's'} before
                                downloading
                            </p>
                            <ul className="list-disc pl-4 text-sm text-muted-foreground">
                                {summaryErrors.map((e) => (
                                    <li key={`${e.label}-${e.message}`}>
                                        <span className="text-foreground">{e.label}</span> — {e.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <Tabs defaultValue="details">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <TabsList>
                            <TabsTrigger value="details" className={tabErrorClass(tabErrorCount('details') > 0)}>
                                <FileText />
                                Details
                                {tabErrorCount('details') > 0 && (
                                    <Badge variant="destructive">{tabErrorCount('details')}</Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="rewards" className={tabErrorClass(tabErrorCount('rewards') > 0)}>
                                <Gift />
                                Rewards
                                {tabErrorCount('rewards') > 0 ? (
                                    <Badge variant="destructive">{tabErrorCount('rewards')}</Badge>
                                ) : (
                                    <Badge variant="secondary">{countRewards(draft.RewardPool[0])}</Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="conditions" className={tabErrorClass(tabErrorCount('conditions') > 0)}>
                                <Target />
                                Conditions
                                {tabErrorCount('conditions') > 0 ? (
                                    <Badge variant="destructive">{tabErrorCount('conditions')}</Badge>
                                ) : (
                                    <Badge variant="secondary">{draft.Conditions.length}</Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" onClick={handleCancel}>
                                <X />
                                {autoSaves ? 'Close' : 'Cancel'}
                            </Button>
                            <Button variant="outline" onClick={handleDownload}>
                                <Download />
                                Download
                            </Button>
                            {onSave && (
                                <Button onClick={handleSave}>
                                    <Save />
                                    Save to My Quests
                                </Button>
                            )}
                        </div>
                    </div>

                    <TabsContent value="details" className="mt-4">
                        <section className="rounded-lg border bg-card p-5">
                            <QuestMetaEditor quest={draft} onChange={patchDraft} errors={fieldErrors} />
                        </section>
                    </TabsContent>

                    <TabsContent value="rewards" className="mt-4">
                        <QuestRewardEditor
                            reward={draft.RewardPool[0]}
                            itemsOptions={itemsOptions}
                            // Only the first pool is editable, but any others are carried through
                            // untouched rather than dropped the moment this tab is used.
                            onChange={(reward) => patchDraft({ RewardPool: [reward, ...draft.RewardPool.slice(1)] })}
                            errors={fieldErrors}
                        />
                    </TabsContent>

                    <TabsContent value="conditions" className="mt-4">
                        <section className="rounded-lg border bg-card p-5">
                            <QuestConditionEditor
                                conditions={draft.Conditions}
                                itemsOptions={itemsOptions}
                                onChange={(Conditions) => patchDraft({ Conditions })}
                                onAdd={(uid) => setFreshConditionUids((prev) => [...prev, uid])}
                                errors={fieldErrors}
                            />
                        </section>
                    </TabsContent>
                </Tabs>
            </div>
            {confirmDialog}
        </div>
    );
}
