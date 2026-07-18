import type { VisibilityState } from '@tanstack/react-table';
import type { QuestDisplayType, QuestGiverConfig } from '@/data/quests/index.ts';
import { getQuestType, QUEST_GIVERS } from '@/data/quests/index.ts';
import type { Condition, Quest } from '@/data/quests/quests.types.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';

export type Row = {
    quest: Quest;
    giver: QuestGiverConfig;
    type: QuestDisplayType;
    moneySummary: string;
    fpSummary: string;
    xpSummary: string;
    itemsSummary: string;
    tradeDealSummary: string;
    conditionSummary: string;
    conditionExtraInfo: string;
};

function summarizeConditions(conditions: Condition[], itemsOptions: Option[]): string {
    return conditions
        .map((c) => {
            if (c.Type === 'Fetch') {
                return c.RequiredItems.map(
                    (ri) =>
                        `${ri.RequiredNum}x any of: ${ri.AcceptedItems.map((i) => getItemName(i, itemsOptions)).join(', ')}`,
                ).join(' + ');
            }
            if (c.Type === 'Elimination') {
                return `Kill ${c.Amount}x ${c.TargetCharacters.join(', ')}`;
            }
            return 'Interaction';
        })
        .join(' + ');
}

function conditionExtraInfo(conditions: Condition[]): string {
    const parts: string[] = [];

    for (const c of conditions) {
        if (c.Type === 'Fetch') {
            for (const ri of c.RequiredItems) {
                if (ri.MinAcceptedItemHealth !== undefined) {
                    parts.push(`Min durability: ${ri.MinAcceptedItemHealth}%`);
                }
            }
        }
    }

    return parts.join(' · ');
}

function summarizeMoney(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';

    const r = quest.RewardPool[0];
    const parts: string[] = [];

    if (r.CurrencyNormal) parts.push(`${r.CurrencyNormal.toLocaleString()} $`);
    if (r.CurrencyGold) parts.push(`${r.CurrencyGold} Gold`);

    return parts.join(' · ') || '—';
}

function summarizeFame(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';

    const r = quest.RewardPool[0];

    return r.Fame ? `${r.Fame} FP` : '—';
}

function summarizeXp(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';

    const skills = quest.RewardPool[0].Skills;

    if (!skills?.length) return '—';

    return skills.map((s) => `${s.Skill} XP`).join('\n');
}

function summarizeItems(quest: Quest, itemsOptions: Option[]): string {
    if (!quest.RewardPool.length) return '—';

    const items = quest.RewardPool[0].Items;

    if (!items?.length) return '—';

    return items.map((i) => getItemName(i, itemsOptions)).join('\n');
}

function summarizeTradeDeal(quest: Quest, itemsOptions: Option[]): string {
    if (!quest.RewardPool.length) return '—';

    const deals = quest.RewardPool[0].TradeDeal;

    if (!deals?.length) return '—';

    return deals
        .map((td) => {
            const itemName = getItemName(td.Item, itemsOptions);
            const quantity = td.Amount ? `${td.Amount}x of ${itemName}` : itemName;
            const costParts: string[] = [];

            if (td.Price) costParts.push(`${td.Price.toLocaleString()} $`);
            if (td.Fame !== undefined) costParts.push(`${td.Fame} FP`);

            const cost = costParts.join(' and ');

            return cost ? `${quantity} at ${cost}` : quantity;
        })
        .join('\n');
}

function mapQuestsToRows(quests: Quest[], giver: QuestGiverConfig, itemsOptions: Option[]): Row[] {
    return quests.map((quest) => ({
        quest,
        giver,
        type: getQuestType(quest),
        moneySummary: summarizeMoney(quest),
        fpSummary: summarizeFame(quest),
        xpSummary: summarizeXp(quest),
        itemsSummary: summarizeItems(quest, itemsOptions),
        tradeDealSummary: summarizeTradeDeal(quest, itemsOptions),
        conditionSummary: summarizeConditions(quest.Conditions, itemsOptions),
        conditionExtraInfo: conditionExtraInfo(quest.Conditions),
    }));
}

export function buildAllRows(itemsOptions: Option[]): Row[] {
    return QUEST_GIVERS.flatMap((giver) => mapQuestsToRows(giver.quests, giver, itemsOptions));
}

export function computeDefaultColumnVisibility(rows: Row[]): VisibilityState {
    if (rows.length === 0) return {};

    const visibility: VisibilityState = {};

    if (rows.every((r) => r.moneySummary === '—')) visibility.money = false;
    if (rows.every((r) => r.fpSummary === '—')) visibility.fp = false;
    if (rows.every((r) => r.xpSummary === '—')) visibility.xp = false;
    if (rows.every((r) => r.itemsSummary === '—')) visibility.items = false;
    if (rows.every((r) => r.tradeDealSummary === '—')) visibility.tradeDeal = false;
    if (rows.every((r) => r.conditionExtraInfo === '')) visibility.conditionExtra = false;

    return visibility;
}
