import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { NavigationPath } from '@/data/navigation-path.ts';
import { TIME_LIMIT_HOURS_BY_TIER } from '@/data/quests/quest-defaults.ts';
import type { Quest } from '@/data/quests/quests.types.ts';
import { useImportedQuests } from '@/hooks/use-imported-quests.ts';
import { QuestEditor } from './editor/quest-editor.tsx';

function blankQuest(): Quest {
    return {
        id: '',
        AssociatedNPC: 'MasterHunter',
        Tier: 1,
        Title: '',
        Description: '',
        TimeLimitHours: TIME_LIMIT_HOURS_BY_TIER[1],
        RewardPool: [{}],
        Conditions: [],
    };
}

export function QuestEditorPage() {
    const navigate = useNavigate();
    const { saveImportedQuest } = useImportedQuests();
    const initialQuest = useMemo(blankQuest, []);

    const handleSave = (quest: Quest) => {
        saveImportedQuest(quest.id, quest);
        toast('Saved to My Quests');
        navigate(NavigationPath.MyQuests);
    };

    return (
        <QuestEditor
            initialQuest={initialQuest}
            heading="New quest"
            onSave={handleSave}
            onCancel={() => navigate(NavigationPath.MyQuests)}
        />
    );
}
