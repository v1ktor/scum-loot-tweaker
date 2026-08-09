import type { Condition, Quest, Reward } from '@/data/quests/quests.types.ts';
import { conditionHasContent } from './quest-validation.ts';

const isBlank = (value: string): boolean => value.trim() === '';

function cleanReward(reward: Reward): Reward {
    const cleaned: Reward = { ...reward };

    const items = cleaned.Items?.filter((item) => !isBlank(item));
    if (items?.length) cleaned.Items = items;
    else delete cleaned.Items;

    const skills = cleaned.Skills?.filter((skill) => !isBlank(skill.Skill));
    if (skills?.length) cleaned.Skills = skills;
    else delete cleaned.Skills;

    const deals = cleaned.TradeDeals?.filter((deal) => !isBlank(deal.Item));
    if (deals?.length) cleaned.TradeDeals = deals;
    else delete cleaned.TradeDeals;

    return cleaned;
}

function stripConditionId(condition: Condition): Condition {
    const copy = { ...condition };
    delete (copy as { uid?: string }).uid;
    return copy;
}

function cleanCondition(condition: Condition): Condition {
    if (condition.Type === 'Fetch') {
        return {
            ...condition,
            RequiredItems: condition.RequiredItems.map((group) => ({
                ...group,
                AcceptedItems: group.AcceptedItems.filter((item) => !isBlank(item)),
            })).filter((group) => group.AcceptedItems.length > 0),
        };
    }

    if (condition.Type === 'Elimination') {
        const cleaned = {
            ...condition,
            TargetCharacters: condition.TargetCharacters.filter((target) => !isBlank(target)),
        };
        const weapons = cleaned.AllowedWeapons?.filter((weapon) => !isBlank(weapon));
        if (weapons?.length) cleaned.AllowedWeapons = weapons;
        else delete cleaned.AllowedWeapons;
        return cleaned;
    }

    return {
        ...condition,
        Locations: condition.Locations.filter((location) => !isBlank(location.AnchorMesh)),
    };
}

export function toGameQuest(quest: Quest): Omit<Quest, 'id'> {
    const { id, ...gameQuest } = quest;
    return {
        ...gameQuest,
        RewardPool: gameQuest.RewardPool.map(cleanReward),
        Conditions: gameQuest.Conditions.map(cleanCondition).filter(conditionHasContent).map(stripConditionId),
    };
}

export function downloadBlob(filename: string, blob: Blob) {
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

export function downloadQuest(quest: Quest) {
    const json = JSON.stringify(toGameQuest(quest), null, 2);
    downloadBlob(`${quest.id}.json`, new Blob([json], { type: 'application/json' }));
}
