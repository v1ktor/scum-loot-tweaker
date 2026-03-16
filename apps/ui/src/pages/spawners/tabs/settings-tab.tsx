import {Dispatch, SetStateAction} from 'react';
import {Option, Spawner} from '@/pages/spawners/Spawners.types.ts';
import {InputField} from '@/components/input-field/input-field.tsx';
import {ProbabilityTooltip} from '@/pages/spawners/tooltips/probability-tooltip.tsx';
import {QuantityTooltip} from '@/pages/spawners/tooltips/quantity-tooltip.tsx';
import {InitialDamageTooltip} from '@/pages/spawners/tooltips/initial-damage-tooltip.tsx';
import {RandomDamageTooltip} from '@/pages/spawners/tooltips/random-damage-tooltip.tsx';
import {InitialUsageTooltip} from '@/pages/spawners/tooltips/initial-usage-tooltip.tsx';
import {RandomUsageTooltip} from '@/pages/spawners/tooltips/random-usage-tooltip.tsx';
import {MultiSelect} from '@/components/multiselect/multiselect.tsx';
import {POST_SPAWN_ACTIONS_OPTIONS} from '@/data/post-spawn-actions-options.ts';
import {PostSpawnActionsTooltip} from '@/pages/spawners/tooltips/post-spawn-actions-tooltip.tsx';
import {SwitchField} from '@/components/switch-field/switch-field.tsx';
import {AllowDuplicatesTooltip} from '@/pages/spawners/tooltips/allow-duplicates-tooltip.tsx';
import {ShouldFilterItemsByZoneTooltip} from '@/pages/spawners/tooltips/should-filter-items-by-zone-tooltip.tsx';

interface SettingsTabProps {
  spawner: Spawner;
  setSpawner: Dispatch<SetStateAction<Spawner>>;
}

export function SettingsTab(props: SettingsTabProps) {
  const { spawner, setSpawner } = props;

  const handleFieldChange = (field: keyof Spawner) => (value: string) => {
    setSpawner(prev => ({...prev, [field]: value}));
  };

  const handleFieldClear = (field: keyof Spawner) => () => {
    setSpawner(prev => ({...prev, [field]: undefined}));
  };

  return (
    <div className="grid grid-cols-[7fr_3fr] gap-8 mt-4">
      <div>
        <InputField value={spawner.Probability ? spawner.Probability : ''} id="probability"
                    label="Probability"
                    onChange={handleFieldChange('Probability')} onClear={handleFieldClear('Probability')}
                    tooltipContent={<ProbabilityTooltip probability={spawner.Probability}/>}/>
        <div className="flex gap-4">
          <InputField value={spawner.QuantityMin ? spawner.QuantityMin : ''} id="quantity-min"
                      label="Quantity Min"
                      onChange={handleFieldChange('QuantityMin')} onClear={handleFieldClear('QuantityMin')}
                      tooltipContent={<QuantityTooltip/>}/>
          <InputField value={spawner.QuantityMax ? spawner.QuantityMax : ''} id="quantity-max"
                      label="Quantity Max"
                      onChange={handleFieldChange('QuantityMax')} onClear={handleFieldClear('QuantityMax')}
                      tooltipContent={<QuantityTooltip/>}/>
        </div>
        <div className="flex gap-4">
          <InputField value={spawner.InitialDamage ? spawner.InitialDamage : ''} id="initial-damage"
                      label="Initial damage" onChange={handleFieldChange('InitialDamage')}
                      onClear={handleFieldClear('InitialDamage')} tooltipContent={<InitialDamageTooltip/>}/>
          <InputField value={spawner.RandomDamage ? spawner.RandomDamage : ''} id="random-damage"
                      label="Random damage" onChange={handleFieldChange('RandomDamage')}
                      onClear={handleFieldClear('RandomDamage')} tooltipContent={<RandomDamageTooltip/>}/>
        </div>
        <div className="flex gap-4">
          <InputField value={spawner.InitialUsage ? spawner.InitialUsage : ''} id="initial-usage"
                      label="Initial Usage" onChange={handleFieldChange('InitialUsage')}
                      onClear={handleFieldClear('InitialUsage')} tooltipContent={<InitialUsageTooltip/>}/>
          <InputField value={spawner.RandomUsage ? spawner.RandomUsage : ''} id="random-usage"
                      label="Random Usage"
                      onChange={handleFieldChange('RandomUsage')} onClear={handleFieldClear('RandomUsage')}
                      tooltipContent={<RandomUsageTooltip/>}/>
        </div>
        <MultiSelect
          id="post-spawn-actions"
          label="Post spawn actions"
          placeholder="Select post spawn actions..."
          items={POST_SPAWN_ACTIONS_OPTIONS}
          values={spawner.PostSpawnActions ?? []}
          onValueChange={(values: Option[]) => {
            setSpawner(prev => ({
              ...prev,
              PostSpawnActions: values.length > 0 ? values.map((v) => v.value) : undefined,
            }));
          }}
          onClear={() => setSpawner(prev => ({...prev, PostSpawnActions: undefined}))}
          tooltipContent={<PostSpawnActionsTooltip/>}
        />

        <SwitchField
          onCheckedChange={(checked) => setSpawner(prev => ({...prev, AllowDuplicates: checked}))}
          tooltipContent={<AllowDuplicatesTooltip/>}
          label="Allow Duplicates"
          id="allow-duplicates"
          checked={spawner.AllowDuplicates}
        />

        <SwitchField
          onCheckedChange={(checked) => setSpawner(prev => ({
            ...prev,
            ShouldApplyLocationSpecificDamageModifier: checked
          }))}
          tooltipContent={<p>Tooltip coming soon!</p>}
          label="Apply location specific damage modifier"
          id="should-apply-location-specific-damage-modifier"
          checked={spawner.ShouldApplyLocationSpecificDamageModifier}
        />

        <SwitchField
          onCheckedChange={(checked) => setSpawner(prev => ({
            ...prev,
            ShouldApplyLocationSpecificProbabilityModifier: checked
          }))}
          tooltipContent={<p>Tooltip coming soon!</p>}
          label="Apply location specific probability modifier"
          id="should-apply-location-specific-probability-modifier"
          checked={spawner.ShouldApplyLocationSpecificProbabilityModifier}
        />

        <SwitchField
          onCheckedChange={(checked) => setSpawner(prev => ({...prev, ShouldFilterItemsByZone: checked}))}
          tooltipContent={<ShouldFilterItemsByZoneTooltip/>}
          label="Filter items by zone"
          id="should-filter-items-by-zone"
          checked={spawner.ShouldFilterItemsByZone}
        />
      </div>
      <div>
        <span className="text-sm truncate font-medium">In-game image:</span>
        <img
          src="https://placehold.co/400"
          alt="Event cover"
          className="relative w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
      </div>
    </div>
  );
}

