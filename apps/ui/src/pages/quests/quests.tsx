import { Info, X as XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { QUEST_GIVERS } from '@/data/quests/index.ts';
import { useItemsOptions } from '@/hooks/use-items-options.ts';
import { QuestDataTable } from './quest-data-table.tsx';
import { buildAllRows } from './quest-rows.ts';

export function Quests() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { itemsOptions } = useItemsOptions();

    const activeGiver = searchParams.get('npc') ?? QUEST_GIVERS[0].npc;
    const activeTier = searchParams.get('tier') ?? '1';

    const allRows = useMemo(() => buildAllRows(itemsOptions), [itemsOptions]);

    function setGiver(npc: string) {
        setSearchParams({ npc, tier: '1' });
    }

    function setTier(tier: string) {
        setSearchParams({ npc: activeGiver, tier });
    }

    return (
        <div className="flex flex-1 flex-col gap-4 px-6 py-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Vanilla Quests</h1>

            <div className="flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-400">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>
                    Conditions and Rewards may not be fully up to date. Found an inconsistency? Report it on{' '}
                    <a
                        href="https://discord.gg/8T6q6Xf945"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-amber-300"
                    >
                        Discord
                    </a>{' '}
                    or{' '}
                    <a
                        href="https://github.com/v1ktor/scum-loot-tweaker"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-amber-300"
                    >
                        GitHub
                    </a>
                    .
                </span>
            </div>

            <div className="relative max-w-sm">
                <Input
                    placeholder="Search title, type, conditions, reward..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className={globalFilter ? 'pr-8' : ''}
                />
                {globalFilter && (
                    <button
                        onClick={() => setGlobalFilter('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-yellow-400"
                    >
                        <XIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            {globalFilter ? (
                <QuestDataTable
                    rows={allRows}
                    globalFilter={globalFilter}
                    onGlobalFilterChange={setGlobalFilter}
                    itemsOptions={itemsOptions}
                    showNpc
                />
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

                                {([1, 2, 3] as const).map((tier) => (
                                    <TabsContent key={tier} value={String(tier)} className="mt-4">
                                        <QuestDataTable
                                            rows={allRows.filter((r) => r.giver === giver && r.quest.Tier === tier)}
                                            globalFilter=""
                                            onGlobalFilterChange={setGlobalFilter}
                                            itemsOptions={itemsOptions}
                                        />
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
}
