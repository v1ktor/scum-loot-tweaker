import {Dispatch, SetStateAction} from 'react';
import {Spawner} from '@/pages/spawners/Spawners.types.ts';
import {Item} from '@/components/ui/item.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Rarity} from '@/data/rarity.ts';

interface NodesTabProps {
  spawner: Spawner;
  setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export type GetNode = {
  Name: string;
  Rarity: Rarity;
  Children?: GetNode[];
  Variations?: string[];
  PostSpawnActions?: string[];
};

export type GetChildren = {
  Name: string;
  Rarity: Rarity;
  Children?: GetChildren[];
};

export function NodesTab(props: NodesTabProps) {
  const {spawner} = props;

  return (
    <div className="mt-4">
      {spawner.Nodes?.map((node) => (
        <Item variant="outline" style={{marginTop: 8}}>
          <Badge variant="outline">{node.Rarity}</Badge>
          {node.Ids.map((id) => (
            <Input value={id} className="w-full" readOnly={true}/>
          ))}
        </Item>
      ))}
    </div>
  );
}


