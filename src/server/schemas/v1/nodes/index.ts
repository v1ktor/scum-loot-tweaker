import { Type } from "@sinclair/typebox";
import { RaritySchema } from "../common";

export const GetNodesSchema = Type.Object({
  filenames: Type.Array(Type.String(), {
    examples: [["Airfield.json",
      "Bar.json",
      "Barn.json"]]
  })
});

export const GetNodeSchema = Type.Recursive((Node) => Type.Object({
    Name: Type.String({ examples: ['ItemLootTreeNodes'] }),
    Rarity: RaritySchema,
    Children: Type.Optional(Type.Array(Node, {
      examples: [
        {
          Name: 'Airfield', Rarity: 'Uncommon', Children: [{
            Name: "tools", Rarity: "Uncommon", Children: [{
              Name: "Car_Battery", Rarity: "Rare"
            }]
          }]
        }
      ]
    })),
    Variations: Type.Optional(Type.Array(Type.String(), { examples: [['1H_MK5000_Metal']] })),
    PostSpawnActions: Type.Optional(Type.Array(Type.String(), { examples: [['SetAmmoAmount_BigStash', 'SetClothesDirtiness_ResidentialClothes']] }))
  }),
  { $id: 'GetNodeSchema' }
);