import { ARMORER_QUESTS } from './armorer/quests-armorer.ts';
import { DOCTOR_QUESTS } from './doctor/quests-doctor.ts';
import { GENERAL_GOODS_QUESTS } from './general-goods/quests-general-goods.ts';
import { HUNTER_TRADER_QUESTS } from './hunter-trader/quests-hunter-trader.ts';
import { MASTER_HUNTER_QUESTS } from './master-hunter/quests-master-hunter.ts';
import { MECHANIC_QUESTS } from './mechanic/quests-mechanic.ts';
import type { AssociatedNPC, Quest, QuestType } from './quests.types.ts';

export type QuestGiverConfig = {
    id: string;
    npc: AssociatedNPC;
    name: string;
    quests: Quest[];
};

export const QUEST_GIVERS: QuestGiverConfig[] = [
    { id: 'hunter', npc: 'HunterTrader', name: 'Hunter', quests: HUNTER_TRADER_QUESTS },
    { id: 'master-hunter', npc: 'MasterHunter', name: 'Master Hunter', quests: MASTER_HUNTER_QUESTS },
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

export type QuestDisplayType = QuestType | 'Mix';

export function getQuestType(quest: Quest): QuestDisplayType {
    const types = new Set(quest.Conditions.map((c) => c.Type));
    if (types.size > 1) return 'Mix';
    if (types.size === 1) return [...types][0];

    const part = quest.id.split('_')[2];
    if (part === 'Kill') return 'Elimination';
    if (part === 'Interact') return 'Interaction';
    return 'Fetch';
}
