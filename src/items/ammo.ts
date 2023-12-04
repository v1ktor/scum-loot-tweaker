import { Item } from "./item";

const Ammo12GaugeBirdshot: Item = {
    id: '12_Gauge_Birdshot',
    name: '12 Gauge Birdshot',
    picture: '',
} as const;

const Ammo12GaugeBirdshotAmmoBox: Item = {
    id: '12_Gauge_Birdshot_Ammobox',
    name: '12 Gauge Birdshot Ammo Box',
    picture: '',
} as const

const Ammo12GaugeBuckshot: Item = {
    id: '12_Gauge_Buckshot',
    name: '12 Gauge Buckshot',
    picture: '',
} as const;

const Ammo12GaugeBuckshotAmmoBox: Item = {
    id: '12_Gauge_Buckshot_Ammobox',
    name: '12 Gauge Buckshot Ammo Box',
    picture: '',
} as const;

const Ammo12GaugeSlug: Item = {
    id: '12_Gauge_Slug',
    name: '12 Gauge Slug',
    picture: '',
} as const;

const Ammo12GaugeSlugAmmoBox: Item = {
    id: '12_Gauge_Slug_Ammobox',
    name: '12 Gauge Slug Ammo Box',
    picture: '',
} as const;

export const ammo = new Set([
    Ammo12GaugeBirdshot,
    Ammo12GaugeBirdshotAmmoBox,
    Ammo12GaugeBuckshot,
    Ammo12GaugeBuckshotAmmoBox,
    Ammo12GaugeSlug,
    Ammo12GaugeSlugAmmoBox,
])
