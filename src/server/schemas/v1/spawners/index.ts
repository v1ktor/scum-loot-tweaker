import { Type } from "@sinclair/typebox";
import { RaritySchema } from "../common";

export const GetSpawnersSchema = Type.Object({
  filenames: Type.Array(Type.String())
})

export const GetSpawnerSchema = Type.Object({
  Nodes: Type.Optional(Type.Array(
    Type.Object({
      Rarity: RaritySchema,
      Ids: Type.Array(Type.String())
    })
  )),
  Probability: Type.Optional(Type.Integer({ minimum: 0 })),
  QuantityMin: Type.Optional(Type.Integer({ minimum: 0 })),
  QuantityMax: Type.Optional(Type.Integer({ minimum: 0 })),
  AllowDuplicates: Type.Optional(Type.Boolean()),
  ShouldFilterItemsByZone: Type.Optional(Type.Boolean()),
  InitialDamage: Type.Optional(Type.Integer({ minimum: 0 })),
  RandomDamage: Type.Optional(Type.Integer({ minimum: 0 })),
  InitialUsage: Type.Optional(Type.Integer({ minimum: 0 })),
  RandomUsage: Type.Optional(Type.Integer({ minimum: 0 })),
  PostSpawnActions: Type.Optional(Type.Array(Type.String())),
  Subpresets: Type.Optional(Type.Array(
    Type.Object({
      Id: Type.String(),
      Rarity: RaritySchema
    })
  ))
})