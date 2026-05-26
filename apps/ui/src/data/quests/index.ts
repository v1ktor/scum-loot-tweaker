import { HUNTER_TRADER_QUESTS } from './hunter-trader/quests-hunter-trader.ts';
import type { AssociatedNPC, Quest, QuestType } from './quests.types.ts';
import { ARMORER_QUESTS } from './quests-armorer.ts';
import { DOCTOR_QUESTS } from './quests-doctor.ts';
import { GENERAL_GOODS_QUESTS } from './quests-general-goods.ts';
import { MECHANIC_QUESTS } from './quests-mechanic.ts';

export type QuestGiverConfig = {
    id: string;
    npc: AssociatedNPC;
    name: string;
    quests: Quest[];
};

export const QUEST_GIVERS: QuestGiverConfig[] = [
    { id: 'hunter', npc: 'HunterTrader', name: 'Hunter', quests: HUNTER_TRADER_QUESTS },
    { id: 'general-goods', npc: 'GeneralGoods', name: 'General Goods', quests: GENERAL_GOODS_QUESTS },
    { id: 'armorer', npc: 'Armorer', name: 'Armorer', quests: ARMORER_QUESTS },
    { id: 'mechanic', npc: 'Mechanic', name: 'Mechanic', quests: MECHANIC_QUESTS },
    { id: 'medic', npc: 'Doctor', name: 'Medic', quests: DOCTOR_QUESTS },
];

export function findQuest(giverId: string, questId: string): { quest: Quest; giver: QuestGiverConfig } | null {
    const giver = QUEST_GIVERS.find((g) => g.npc === giverId);
    if (!giver) return null;
    const quest = giver.quests.find((q) => q.id === questId);
    if (!quest) return null;
    return { quest, giver };
}

export function getQuestType(id: string): QuestType {
    const part = id.split('_')[2];
    if (part === 'Kill') return 'Elimination';
    if (part === 'Interact') return 'Interaction';
    return 'Fetch';
}
