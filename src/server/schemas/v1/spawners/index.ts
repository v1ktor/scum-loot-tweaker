import { Type } from "@sinclair/typebox";
import { RaritySchema } from "../common";

export const GetSpawnersSchema = Type.Object({
  filenames: Type.Array(Type.String(), {
    examples: [["Special_Packages-Killbox-Examine_MP5_KillBox_Pack.json",
      "Special_Packages-Killbox-Examine_Ninja_KillBox_Pack.json",
      "Special_Packages-Killbox-Examine_Pink_KillBox_Pack.json",
      "Special_Packages-Killbox-Examine_RPG_KillBox_Pack.json"]]
  })
})

export const GetSpawnerSchema = Type.Object({
  Nodes: Type.Optional(Type.Array(
    Type.Object({
      Rarity: RaritySchema,
      Ids: Type.Array(Type.String())
    }),
    {
      examples: [
        [{
          Rarity: "Uncommon",
          Ids: ["ItemLootTreeNodes.Airfield.Misc", "ItemLootTreeNodes.Airfield.Medical"]
        }]
      ]
    })),
  Probability: Type.Optional(Type.Integer({ minimum: 0, examples: [15] })),
  QuantityMin: Type.Optional(Type.Integer({ minimum: 0, examples: [1] })),
  QuantityMax: Type.Optional(Type.Integer({ minimum: 0, examples: [2] })),
  AllowDuplicates: Type.Optional(Type.Boolean({ examples: [false] })),
  ShouldFilterItemsByZone: Type.Optional(Type.Boolean({ examples: [true] })),
  InitialDamage: Type.Optional(Type.Integer({ minimum: 0, examples: [20] })),
  RandomDamage: Type.Optional(Type.Integer({ minimum: 0, examples: [20] })),
  InitialUsage: Type.Optional(Type.Integer({ minimum: 0, examples: [20] })),
  RandomUsage: Type.Optional(Type.Integer({ minimum: 0, examples: [20] })),
  PostSpawnActions: Type.Optional(Type.Array(Type.String(), { examples: [["SetAmmoAmount_BigStash", "SetClothesDirtiness_ResidentialClothes"]] })),
  Subpresets: Type.Optional(Type.Array(
    Type.Object({
      Id: Type.String(),
      Rarity: RaritySchema
    }),
    {
      examples: [[{
        "Rarity": "Uncommon",
        "Id": "Special_Packages-Vault-Examine_Pistols_Deagle_Judge_Vault_Pack"
      }]]
    }
  ))
})