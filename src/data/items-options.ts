import { Option } from "../pages/spawners/Spawners.types.ts";
import {
  AMMO_50_BMG_CALIBER,
  AMMO_50_BMG_CALIBER_AMMO_BOX,
  AMMO_50_BMG_CALIBER_AP,
  AMMO_50_BMG_CALIBER_AP_AMMO_BOX,
  AMMO_50_BMG_CALIBER_TR,
  AMMO_50_BMG_CALIBER_TR_AMMO_BOX
} from "../app/items/ammo/cal-50-bmg.ts";

export const ITEMS_OPTIONS: Option[] = [
  { value: AMMO_50_BMG_CALIBER.id, label: AMMO_50_BMG_CALIBER.name },
  { value: AMMO_50_BMG_CALIBER_AP.id, label: AMMO_50_BMG_CALIBER_AP.name },
  { value: AMMO_50_BMG_CALIBER_TR.id, label: AMMO_50_BMG_CALIBER_TR.name },
  { value: AMMO_50_BMG_CALIBER_AMMO_BOX.id, label: AMMO_50_BMG_CALIBER_AMMO_BOX.name },
  { value: AMMO_50_BMG_CALIBER_AP_AMMO_BOX.id, label: AMMO_50_BMG_CALIBER_AP_AMMO_BOX.name },
  { value: AMMO_50_BMG_CALIBER_TR_AMMO_BOX.id, label: AMMO_50_BMG_CALIBER_TR_AMMO_BOX.name },
];
