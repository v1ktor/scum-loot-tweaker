import { Plus, Trash2, TriangleAlert } from 'lucide-react';
import { FreeTextCombobox } from '@/components/free-text-combobox/free-text-combobox.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import type { Reward, SkillReward, TradeDeal } from '@/data/quests/quests.types.ts';
import { removeAt, updateAt, withoutIndices } from '@/lib/array.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import type { QuestError, RewardTab } from '../quest-validation.ts';
import { EditorDataTable } from './editor-data-table.tsx';
import { Field, NumberInput, tabErrorClass } from './quest-editor-fields.tsx';
import { type SkillTableMeta, skillColumns } from './skill-reward-columns.tsx';
import { type TradeDealTableMeta, tradeDealColumns } from './trade-deal-columns.tsx';

export function countRewards(reward: Reward | undefined): number {
    if (!reward) return 0;

    let count = 0;
    if (reward.CurrencyNormal !== undefined) count += 1;
    if (reward.CurrencyGold !== undefined) count += 1;
    if (reward.Fame !== undefined) count += 1;

    count += reward.RewardItems?.filter((item) => item.trim() !== '').length ?? 0;
    count += reward.Skills?.filter((skill) => skill.Skill.trim() !== '').length ?? 0;
    count += reward.TradeDeals?.filter((deal) => deal.Item.trim() !== '').length ?? 0;

    return count;
}

function CurrencyRewards({ reward, onChange }: { reward: Reward; onChange: (patch: Partial<Reward>) => void }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Cash ($)">
                <NumberInput
                    value={reward.CurrencyNormal}
                    onChange={(CurrencyNormal) => onChange({ CurrencyNormal })}
                />
            </Field>
            <Field label="Gold">
                <NumberInput value={reward.CurrencyGold} onChange={(CurrencyGold) => onChange({ CurrencyGold })} />
            </Field>
            <Field label="Fame (FP)">
                <NumberInput value={reward.Fame} onChange={(Fame) => onChange({ Fame })} />
            </Field>
        </div>
    );
}

function SkillRewards({ skills, onChange }: { skills: SkillReward[]; onChange: (skills: SkillReward[]) => void }) {
    return (
        <EditorDataTable
            title="Skill XP"
            addLabel="Add skill"
            emptyText="No skills."
            columns={skillColumns}
            data={skills}
            meta={
                {
                    onUpdate: (index, next) => onChange(updateAt(skills, index, next)),
                    onRemove: (index) => onChange(withoutIndices(skills, [index])),
                } satisfies SkillTableMeta
            }
            onAdd={() => onChange([...skills, { Skill: '' as SkillReward['Skill'], Experience: 0 }])}
            onDeleteIndices={(indices) => onChange(withoutIndices(skills, indices))}
        />
    );
}

function ItemRewards({
    items,
    itemsOptions,
    onChange,
}: {
    items: string[];
    itemsOptions: Option[];
    onChange: (items: string[]) => void;
}) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Items</span>
                <Button variant="outline" size="sm" onClick={() => onChange([...items, ''])}>
                    <Plus />
                    Add item
                </Button>
            </div>
            {items.length ? (
                <div className="flex flex-col gap-2">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="flex-1">
                                <FreeTextCombobox
                                    value={item}
                                    options={itemsOptions}
                                    placeholder="Select item"
                                    onChange={(next) => onChange(updateAt(items, i, next))}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Remove item"
                                onClick={() => onChange(removeAt(items, i))}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No items.</p>
            )}
        </div>
    );
}

function TradeDealRewards({
    tradeDeals,
    itemsOptions,
    onChange,
}: {
    tradeDeals: TradeDeal[];
    itemsOptions: Option[];
    onChange: (tradeDeals: TradeDeal[]) => void;
}) {
    return (
        <EditorDataTable
            title="Trade deals"
            addLabel="Add trade deal"
            emptyText="No trade deals."
            columns={tradeDealColumns}
            data={tradeDeals}
            meta={
                {
                    itemsOptions,
                    onUpdate: (index, next) => onChange(updateAt(tradeDeals, index, next)),
                    onRemove: (index) => onChange(withoutIndices(tradeDeals, [index])),
                } satisfies TradeDealTableMeta
            }
            onAdd={() => onChange([...tradeDeals, { Item: '' }])}
            onDeleteIndices={(indices) => onChange(withoutIndices(tradeDeals, indices))}
        />
    );
}

export function QuestRewardEditor({
    reward,
    itemsOptions,
    onChange,
    errors = [],
}: {
    reward: Reward | undefined;
    itemsOptions: Option[];
    onChange: (reward: Reward) => void;
    errors?: QuestError[];
}) {
    const value = reward ?? {};
    const patch = (next: Partial<Reward>) => onChange({ ...value, ...next });

    const skills = value.Skills ?? [];
    const tradeDeals = value.TradeDeals ?? [];
    const items = value.RewardItems ?? [];

    const skillCount = skills.filter((skill) => skill.Skill.trim() !== '').length;
    const itemCount = items.filter((item) => item.trim() !== '').length;
    const dealCount = tradeDeals.filter((deal) => deal.Item.trim() !== '').length;
    const currencyCount =
        (value.CurrencyNormal !== undefined ? 1 : 0) +
        (value.CurrencyGold !== undefined ? 1 : 0) +
        (value.Fame !== undefined ? 1 : 0);

    const blueprints = (value.Blueprints ?? []).filter((blueprint) => blueprint.trim() !== '');

    const tabErrorCount = (tab: RewardTab) => errors.filter((e) => e.rewardTab === tab).length;
    const countBadge = (tab: RewardTab, count: number) =>
        tabErrorCount(tab) > 0 ? (
            <Badge variant="destructive">{tabErrorCount(tab)}</Badge>
        ) : (
            <Badge variant="secondary">{count}</Badge>
        );

    return (
        <Tabs defaultValue="currency">
            {blueprints.length > 0 && (
                <div className="mb-4 flex items-start gap-3 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
                    <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                    <p className="text-sm text-orange-400">
                        The quest has {blueprints.length > 1 ? 'reward blueprints' : 'a reward blueprint'} (
                        {blueprints.join(', ')}) and {blueprints.length > 1 ? 'they' : 'it'} will be ignored as there is
                        no official information on how to trigger {blueprints.length > 1 ? 'them' : 'it'} in game
                    </p>
                </div>
            )}
            <TabsList>
                <TabsTrigger value="currency" className={tabErrorClass(tabErrorCount('currency') > 0)}>
                    Currency {countBadge('currency', currencyCount)}
                </TabsTrigger>
                <TabsTrigger value="skills" className={tabErrorClass(tabErrorCount('skills') > 0)}>
                    Skills {countBadge('skills', skillCount)}
                </TabsTrigger>
                <TabsTrigger value="items" className={tabErrorClass(tabErrorCount('items') > 0)}>
                    Items {countBadge('items', itemCount)}
                </TabsTrigger>
                <TabsTrigger value="trade" className={tabErrorClass(tabErrorCount('trade') > 0)}>
                    Trade deals {countBadge('trade', dealCount)}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="currency" className="mt-4 rounded-lg border bg-card p-4">
                <CurrencyRewards reward={value} onChange={patch} />
            </TabsContent>
            <TabsContent value="skills" className="mt-4 rounded-lg border bg-card p-4">
                <SkillRewards skills={skills} onChange={(Skills) => patch({ Skills })} />
            </TabsContent>
            <TabsContent value="items" className="mt-4 rounded-lg border bg-card p-4">
                <ItemRewards
                    items={items}
                    itemsOptions={itemsOptions}
                    onChange={(RewardItems) => patch({ RewardItems })}
                />
            </TabsContent>
            <TabsContent value="trade" className="mt-4 rounded-lg border bg-card p-4">
                <TradeDealRewards
                    tradeDeals={tradeDeals}
                    itemsOptions={itemsOptions}
                    onChange={(TradeDeals) => patch({ TradeDeals })}
                />
            </TabsContent>
        </Tabs>
    );
}
