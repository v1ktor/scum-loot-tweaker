import { Crosshair, MapPin, Package, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import type {
    Condition,
    EliminationCondition,
    FetchCondition,
    InteractionCondition,
    RequiredItem,
} from '@/data/quests/quests.types.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';
import { SectionHeader } from './quest-section-header.tsx';

function ConditionList({ items }: { items: string[] }) {
    return (
        <ul className="flex flex-col gap-1.5">
            {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function ConditionHeader({ condition, step }: { condition: Condition; step?: number }) {
    const caption = condition.TrackingCaption;
    const autoComplete = condition.CanBeAutoCompleted;
    const mapCount = condition.LocationsShownOnMap?.length ?? 0;

    if (!caption && step === undefined && !autoComplete && mapCount === 0) return null;

    return (
        <div className="mb-2 flex flex-wrap items-center gap-2">
            {caption && <span className="font-medium">{caption}</span>}
            <div className="ml-auto flex flex-wrap items-center gap-2">
                {autoComplete && <Badge variant="secondary">Auto-completes</Badge>}
                {mapCount > 0 && (
                    <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        Shown on map{mapCount > 1 ? ` (${mapCount})` : ''}
                    </Badge>
                )}
                {step !== undefined && <Badge variant="outline">Step {step}</Badge>}
            </div>
        </div>
    );
}

function fetchConstraints(ri: RequiredItem): { label: string; value: string }[] {
    const constraints: { label: string; value: string }[] = [];

    if (ri.MinAcceptedItemHealth !== undefined) {
        constraints.push({ label: 'Min Durability', value: `${ri.MinAcceptedItemHealth}%` });
    }
    if (ri.MinAcceptedItemUses !== undefined) {
        constraints.push({ label: 'Min Uses', value: `${ri.MinAcceptedItemUses}` });
    }
    if (ri.MinAcceptedItemMass !== undefined) {
        constraints.push({ label: 'Min Mass', value: `${ri.MinAcceptedItemMass}` });
    }
    if (ri.MinAcceptedItemResourceRatio !== undefined) {
        constraints.push({ label: 'Min Resource', value: `${Math.round(ri.MinAcceptedItemResourceRatio * 100)}%` });
    }
    if (ri.MinAcceptedItemResourceAmount !== undefined) {
        constraints.push({ label: 'Min Resource Amount', value: `${ri.MinAcceptedItemResourceAmount}` });
    }
    if (ri.MinAcceptedCookLevel) {
        const range = ri.MaxAcceptedCookLevel ? ` – ${ri.MaxAcceptedCookLevel}` : '';
        constraints.push({ label: 'Cook Level', value: `${ri.MinAcceptedCookLevel}${range}` });
    }
    if (ri.MinAcceptedCookQuality) {
        constraints.push({ label: 'Min Cook Quality', value: ri.MinAcceptedCookQuality });
    }

    return constraints;
}

function FetchCard({
    condition,
    itemsOptions,
    step,
}: {
    condition: FetchCondition;
    itemsOptions: Option[];
    step?: number;
}) {
    return (
        <div className="rounded-lg border bg-card px-4 py-3 text-sm">
            <ConditionHeader condition={condition} step={step} />
            {condition.RequiredItems.map((ri, j) => {
                const constraints = fetchConstraints(ri);

                return (
                    <div key={j} className={j > 0 ? 'mt-3 border-t pt-3' : ''}>
                        <div className="mb-2 flex items-center gap-2">
                            <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span>
                                Bring{' '}
                                <span className="font-semibold text-yellow-400">
                                    {ri.RequiredNum}
                                    {ri.RandomAdditionalRequiredNum
                                        ? `–${ri.RequiredNum + ri.RandomAdditionalRequiredNum}`
                                        : ''}
                                </span>{' '}
                                of:
                            </span>
                        </div>
                        <ConditionList items={ri.AcceptedItems.map((item) => getItemName(item, itemsOptions))} />
                        {constraints.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                {constraints.map((constraint) => (
                                    <span key={constraint.label}>
                                        {constraint.label}: <span className="text-foreground">{constraint.value}</span>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
            {(condition.DisablePurchaseOfRequiredItems || condition.PlayerKeepsItems) && (
                <div className="mt-3 flex gap-2 border-t pt-3">
                    {condition.PlayerKeepsItems && <Badge variant="outline">Player keeps items</Badge>}
                    {condition.DisablePurchaseOfRequiredItems && <Badge variant="outline">Cannot be purchased</Badge>}
                </div>
            )}
        </div>
    );
}

function EliminationCard({
    condition,
    itemsOptions,
    step,
}: {
    condition: EliminationCondition;
    itemsOptions: Option[];
    step?: number;
}) {
    return (
        <div className="rounded-lg border bg-card px-4 py-3 text-sm">
            <ConditionHeader condition={condition} step={step} />
            <div className="mb-2 flex items-center gap-2">
                <Crosshair className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                    Kill <span className="font-semibold text-yellow-400">{condition.Amount}</span> of:
                </span>
            </div>
            <ConditionList items={condition.TargetCharacters} />
            {!!condition.AllowedWeapons?.length && (
                <div className="mt-3 border-t pt-3">
                    <div className="mb-1 text-xs text-muted-foreground">Allowed weapons:</div>
                    <ConditionList items={condition.AllowedWeapons.map((w) => getItemName(w, itemsOptions))} />
                </div>
            )}
        </div>
    );
}

function InteractionCard({ condition, step }: { condition: InteractionCondition; step?: number }) {
    return (
        <div className="rounded-lg border bg-card px-4 py-3 text-sm">
            <ConditionHeader condition={condition} step={step} />
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                    Interact with{' '}
                    <span className="font-semibold text-yellow-400">
                        {condition.MinNeeded === condition.MaxNeeded
                            ? condition.MinNeeded
                            : `${condition.MinNeeded}–${condition.MaxNeeded}`}
                    </span>{' '}
                    location{condition.MaxNeeded !== 1 ? 's' : ''}
                </span>
            </div>
            {(condition.SpawnOnlyNeeded || condition.WorldMarkerShowDistance !== undefined) && (
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {condition.SpawnOnlyNeeded && <span>Spawns only what&rsquo;s needed</span>}
                    {condition.WorldMarkerShowDistance !== undefined && (
                        <span>
                            Marker within:{' '}
                            <span className="text-foreground">{condition.WorldMarkerShowDistance} m</span>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export function ConditionSection({ conditions, itemsOptions }: { conditions: Condition[]; itemsOptions: Option[] }) {
    const isSequenced = conditions.some((cond) => cond.SequenceIndex > 0);
    const ordered = isSequenced ? [...conditions].sort((a, b) => a.SequenceIndex - b.SequenceIndex) : conditions;

    return (
        <section>
            <SectionHeader icon={Target} title="Conditions" />
            {ordered.length ? (
                <div className="flex flex-col gap-3">
                    {ordered.map((c, i) => {
                        const step = isSequenced ? c.SequenceIndex + 1 : undefined;

                        if (c.Type === 'Fetch') {
                            return <FetchCard key={i} condition={c} itemsOptions={itemsOptions} step={step} />;
                        }
                        if (c.Type === 'Elimination') {
                            return <EliminationCard key={i} condition={c} itemsOptions={itemsOptions} step={step} />;
                        }
                        if (c.Type === 'Interaction') {
                            return <InteractionCard key={i} condition={c} step={step} />;
                        }
                        return null;
                    })}
                </div>
            ) : (
                <div className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">No conditions.</div>
            )}
        </section>
    );
}
