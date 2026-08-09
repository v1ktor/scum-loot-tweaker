import {WandSparkles} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {ButtonGroup} from '@/components/ui/button-group.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {QUEST_GIVERS} from '@/data/quests/index.ts';
import type {AssociatedNPC, Quest} from '@/data/quests/quests.types.ts';
import {buildQuestId} from '../quest-id.ts';
import type {QuestError} from '../quest-validation.ts';
import {Field, NumberInput, Select, TextInput} from './quest-editor-fields.tsx';

const GIVER_LABELS = new Map(QUEST_GIVERS.map((giver) => [giver.npc, giver.name]));
const ALL_NPCS: readonly AssociatedNPC[] = [
  'Hunter',
  'MasterHunter',
  'GeneralGoods',
  'Armorer',
  'Mechanic',
  'Doctor',
  'Banker',
  'Barber',
  'Bartender',
  'Fisherman',
];
const NPC_OPTIONS = ALL_NPCS.map((npc) => ({value: npc, label: GIVER_LABELS.get(npc) ?? npc}));
const TIER_OPTIONS = [
  {value: '1', label: 'Tier 1'},
  {value: '2', label: 'Tier 2'},
  {value: '3', label: 'Tier 3'},
] as const;

export function QuestMetaEditor({
                                  quest,
                                  onChange,
                                  errors = [],
                                }: {
  quest: Quest;
  onChange: (patch: Partial<Quest>) => void;
  errors?: QuestError[];
}) {
  const errorFor = (field: string) => errors.find((e) => e.field === field)?.message;
  const suggestedId = buildQuestId(quest);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-4">
        <Field
          label="Quest ID"
          hint="Names the downloaded file and identifies the quest in the game's quest list. Vanilla quests follow T{tier}_{giver}_{type}_{what}, e.g. T1_RH_Fetch_AnimalFat — use the wand to build one from the tier, giver, conditions and title."
          required
          error={errorFor('id')}
        >
          <ButtonGroup className="w-full">
            <TextInput
              value={quest.id}
              onChange={(id) => onChange({id})}
              placeholder="T1_RH_Fetch_AnimalFat"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              title={
                suggestedId
                  ? `Generate from tier, giver, conditions and title: ${suggestedId}`
                  : 'Enter a title to generate an ID'
              }
              disabled={!suggestedId || suggestedId === quest.id}
              onClick={() => onChange({id: suggestedId})}
            >
              <WandSparkles/>
            </Button>
          </ButtonGroup>
        </Field>
        <Field label="Title" required error={errorFor('Title')}>
          <TextInput
            value={quest.Title}
            onChange={(Title) => onChange({Title})}
            placeholder="Quest title"
          />
        </Field>
        <Field label="Description" error={errorFor('Description')}>
          <Textarea
            value={quest.Description ?? ''}
            onChange={(e) => onChange({Description: e.target.value})}
            placeholder="Flavour text shown to the player"
            className="min-h-40 resize-y field-sizing-fixed"
          />
        </Field>
      </div>
      <div className="flex flex-col gap-4">
        <Field label="Giver" required>
          <Select
            value={quest.AssociatedNPC}
            options={NPC_OPTIONS}
            onChange={(AssociatedNPC: AssociatedNPC) => onChange({AssociatedNPC})}
          />
        </Field>
        <Field label="Tier" required>
          <Select
            value={String(quest.Tier)}
            options={TIER_OPTIONS}
            onChange={(tier) => onChange({Tier: Number(tier) as Quest['Tier']})}
          />
        </Field>
        <Field label="Time limit (hours)" error={errorFor('TimeLimitHours')}>
          <NumberInput
            value={quest.TimeLimitHours}
            onChange={(TimeLimitHours) => onChange({TimeLimitHours})}
            step={0.5}
          />
        </Field>
      </div>
    </div>
  );
}
