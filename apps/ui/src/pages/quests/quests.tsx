import { X as XIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import type { QuestGiverConfig } from '@/data/quests/index.ts';
import { getQuestType, QUEST_GIVERS } from '@/data/quests/index.ts';
import type {
    Condition,
    EliminationCondition,
    FetchCondition,
    Quest,
    Reward,
    TradeDeal,
} from '@/data/quests/quests.types.ts';

function summarizeRewards(rewards: Reward[]): { main: string; tradeDeals: TradeDeal[]; items: string[] } {
    if (rewards.length === 0) return { main: '', tradeDeals: [], items: [] };

    const r = rewards[0];
    const mainParts: string[] = [];

    if (r.CurrencyNormal) mainParts.push(`${r.CurrencyNormal.toLocaleString()} $`);
    if (r.CurrencyGold) mainParts.push(`${r.CurrencyGold} Gold`);
    if (r.Fame) mainParts.push(`${r.Fame} FP`);
    if (r.Skills?.length) mainParts.push(r.Skills.map((s) => `${s.Skill} XP`).join(', '));

    return { main: mainParts.join(' · '), tradeDeals: r.TradeDeal ?? [], items: r.Items ?? [] };
}

function ConditionItems({ conditions }: { conditions: Condition[] }) {
    return (
        <ul className="flex flex-col gap-0.5">
            {conditions.map((c, ci) => {
                if (c.Type === 'Fetch') {
                    const fc = c as FetchCondition;
                    return fc.RequiredItems.flatMap((ri, ri_i) => {
                        const rows = [
                            <li
                                key={`${ci}-${ri_i}`}
                                className="text-xs text-muted-foreground before:mr-1.5 before:content-['•']"
                            >
                                <span className="text-yellow-400">{ri.RequiredNum}</span> of any of these items:{' '}
                                <span className="text-blue-400">{ri.AcceptedItems.join(', ')}</span>
                            </li>,
                        ];
                        if (ri.MinAcceptedItemHealth !== undefined) {
                            rows.push(
                                <li
                                    key={`${ci}-${ri_i}-health`}
                                    className="text-xs text-muted-foreground before:mr-1.5 before:content-['•']"
                                >
                                    Min Durability: {ri.MinAcceptedItemHealth}%
                                </li>,
                            );
                        }
                        return rows;
                    });
                }
                if (c.Type === 'Elimination') {
                    const ec = c as EliminationCondition;
                    return (
                        <li key={ci} className="text-xs text-muted-foreground before:mr-1.5 before:content-['•']">
                            Kill <span className="text-yellow-400">{ec.Amount}</span> of:{' '}
                            <span className="text-blue-400">{ec.TargetCharacters.join(', ')}</span>
                        </li>
                    );
                }
                return null;
            })}
        </ul>
    );
}

function QuestListItem({ quest, giver, showMeta }: { quest: Quest; giver: QuestGiverConfig; showMeta?: boolean }) {
    const { main: rewardMain, tradeDeals: rewardTradeDeals, items: rewardItems } = summarizeRewards(quest.RewardPool);

    return (
        <Link
            to={`${NavigationPath.Quests}/${giver.npc}/${quest.id}`}
            className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 transition-colors hover:border-primary/30"
        >
            <div className="flex flex-col gap-1">
                <span className="font-medium">{quest.Title}</span>
                {!!quest.Conditions.length && <ConditionItems conditions={quest.Conditions} />}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
                <div className="flex items-center gap-2">
                    {showMeta && <Badge variant="secondary">{giver.name}</Badge>}
                    {showMeta && <Badge variant="secondary">Tier {quest.Tier}</Badge>}
                    <Badge variant="outline">{getQuestType(quest.id)}</Badge>
                </div>
                {rewardMain && <span className="text-xs text-green-500">{rewardMain}</span>}
                {!!rewardItems.length && (
                    <span className="text-xs text-muted-foreground">
                        Items: <span className="text-green-500">{rewardItems.join(', ')}</span>
                    </span>
                )}
                {rewardTradeDeals.map((td, i) => (
                    <span key={i} className="text-xs text-muted-foreground">
                        Trade Deal: <span className="text-green-500">{td.Item}</span>
                        {!!td.Amount && (
                            <>
                                {' '}
                                · <span className="text-green-500">{td.Amount}x</span>
                            </>
                        )}
                        {!!td.Price && (
                            <>
                                {' '}
                                · <span className="text-green-500">{td.Price.toLocaleString()} $</span>
                            </>
                        )}
                        {td.Fame !== undefined && (
                            <>
                                {' '}
                                · <span className="text-green-500">{td.Fame} FP</span>
                            </>
                        )}
                    </span>
                ))}
            </div>
        </Link>
    );
}

export function Quests() {
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const activeGiver = searchParams.get('npc') ?? 'HunterTrader';
    const activeTier = searchParams.get('tier') ?? '1';

    function setGiver(giverId: string) {
        setSearchParams({ npc: giverId, tier: '1' });
    }

    function setTier(tier: string) {
        setSearchParams({ npc: activeGiver, tier });
    }

    const query = search.trim().toLowerCase();

    const searchResults = query
        ? QUEST_GIVERS.flatMap((giver) =>
              giver.quests.filter((q) => q.Title.toLowerCase().includes(query)).map((q) => ({ quest: q, giver })),
          )
        : [];

    return (
        <div className="flex flex-1 flex-col gap-4 px-6 py-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Vanilla Quests</h1>

            <div className="relative max-w-sm">
                <Input
                    placeholder="Search quests..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={search ? 'pr-8' : ''}
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-yellow-400"
                    >
                        <XIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            {query ? (
                <div className="flex flex-col gap-1">
                    {searchResults.length === 0 ? (
                        <p className="py-6 text-center text-muted-foreground">No quests found.</p>
                    ) : (
                        searchResults.map(({ quest, giver }) => (
                            <QuestListItem key={quest.id} quest={quest} giver={giver} showMeta />
                        ))
                    )}
                </div>
            ) : (
                <Tabs value={activeGiver} onValueChange={setGiver}>
                    <TabsList>
                        {QUEST_GIVERS.map((giver) => (
                            <TabsTrigger key={giver.npc} value={giver.npc}>
                                {giver.name}
                                <Badge variant="secondary">{giver.quests.length}</Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {QUEST_GIVERS.map((giver) => (
                        <TabsContent key={giver.npc} value={giver.npc} className="mt-4">
                            {giver.npc !== 'HunterTrader' ? (
                                <p className="py-6 text-center text-muted-foreground">Coming soon!</p>
                            ) : (
                                <Tabs value={activeTier} onValueChange={setTier}>
                                    <TabsList>
                                        {([1, 2, 3] as const).map((tier) => {
                                            const count = giver.quests.filter((q) => q.Tier === tier).length;
                                            return (
                                                <TabsTrigger key={tier} value={String(tier)} disabled={count === 0}>
                                                    Tier {tier}
                                                    <Badge variant="secondary">{count}</Badge>
                                                </TabsTrigger>
                                            );
                                        })}
                                    </TabsList>

                                    {([1, 2, 3] as const).map((tier) => {
                                        const tierQuests = giver.quests.filter((q) => q.Tier === tier);
                                        return (
                                            <TabsContent key={tier} value={String(tier)} className="mt-2">
                                                <div className="flex flex-col gap-1">
                                                    {tierQuests.map((quest) => (
                                                        <QuestListItem key={quest.id} quest={quest} giver={giver} />
                                                    ))}
                                                </div>
                                            </TabsContent>
                                        );
                                    })}
                                </Tabs>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
}
