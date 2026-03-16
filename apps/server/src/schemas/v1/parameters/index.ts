import { Type } from "@sinclair/typebox";
import { AllowedLocationsSchema } from "../common";

export const GetParametersSchema = Type.Object({
  Parameters: Type.Array(Type.Object({
    Id: Type.String(),
    IsDisabledForSpawning: Type.Boolean(),
    AllowedLocations: Type.Array(AllowedLocationsSchema),
    CooldownPerSquadMemberMin: Type.Integer({ minimum: 0 }),
    CooldownPerSquadMemberMax: Type.Integer({ minimum: 0 }),
    CooldownGroup: Type.String(),
    Variations: Type.Array(Type.String()),
    ShouldOverrideInitialAndRandomUsage: Type.Boolean(),
    InitialUsageOverride: Type.Integer({ minimum: 0 }),
    RandomUsageOverrideUsage: Type.Integer({ minimum: 0 })
  }))
}, {
  examples: [{
    Parameters: [
      {
        Id: "12_Gauge_Birdshot",
        IsDisabledForSpawning: false,
        AllowedLocations: [
          "Coastal",
          "Continental",
          "Mountain"
        ],
        CooldownPerSquadMemberMin: 0,
        CooldownPerSquadMemberMax: 0,
        CooldownGroup: "CooldownGroup_Ammo",
        Variations: [],
        ShouldOverrideInitialAndRandomUsage: false,
        InitialUsageOverride: 0,
        RandomUsageOverrideUsage: 0
      },
      {
        Id: "12_Gauge_Birdshot_Ammobox",
        IsDisabledForSpawning: false,
        AllowedLocations: [
          "Coastal",
          "Continental",
          "Mountain"
        ],
        CooldownPerSquadMemberMin: 0,
        CooldownPerSquadMemberMax: 0,
        CooldownGroup: "",
        Variations: [],
        ShouldOverrideInitialAndRandomUsage: false,
        InitialUsageOverride: 0,
        RandomUsageOverrideUsage: 0
      }]
  }]
});