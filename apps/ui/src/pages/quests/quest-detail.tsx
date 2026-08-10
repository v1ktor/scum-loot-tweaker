import { ChevronLeft, Clock, Pencil } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import { findQuest, getQuestType } from '@/data/quests/index.ts';
import type { Quest } from '@/data/quests/quests.types.ts';
import { useImportedQuests } from '@/hooks/use-imported-quests.ts';
import { useItemsOptions } from '@/hooks/use-items-options.ts';
import { QuestEditor } from './editor/quest-editor.tsx';
import { ConditionSection } from './quest-condition-section.tsx';
import { RewardSection } from './quest-reward-section.tsx';

export function QuestDetail() {
    const { giverId, questId } = useParams<{ giverId: string; questId: string }>();
    const { itemsOptions } = useItemsOptions();
    const { importedQuests, saveImportedQuest } = useImportedQuests();

    const [editing, setEditing] = useState(false);

    const result = findQuest(giverId ?? '', questId ?? '');

    if (!result) {
        return (
            <div className="flex flex-1 flex-col gap-4 px-6 py-10">
                <p className="text-muted-foreground">Quest not found.</p>
            </div>
        );
    }

    const { giver } = result;
    const stored = importedQuests[result.quest.id];
    const quest = stored ?? result.quest;

    const handleSave = (edited: Quest) => {
        saveImportedQuest(edited.id, edited);
        setEditing(false);
        toast('Saved to My Quests');
    };

    if (editing) {
        return (
            <QuestEditor
                initialQuest={quest}
                heading="Edit quest"
                onSave={handleSave}
                onCancel={() => setEditing(false)}
            />
        );
    }

    const questType = getQuestType(quest);
    const reward = quest.RewardPool[0];

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
            <Link
                to={`${NavigationPath.Quests}?npc=${giver.npc}&tier=${quest.Tier}`}
                className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
                Back to quests
            </Link>

            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{quest.Title}</h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                                <Pencil />
                                Edit
                            </Button>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{giver.name}</Badge>
                        <Badge variant="secondary">Tier {quest.Tier}</Badge>
                        <Badge variant="outline">{questType}</Badge>
                        {quest.TimeLimitHours !== undefined && (
                            <span className="ml-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                Time limit: <span className="text-foreground">{quest.TimeLimitHours}h</span>
                            </span>
                        )}
                    </div>

                    {quest.Description && (
                        <p className="mt-4 text-muted-foreground italic">&ldquo;{quest.Description}&rdquo;</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ConditionSection conditions={quest.Conditions} itemsOptions={itemsOptions} />
                    <RewardSection reward={reward} itemsOptions={itemsOptions} />
                </div>
            </div>
        </div>
    );
}
