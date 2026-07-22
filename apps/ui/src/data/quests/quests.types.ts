export type AssociatedNPC =
    | 'Armorer'
    | 'Banker'
    | 'Barber'
    | 'Bartender'
    | 'Doctor'
    | 'Fisherman'
    | 'GeneralGoods'
    | 'Mechanic'
    | 'Hunter'
    | 'MasterHunter';
export type QuestType = 'Fetch' | 'Elimination' | 'Interaction';
export type Skill =
    | 'Archery'
    | 'Aviation'
    | 'Awareness'
    | 'Boxing'
    | 'Camouflage'
    | 'Cooking'
    | 'Demolition'
    | 'Driving'
    | 'Endurance'
    | 'Engineering'
    | 'Farming'
    | 'Handgun'
    | 'Medical'
    | 'MeleeWeapons'
    | 'Motorcycle'
    | 'Rifles'
    | 'Running'
    | 'Sniping'
    | 'Stealth'
    | 'Survival'
    | 'Tactics'
    | 'Thievery';

export type SkillReward = {
    Skill: Skill;
    Experience: number;
};

export type TradeDeal = {
    Item: string;
    Price?: number;
    Amount?: number;
    AllowExcluded?: boolean;
    Fame?: number;
};

export type Reward = {
    CurrencyNormal?: number;
    CurrencyGold?: number;
    Fame?: number;
    Skills?: SkillReward[];
    TradeDeal?: TradeDeal[];
    Items?: string[];
};

export type MapLocation = {
    Location: { X: number; Y: number; Z: number } | string;
    SizeFactor: number;
};

type ConditionBase = {
    CanBeAutoCompleted?: boolean;
    TrackingCaption?: string;
    SequenceIndex: number;
    LocationsShownOnMap?: MapLocation[];
};

export type EliminationCondition = ConditionBase & {
    Type: Extract<QuestType, 'Elimination'>;
    TargetCharacters: string[];
    Amount: number;
    AllowedWeapons?: string[];
};

export type CookLevel = 'Raw' | 'Undercooked' | 'Cooked' | 'Overcooked' | 'Burned';
export type CookQuality = 'Ruined' | 'Bad' | 'Poor' | 'Good' | 'Excellent' | 'Perfect';

export type RequiredItem = {
    AcceptedItems: string[];
    RequiredNum: number;
    RandomAdditionalRequiredNum?: number;
    MinAcceptedItemUses?: number;
    MinAcceptedCookLevel?: CookLevel;
    MaxAcceptedCookLevel?: CookLevel;
    MinAcceptedCookQuality?: CookQuality;
    MinAcceptedItemMass?: number;
    MinAcceptedItemHealth?: number;
    MinAcceptedItemResourceRatio?: number;
    MinAcceptedItemResourceAmount?: number;
};

export type FetchCondition = ConditionBase & {
    Type: Extract<QuestType, 'Fetch'>;
    DisablePurchaseOfRequiredItems?: boolean;
    PlayerKeepsItems?: boolean;
    RequiredItems: RequiredItem[];
};

export type InteractionLocation = {
    AnchorMesh: string;
    Instance?: number;
    FallbackTransform?: string;
    VisibleMesh?: string;
};

export type InteractionCondition = ConditionBase & {
    Type: Extract<QuestType, 'Interaction'>;
    Locations: InteractionLocation[];
    MinNeeded: number;
    MaxNeeded: number;
    SpawnOnlyNeeded?: boolean;
    WorldMarkerShowDistance?: number;
};

export type Condition = EliminationCondition | FetchCondition | InteractionCondition;

export type Quest = {
    id: string;
    AssociatedNPC: AssociatedNPC;
    Tier: 1 | 2 | 3;
    Title: string;
    Description: string;
    TimeLimitHours?: number;
    RewardPool: Reward[];
    Conditions: Condition[];
};
