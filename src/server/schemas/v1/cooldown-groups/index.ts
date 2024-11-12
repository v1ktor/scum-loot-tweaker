import { Type } from "@sinclair/typebox";

export const GetCooldownGroupsSchema = Type.Object({
  DeleteAllDefaultCooldownGroups: Type.Boolean(),
  DefaultCooldownGroupsToDelete: Type.Array(Type.String()),
  CooldownGroups: Type.Array(Type.Object({
    Name: Type.String(),
    _comment: Type.Optional(Type.String()),
    CooldownMin: Type.Number({ minimum: 0 }),
    CooldownMax: Type.Number({ minimum: 0 }),
    IsAffectedByLowerGroups: Type.Boolean()
  }))
});