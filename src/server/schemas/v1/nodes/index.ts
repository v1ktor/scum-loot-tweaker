import { Type } from "@sinclair/typebox";
import { RaritySchema } from "../common";

export const GetNodesSchema = Type.Object({
  filenames: Type.Array(Type.String())
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
    Variations: Type.Optional(Type.Array(Type.String())),
    PostSpawnActions: Type.Optional(Type.Array(Type.String()))
  }),
  { $id: 'GetNodeSchema' }
);