import { ArrowLeftRight, Banknote, Coins, Gift, GraduationCap, type LucideIcon, Package, Star } from 'lucide-react';
import type { Reward } from '@/data/quests/quests.types.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';
import { SectionHeader } from './quest-section-header.tsx';

type RewardRowData = { key: string; icon: LucideIcon; label: string; value: string };

function RewardRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4 shrink-0" />
                {label}
            </span>
            <span className="text-right font-medium text-yellow-400">{value}</span>
        </div>
    );
}

function buildRewardRows(reward: Reward | undefined, itemsOptions: Option[]): RewardRowData[] {
    const rows: RewardRowData[] = [];

    if (reward?.CurrencyNormal) {
        rows.push({ key: 'cash', icon: Banknote, label: 'Cash', value: `${reward.CurrencyNormal.toLocaleString()} $` });
    }
    if (reward?.CurrencyGold) {
        rows.push({ key: 'gold', icon: Coins, label: 'Gold', value: `${reward.CurrencyGold}` });
    }
    if (reward?.Fame !== undefined) {
        rows.push({ key: 'fame', icon: Star, label: 'Fame', value: `${reward.Fame} FP` });
    }
    for (const skill of reward?.Skills ?? []) {
        rows.push({
            key: `skill-${skill.Skill}`,
            icon: GraduationCap,
            label: `${skill.Skill} XP`,
            value: `${skill.Experience.toLocaleString()} XP`,
        });
    }
    for (const item of reward?.RewardItems ?? []) {
        rows.push({ key: `item-${item}`, icon: Package, label: 'Item', value: getItemName(item, itemsOptions) });
    }
    for (const td of reward?.TradeDeals ?? []) {
        const itemName = getItemName(td.Item, itemsOptions);
        const quantity = td.Amount ? `${td.Amount}x ${itemName}` : itemName;

        const costParts: string[] = [];
        if (td.Price) costParts.push(`${td.Price.toLocaleString()} $`);
        if (td.Fame !== undefined) costParts.push(`${td.Fame} FP`);
        if (td.AllowExcluded) costParts.push('excluded allowed');
        const detail = costParts.length ? ` · ${costParts.join(' · ')}` : '';

        rows.push({
            key: `td-${td.Item}`,
            icon: ArrowLeftRight,
            label: 'Trade deal',
            value: `${quantity}${detail}`,
        });
    }

    return rows;
}

export function RewardSection({ reward, itemsOptions }: { reward: Reward | undefined; itemsOptions: Option[] }) {
    const rows = buildRewardRows(reward, itemsOptions);

    return (
        <section>
            <SectionHeader icon={Gift} title="Rewards" />
            {rows.length ? (
                <div className="divide-y rounded-lg border bg-card">
                    {rows.map((row) => (
                        <RewardRow key={row.key} icon={row.icon} label={row.label} value={row.value} />
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">No rewards.</div>
            )}
        </section>
    );
}
