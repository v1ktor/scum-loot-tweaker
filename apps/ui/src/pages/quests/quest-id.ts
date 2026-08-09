import type { AssociatedNPC, Quest, QuestType } from '@/data/quests/quests.types.ts';

const GIVER_CODES: Partial<Record<AssociatedNPC, string>> = {
    Armorer: 'AR',
    Doctor: 'DC',
    GeneralGoods: 'GG',
    Hunter: 'RH',
    MasterHunter: 'MH',
    Mechanic: 'MC',
};

const CONDITION_VERBS: Record<QuestType, string> = {
    Fetch: 'Fetch',
    Elimination: 'Kill',
    Interaction: 'Interact',
};

const MIXED_VERB = 'Mix';

function pascalCase(text: string): string {
    return text
        .normalize('NFKD')
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');
}

export function buildQuestId(quest: Pick<Quest, 'Tier' | 'AssociatedNPC' | 'Title' | 'Conditions'>): string {
    const what = pascalCase(quest.Title);
    if (!what) return '';

    const giver = GIVER_CODES[quest.AssociatedNPC] ?? quest.AssociatedNPC;
    const types = [...new Set(quest.Conditions.map((condition) => condition.Type))];
    const verb = types.length === 0 ? '' : types.length > 1 ? MIXED_VERB : CONDITION_VERBS[types[0]];

    return [`T${quest.Tier}`, giver, verb, what].filter(Boolean).join('_');
}
