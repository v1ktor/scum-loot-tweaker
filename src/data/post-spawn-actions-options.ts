import { Option } from "../pages/spawners/Spawners.types.ts";

export const POST_SPAWN_ACTIONS_OPTIONS: Option[] = [
  {value: 'AbandonedBunkerKeycard', label: 'AB Keycard'},
  {value: 'SetAmmoAmount_BigStash', label: 'Ammo Big Stash'},
  {value: 'SetAmmoAmount_SmallStash', label: 'Ammo Small Stash'},
  {value: 'SetCashAmount_BigStash', label: 'Cash 200-500'},
  {value: 'SetCashAmount_MediumStash', label: 'Cash 50-200'},
  {value: 'SetCashAmount_SmallStash', label: 'Cash 1-100'},
  {value: 'SetClothesDirtiness_DeadPuppets', label: 'Clothes Dirtiness 93%-96%'},
  {value: 'SetClothesDirtiness_DirtyClothes', label: 'Clothes Dirtiness 60%-85%'},
  {value: 'SetClothesDirtiness_ResidentialClothes', label: 'Clothes Dirtiness 0%-20%'},
  {value: 'SetUsage_Max', label: '0 Uses'},
  {value: 'KillboxKeycard_Cargo', label: 'KB Keycard Cargo'},
  {value: 'KillboxKeycard_Police', label: 'KB Keycard Police'},
  {value: 'KillboxKeycard_Radiation', label: 'KB Keycard Radiation'},
  {value: 'KillboxKeycard_Sentry', label: 'KB Keycard Sentry'},
]
