import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import { findQuest, getQuestType } from '@/data/quests/index.ts';
import type {
    Condition,
    EliminationCondition,
    FetchCondition,
    InteractionCondition,
    Reward,
} from '@/data/quests/quests.types.ts';

function RewardSection({ rewards }: { rewards: Reward[] }) {
    if (!rewards.length) return null;
    const r = rewards[0];
    return (
        <section>
            <h2 className="mb-3 text-lg font-semibold">Reward</h2>
            <div className="flex flex-wrap gap-2">
                {!!r.CurrencyNormal && (
                    <div className="rounded-md border bg-card px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Cash </span>
                        <span className="text-yellow-400">{r.CurrencyNormal.toLocaleString()} $</span>
                    </div>
                )}
                {!!r.CurrencyGold && (
                    <div className="rounded-md border bg-card px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Gold </span>
                        <span className="text-yellow-400">{r.CurrencyGold}</span>
                    </div>
                )}
                {r.Fame !== undefined && (
                    <div className="rounded-md border bg-card px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Fame </span>
                        <span className="text-yellow-400">{r.Fame} FP</span>
                    </div>
                )}
                {r.Skills?.map((s) => (
                    <div key={s.Skill} className="rounded-md border bg-card px-3 py-2 text-sm">
                        <span className="text-muted-foreground">{s.Skill} </span>
                        <span className="text-yellow-400">{s.Experience} XP</span>
                    </div>
                ))}
                {r.Items?.map((item) => (
                    <div key={item} className="rounded-md border bg-card px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Item: </span>
                        <span className="text-blue-400">{item}</span>
                    </div>
                ))}
                {r.TradeDeal?.map((td) => (
                    <div key={td.Item} className="rounded-md border bg-card px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Trade Deal: </span>
                        <span className="text-blue-400">{td.Item}</span>
                        {!!td.Amount && <span className="text-muted-foreground"> · {td.Amount}x</span>}
                        {!!td.Price && <span className="text-muted-foreground"> · {td.Price.toLocaleString()} $</span>}
                        {td.Fame !== undefined && <span className="text-muted-foreground"> · {td.Fame} FP</span>}
                    </div>
                ))}
            </div>
        </section>
    );
}

function ConditionSection({ conditions }: { conditions: Condition[] }) {
    if (!conditions.length) return null;
    return (
        <section>
            <h2 className="mb-3 text-lg font-semibold">Conditions</h2>
            <div className="flex flex-col gap-3">
                {conditions.map((c, i) => {
                    if (c.Type === 'Fetch') {
                        const fc = c as FetchCondition;
                        return (
                            <div key={i} className="rounded-md border bg-card px-4 py-3 text-sm">
                                {fc.RequiredItems.map((ri, j) => (
                                    <div key={j} className={j > 0 ? 'mt-3 border-t pt-3' : ''}>
                                        <div className="mb-1">
                                            Bring{' '}
                                            <span className="text-yellow-400">
                                                {ri.RequiredNum}
                                                {ri.RandomAdditionalRequiredNum
                                                    ? `–${ri.RequiredNum + ri.RandomAdditionalRequiredNum}`
                                                    : ''}
                                            </span>{' '}
                                            of:
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {ri.AcceptedItems.map((item) => (
                                                <Badge key={item} variant="secondary">
                                                    {item}
                                                </Badge>
                                            ))}
                                        </div>
                                        {(ri.MinAcceptedItemHealth !== undefined ||
                                            ri.MinAcceptedItemUses !== undefined ||
                                            ri.MinAcceptedItemMass !== undefined ||
                                            ri.MinAcceptedCookLevel !== undefined ||
                                            ri.MinAcceptedCookQuality !== undefined) && (
                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                {ri.MinAcceptedItemHealth !== undefined && (
                                                    <span>
                                                        Min Durability:{' '}
                                                        <span className="text-foreground">
                                                            {ri.MinAcceptedItemHealth}%
                                                        </span>
                                                    </span>
                                                )}
                                                {ri.MinAcceptedItemUses !== undefined && (
                                                    <span>
                                                        Min Uses:{' '}
                                                        <span className="text-foreground">
                                                            {ri.MinAcceptedItemUses}
                                                        </span>
                                                    </span>
                                                )}
                                                {ri.MinAcceptedItemMass !== undefined && (
                                                    <span>
                                                        Min Mass:{' '}
                                                        <span className="text-foreground">
                                                            {ri.MinAcceptedItemMass}
                                                        </span>
                                                    </span>
                                                )}
                                                {ri.MinAcceptedCookLevel && (
                                                    <span>
                                                        Cook Level:{' '}
                                                        <span className="text-foreground">
                                                            {ri.MinAcceptedCookLevel}
                                                            {ri.MaxAcceptedCookLevel && ` – ${ri.MaxAcceptedCookLevel}`}
                                                        </span>
                                                    </span>
                                                )}
                                                {ri.MinAcceptedCookQuality && (
                                                    <span>
                                                        Min Cook Quality:{' '}
                                                        <span className="text-foreground">
                                                            {ri.MinAcceptedCookQuality}
                                                        </span>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {(fc.DisablePurchaseOfRequiredItems || fc.PlayerKeepsItems) && (
                                    <div className="mt-3 flex gap-2 border-t pt-3">
                                        {fc.PlayerKeepsItems && <Badge variant="outline">Player keeps items</Badge>}
                                        {fc.DisablePurchaseOfRequiredItems && (
                                            <Badge variant="outline">Cannot be purchased</Badge>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    if (c.Type === 'Elimination') {
                        const ec = c as EliminationCondition;
                        return (
                            <div key={i} className="rounded-md border bg-card px-4 py-3 text-sm">
                                <div className="mb-2">
                                    Kill <span className="text-yellow-400">{ec.Amount}</span> of:
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {ec.TargetCharacters.map((t) => (
                                        <Badge key={t} variant="secondary">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                                {!!ec.AllowedWeapons?.length && (
                                    <div className="mt-3 border-t pt-3">
                                        <div className="mb-1 text-xs text-muted-foreground">Allowed weapons:</div>
                                        <div className="flex flex-wrap gap-1">
                                            {ec.AllowedWeapons.map((w) => (
                                                <Badge key={w} variant="outline">
                                                    {w}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }
                    if (c.Type === 'Interaction') {
                        const ic = c as InteractionCondition;
                        return (
                            <div key={i} className="rounded-md border bg-card px-4 py-3 text-sm">
                                <div>
                                    Interact with{' '}
                                    <span className="text-yellow-400">
                                        {ic.MinNeeded === ic.MaxNeeded
                                            ? ic.MinNeeded
                                            : `${ic.MinNeeded}–${ic.MaxNeeded}`}
                                    </span>{' '}
                                    location{ic.MaxNeeded !== 1 ? 's' : ''}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </section>
    );
}

export function QuestDetail() {
    const { giverId, questId } = useParams<{ giverId: string; questId: string }>();
    const result = findQuest(giverId ?? '', questId ?? '');

    if (!result) {
        return (
            <div className="flex flex-1 flex-col gap-4 px-6 py-10">
                <p className="text-muted-foreground">Quest not found.</p>
            </div>
        );
    }

    const { quest, giver } = result;
    const questType = getQuestType(quest.id);

    return (
        <div className="flex flex-1 flex-col gap-6 px-6 py-10">
            <div>
                <Link
                    to={`${NavigationPath.Quests}?npc=${giver.npc}&tier=${quest.Tier}`}
                    className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to quests
                </Link>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{quest.Title}</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{giver.name}</Badge>
                        <Badge variant="secondary">Tier {quest.Tier}</Badge>
                        <Badge variant="outline">{questType}</Badge>
                    </div>
                </div>

                {quest.TimeLimitHours !== undefined && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        Time limit: <span className="text-foreground">{quest.TimeLimitHours}h</span>
                    </p>
                )}

                {quest.Description && (
                    <p className="mt-4 text-muted-foreground italic">&ldquo;{quest.Description}&rdquo;</p>
                )}
            </div>

            <ConditionSection conditions={quest.Conditions} />
            <RewardSection rewards={quest.RewardPool} />
        </div>
    );
}
