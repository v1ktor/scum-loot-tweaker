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
});