import { CookLevelSchema } from '@/data/quests/quests.schema.ts';
import type { Condition, Quest, Reward } from '@/data/quests/quests.types.ts';

export type QuestErrorTab = 'details' | 'rewards' | 'conditions';
export type ConditionTab = 'objective' | 'requirements' | 'options' | 'map';
export type RewardTab = 'currency' | 'skills' | 'trade';

export type QuestError = {
    tab: QuestErrorTab;
    label: string;
    message: string;
    conditionIndex?: number;
    conditionTab?: ConditionTab;
    rewardTab?: RewardTab;
    field?: string;
    missing?: boolean;
};

const COOK_LEVEL_ORDER = CookLevelSchema.options;

const isBlank = (value: string | undefined): boolean => !value || value.trim() === '';
const isInt = (value: number): boolean => Number.isInteger(value);

export function conditionHasContent(condition: Condition): boolean {
    if (condition.Type === 'Elimination') return (condition.TargetCharacters ?? []).some((t) => !isBlank(t));
    if (condition.Type === 'Fetch') {
        return (condition.RequiredItems ?? []).some((group) =>
            (group.AcceptedItems ?? []).some((item) => !isBlank(item)),
        );
    }
    return (condition.Locations ?? []).some((location) => !isBlank(location?.AnchorMesh));
}

function validateReward(reward: Reward | undefined, errors: QuestError[]): void {
    const add = (message: string, rewardTab?: RewardTab) =>
        errors.push({ tab: 'rewards', label: 'Rewards', message, rewardTab });
    if (!reward) return;

    const currencySlot =
        reward.CurrencyNormal !== undefined || reward.CurrencyGold !== undefined || reward.Fame !== undefined ? 1 : 0;
    const skillSlots = reward.Skills?.filter((skill) => !isBlank(skill.Skill)).length ?? 0;
    const dealCount = reward.TradeDeals?.filter((deal) => !isBlank(deal.Item)).length ?? 0;
    const dealSlots = dealCount === 0 ? 0 : dealCount + 1;
    const slots = currencySlot + skillSlots + dealSlots;
    if (slots > 5) {
        add(`Reward uses ${slots} of 5 slots — remove some currency, skills, or trade deals`);
    }

    for (const [key, value] of [
        ['Cash', reward.CurrencyNormal],
        ['Gold', reward.CurrencyGold],
        ['Fame', reward.Fame],
    ] as const) {
        if (value !== undefined && (!isInt(value) || value < 0)) {
            add(`${key} must be a whole number of 0 or more`, 'currency');
        }
    }

    reward.Skills?.forEach((skill, i) => {
        if (isBlank(skill.Skill)) return;
        if (!isInt(skill.Experience) || skill.Experience < 0) {
            add(`Skill #${i + 1}: experience must be a whole number of 0 or more`, 'skills');
        }
    });

    reward.TradeDeals?.forEach((deal, i) => {
        if (isBlank(deal.Item)) return;
        const label = `Trade deal #${i + 1}`;
        if (deal.Price !== undefined && (!isInt(deal.Price) || deal.Price < 0)) {
            add(`${label}: price must be a whole number of 0 or more`, 'trade');
        }
        if (deal.Amount !== undefined && (!isInt(deal.Amount) || deal.Amount < 1)) {
            add(`${label}: amount must be a whole number of 1 or more`, 'trade');
        }
        if (deal.Fame !== undefined && (!isInt(deal.Fame) || deal.Fame < 0)) {
            add(`${label}: fame must be a whole number of 0 or more`, 'trade');
        }
    });
}

function validateCondition(condition: Condition, index: number, errors: QuestError[]): void {
    const label = `Condition ${index + 1} (${condition.Type})`;
    const add = (message: string, conditionTab: ConditionTab = 'requirements') =>
        errors.push({ tab: 'conditions', conditionIndex: index, label, message, conditionTab });

    if (!conditionHasContent(condition)) {
        errors.push({
            tab: 'conditions',
            conditionIndex: index,
            conditionTab: 'requirements',
            label,
            message: 'This condition is empty — fill in its requirements before downloading',
            missing: true,
        });
        return;
    }

    condition.LocationsShownOnMap?.forEach((marker, m) => {
        const isEmptyString = typeof marker.Location === 'string' && marker.Location.trim() === '';
        if (isEmptyString) add(`Map marker #${m + 1}: location is required`, 'map');
        if (!(marker.SizeFactor > 0)) add(`Map marker #${m + 1}: size must be greater than 0`, 'map');
    });

    if (condition.Type === 'Elimination') {
        if (!isInt(condition.Amount) || condition.Amount < 1) {
            add('Amount to kill must be a whole number of 1 or more');
        }
    }

    if (condition.Type === 'Fetch') {
        condition.RequiredItems.forEach((group, g) => {
            if (!group.AcceptedItems.some((item) => !isBlank(item))) return;
            const gl = `Item group #${g + 1}`;
            if (!isInt(group.RequiredNum) || group.RequiredNum < 1) {
                add(`${gl}: required number must be a whole number of 1 or more`);
            }
            if (group.RandomAdditionalRequiredNum !== undefined) {
                if (!isInt(group.RandomAdditionalRequiredNum) || group.RandomAdditionalRequiredNum < 1) {
                    add(`${gl}: random additional must be a whole number of 1 or more`);
                }
            }
            if (group.MinAcceptedItemUses !== undefined) {
                if (!isInt(group.MinAcceptedItemUses) || group.MinAcceptedItemUses < 0) {
                    add(`${gl}: min uses must be a whole number of 0 or more`);
                }
            }
            if (group.MinAcceptedItemMass !== undefined && group.MinAcceptedItemMass < 0) {
                add(`${gl}: min mass must be 0 or more`);
            }
            if (group.MinAcceptedItemResourceAmount !== undefined && group.MinAcceptedItemResourceAmount < 0) {
                add(`${gl}: min resource amount must be 0 or more`);
            }

            const health = group.MinAcceptedItemHealth;
            if (health !== undefined && (health < 0 || health > 100)) {
                add(`${gl}: min durability must be between 0 and 100`);
            }
            const ratio = group.MinAcceptedItemResourceRatio;
            if (ratio !== undefined && (ratio < 0 || ratio > 1)) {
                add(`${gl}: min resource ratio must be between 0 and 1`);
            }
            const min = group.MinAcceptedCookLevel;
            const max = group.MaxAcceptedCookLevel;
            if (min && max && COOK_LEVEL_ORDER.indexOf(min) > COOK_LEVEL_ORDER.indexOf(max)) {
                add(`${gl}: min cook level must not exceed max cook level`);
            }
        });
    }

    if (condition.Type === 'Interaction') {
        const pointCount = condition.Locations.filter((location) => !isBlank(location.AnchorMesh)).length;
        condition.Locations.forEach((location, l) => {
            if (isBlank(location.AnchorMesh)) return;
            if (location.Instance !== undefined && (!isInt(location.Instance) || location.Instance < 0)) {
                add(`Point #${l + 1}: instance must be a whole number of 0 or more`);
            }
        });
        const { MinNeeded, MaxNeeded } = condition;
        if (!isInt(MinNeeded) || MinNeeded < 1) add('Min needed must be a whole number of 1 or more');
        if (!isInt(MaxNeeded) || MaxNeeded < 1) add('Max needed must be a whole number of 1 or more');
        if (isInt(MinNeeded) && isInt(MaxNeeded) && MinNeeded > MaxNeeded) {
            add('Min needed cannot be greater than max needed');
        }
        if (pointCount > 0 && MaxNeeded > pointCount) {
            add('Max needed cannot exceed the number of interaction points');
        }
        if (condition.WorldMarkerShowDistance !== undefined) {
            if (!isInt(condition.WorldMarkerShowDistance) || condition.WorldMarkerShowDistance < 0) {
                add('World marker distance must be a whole number of 0 or more');
            }
        }
    }
}

export const QUEST_ID_PATTERN = /^[A-Za-z0-9_-]+$/;

export function validateQuest(quest: Quest): QuestError[] {
    const errors: QuestError[] = [];

    if (isBlank(quest.id)) {
        errors.push({
            tab: 'details',
            label: 'Quest ID',
            message: 'Quest ID is required — it names the downloaded file',
            field: 'id',
            missing: true,
        });
    } else if (!QUEST_ID_PATTERN.test(quest.id)) {
        errors.push({
            tab: 'details',
            label: 'Quest ID',
            message: 'Quest ID can only contain letters, digits, underscores and hyphens',
            field: 'id',
        });
    }

    if (isBlank(quest.Title))
        errors.push({ tab: 'details', label: 'Title', message: 'Title is required', field: 'Title', missing: true });
    if (quest.TimeLimitHours === undefined) {
        errors.push({
            tab: 'details',
            label: 'Time limit',
            message: 'Time limit is required',
            field: 'TimeLimitHours',
            missing: true,
        });
    } else if (!(quest.TimeLimitHours > 0)) {
        errors.push({
            tab: 'details',
            label: 'Time limit',
            message: 'Time limit must be greater than 0',
            field: 'TimeLimitHours',
        });
    }

    validateReward(quest.RewardPool[0], errors);

    if (quest.Conditions.length === 0) {
        errors.push({ tab: 'conditions', label: 'Conditions', message: 'Add at least one condition', missing: true });
    }
    quest.Conditions.forEach((condition, i) => validateCondition(condition, i, errors));

    return errors;
}
