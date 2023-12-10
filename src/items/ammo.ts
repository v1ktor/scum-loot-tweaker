import { Item } from "./item";
import {
    AMMO_12_GAUGE_BIRDSHOT,
    AMMO_12_GAUGE_BIRDSHOT_AMMO_BOX,
    AMMO_12_GAUGE_BUCKSHOT,
    AMMO_12_GAUGE_BUCKSHOT_AMMO_BOX, AMMO_12_GAUGE_SLUG, AMMO_12_GAUGE_SLUG_AMMO_BOX
} from "./ammo/cal-12";
import {
    AMMO_22_CALIBER,
    AMMO_22_CALIBER_AMMO_BOX,
    AMMO_22_CALIBER_TR,
    AMMO_22_CALIBER_TR_AMMO_BOX
} from "./ammo/cal-22";
import {
    AMMO_308_CALIBER,
    AMMO_308_CALIBER_AMMO_BOX,
    AMMO_308_CALIBER_AP, AMMO_308_CALIBER_AP_AMMO_BOX, AMMO_308_CALIBER_TR,
    AMMO_308_CALIBER_TR_AMMO_BOX
} from "./ammo/cal-308";
import {
    AMMO_338_CALIBER,
    AMMO_338_CALIBER_AMMO_BOX,
    AMMO_338_CALIBER_AP,
    AMMO_338_CALIBER_AP_AMMO_BOX, AMMO_338_CALIBER_TR, AMMO_338_CALIBER_TR_AMMO_BOX
} from "./ammo/cal-338";
import {
    AMMO_357_CALIBER,
    AMMO_357_CALIBER_AMMO_BOX,
    AMMO_357_CALIBER_AP,
    AMMO_357_CALIBER_AP_AMMO_BOX,
    AMMO_357_CALIBER_TR, AMMO_357_CALIBER_TR_AMMO_BOX
} from "./ammo/cal-357";
import {
    AMMO_30_06_CALIBER,
    AMMO_30_06_CALIBER_AMMO_BOX,
    AMMO_30_06_CALIBER_AP, AMMO_30_06_CALIBER_AP_AMMO_BOX,
    AMMO_30_06_CALIBER_TR, AMMO_30_06_CALIBER_TR_AMMO_BOX
} from "./ammo/cal-30-06";

const AMMO_38_CALIBER: Item = {
    id: 'Cal_38',
    name: '38 Caliber',
    picture: '',
} as const;

const AMMO_45_CALIBER: Item = {
    id: 'Cal_45',
    name: '45 Caliber',
    picture: '',
} as const;


export const AMMO = new Set([
    AMMO_12_GAUGE_BIRDSHOT,
    AMMO_12_GAUGE_BIRDSHOT_AMMO_BOX,
    AMMO_12_GAUGE_BUCKSHOT,
    AMMO_12_GAUGE_BUCKSHOT_AMMO_BOX,
    AMMO_12_GAUGE_SLUG,
    AMMO_12_GAUGE_SLUG_AMMO_BOX,

    AMMO_22_CALIBER,
    AMMO_22_CALIBER_AMMO_BOX,
    AMMO_22_CALIBER_TR,
    AMMO_22_CALIBER_TR_AMMO_BOX,

    AMMO_308_CALIBER,
    AMMO_308_CALIBER_AMMO_BOX,
    AMMO_308_CALIBER_AP,
    AMMO_308_CALIBER_AP_AMMO_BOX,
    AMMO_308_CALIBER_TR,
    AMMO_308_CALIBER_TR_AMMO_BOX,

    AMMO_338_CALIBER,
    AMMO_338_CALIBER_AMMO_BOX,
    AMMO_338_CALIBER_AP,
    AMMO_338_CALIBER_AP_AMMO_BOX,
    AMMO_338_CALIBER_TR,
    AMMO_338_CALIBER_TR_AMMO_BOX,

    AMMO_357_CALIBER,
    AMMO_357_CALIBER_AMMO_BOX,
    AMMO_357_CALIBER_AP,
    AMMO_357_CALIBER_AP_AMMO_BOX,
    AMMO_357_CALIBER_TR,
    AMMO_357_CALIBER_TR_AMMO_BOX,

    AMMO_30_06_CALIBER,
    AMMO_30_06_CALIBER_AMMO_BOX,
    AMMO_30_06_CALIBER_AP,
    AMMO_30_06_CALIBER_AP_AMMO_BOX,
    AMMO_30_06_CALIBER_TR,
    AMMO_30_06_CALIBER_TR_AMMO_BOX,
]);
