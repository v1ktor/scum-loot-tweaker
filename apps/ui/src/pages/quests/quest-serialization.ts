import type { Condition, Quest, Reward } from '@/data/quests/quests.types.ts';
import { conditionHasContent } from './quest-validation.ts';

const isBlank = (value: string): boolean => value.trim() === '';

function cleanReward(reward: Reward): Reward {
    const cleaned: Reward = { ...reward };

    delete cleaned.Blueprints;

    const items = cleaned.RewardItems?.filter((item) => !isBlank(item));
    if (items?.length) cleaned.RewardItems = items;
    else delete cleaned.RewardItems;

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

function withRequiredFields(condition: Condition): Condition {
    const base = {
        ...condition,
        TrackingCaption: condition.TrackingCaption ?? '',
        CanBeAutoCompleted: condition.CanBeAutoCompleted ?? false,
    };

    if (base.Type === 'Fetch') {
        return {
            ...base,
            DisablePurchaseOfRequiredItems: base.DisablePurchaseOfRequiredItems ?? false,
            PlayerKeepsItems: base.PlayerKeepsItems ?? false,
        };
    }

    if (base.Type === 'Interaction') {
        return { ...base, SpawnOnlyNeeded: base.SpawnOnlyNeeded ?? false };
    }

    return base;
}

export function toGameQuest(quest: Quest): Omit<Quest, 'id'> {
    const { id, ...gameQuest } = quest;
    return {
        ...gameQuest,
        Description: gameQuest.Description ?? '',
        RewardPool: gameQuest.RewardPool.map(cleanReward),
        Conditions: gameQuest.Conditions.map(cleanCondition)
            .filter(conditionHasContent)
            .map(stripConditionId)
            .map(withRequiredFields),
    };
}

export function stripUnsupportedRewards(quest: Quest): Quest {
    return {
        ...quest,
        RewardPool: quest.RewardPool.map((reward) => {
            const stripped = { ...reward };
            delete stripped.Blueprints;
            return stripped;
        }),
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
