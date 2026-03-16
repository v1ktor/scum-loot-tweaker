import { Type } from "@sinclair/typebox";

export const GetCooldownGroupsSchema = Type.Object({
  DeleteAllDefaultCooldownGroups: Type.Boolean({ examples: [false] }),
  DefaultCooldownGroupsToDelete: Type.Array(Type.String(), { examples: [[]] }),
  CooldownGroups: Type.Array(Type.Object({
    Name: Type.String({ examples: ["Weapons.Handguns.Tier.Low"] }),
    _comment: Type.Optional(Type.String({ examples: ["1min-2hours"] })),
    CooldownMin: Type.Number({ minimum: 0, examples: [0.5] }),
    CooldownMax: Type.Number({ minimum: 0, examples: [1] }),
    IsAffectedByLowerGroups: Type.Boolean({ examples: [true] })
  }), {
    examples: [[{
      Name: "Weapons.Handguns.Tier.Low",
      _comment: "30min-1hours",
      CooldownMin: 0.5,
      CooldownMax: 1,
      IsAffectedByLowerGroups: true
    }, {
      Name: "Weapons.Handguns.Tier.Medium",
      _comment: "30min-2hours",
      CooldownMin: 0.5,
      CooldownMax: 2,
      IsAffectedByLowerGroups: true
    }]]
  })
});