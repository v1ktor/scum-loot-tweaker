import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import type { Option } from '@/pages/spawners/spawners.types.ts';
import { getItemName } from '@/utils/get-item-name.ts';
import type { Row } from './quest-rows.ts';
import { VariantList } from './quest-variant-list.tsx';

export const COLUMN_LABELS: Record<string, string> = {
    npc: 'NPC',
    title: 'Title',
    type: 'Type',
    conditions: 'Conditions',
    conditionExtra: 'Extra Info',
    money: 'Money',
    fp: 'FP',
    xp: 'XP',
    items: 'Items',
    tradeDeal: 'Trade Deal',
};

function sortHeader(label: string) {
    return ({
        column,
    }: {
        column: { toggleSorting: (asc: boolean) => void; getIsSorted: () => false | 'asc' | 'desc' };
    }) => (
        <Button
            variant="ghost"
            size="sm"
            className="-ml-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {label}
            <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
        </Button>
    );
}

export function makeColumns(showNpc: boolean, itemsOptions: Option[]): ColumnDef<Row>[] {
    const questCols: ColumnDef<Row>[] = [];

    if (showNpc) {
        questCols.push({
            id: 'npc',
            accessorFn: (row) => row.giver.name,
            header: sortHeader('NPC'),
            cell: ({ row }) => <Badge variant="secondary">{row.original.giver.name}</Badge>,
        });
    }

    questCols.push(
        {
            id: 'title',
            accessorFn: (row) => row.quest.Title,
            header: sortHeader('Title'),
            cell: ({ row }) => (
                <Link
                    to={`${NavigationPath.Quests}/${row.original.giver.npc}/${row.original.quest.id}`}
                    className="font-medium hover:text-primary hover:underline"
                >
                    {row.original.quest.Title}
                </Link>
            ),
        },
        {
            id: 'type',
            accessorFn: (row) => row.type,
            header: sortHeader('Type'),
            cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
            filterFn: (row, _id, value: string) => {
                if (value === 'Mix') return row.original.type === 'Mix';
                return row.original.quest.Conditions.some((c) => c.Type === value);
            },
        },
    );

    return [
        {
            id: 'quest-group',
            header: () => <Badge variant="secondary">Quest</Badge>,
            columns: questCols,
        },
        {
            id: 'conditions-group',
            header: () => <Badge variant="secondary">Conditions</Badge>,
            columns: [
                {
                    id: 'conditions',
                    accessorFn: (row) => row.conditionSummary,
                    header: sortHeader('Conditions'),
                    cell: ({ row }) => {
                        const conditions = row.original.quest.Conditions;
                        if (!conditions.length) return <span className="text-xs text-muted-foreground">—</span>;
                        return (
                            <div className="flex flex-col gap-0.5">
                                {conditions.flatMap((c, i) => {
                                    if (c.Type === 'Fetch') {
                                        return c.RequiredItems.map((ri, j) => (
                                            <span
                                                key={`${i}-${j}`}
                                                className="inline-flex flex-wrap items-baseline gap-1 text-xs text-muted-foreground"
                                            >
                                                <span className="text-orange-400">{ri.RequiredNum}x</span>
                                                <span>any of:</span>
                                                <span className="text-teal-400">
                                                    <VariantList
                                                        names={ri.AcceptedItems.map((i) =>
                                                            getItemName(i, itemsOptions),
                                                        )}
                                                    />
                                                </span>
                                            </span>
                                        ));
                                    }
                                    if (c.Type === 'Elimination') {
                                        return [
                                            <span
                                                key={i}
                                                className="inline-flex items-baseline gap-1 text-xs text-muted-foreground"
                                            >
                                                <span>Kill</span>
                                                <span className="text-orange-400">{c.Amount}x</span>
                                                <span className="text-teal-400">
                                                    <VariantList names={c.TargetCharacters} />
                                                </span>
                                            </span>,
                                        ];
                                    }
                                    return [
                                        <span key={i} className="text-xs text-muted-foreground">
                                            Interaction data is not available yet
                                        </span>,
                                    ];
                                })}
                            </div>
                        );
                    },
                },
                {
                    id: 'conditionExtra',
                    accessorFn: (row) => row.conditionExtraInfo,
                    header: sortHeader('Extra Info'),
                    cell: ({ row }) => (
                        <span className="text-xs text-muted-foreground">{row.original.conditionExtraInfo || '—'}</span>
                    ),
                },
            ],
        },
        {
            id: 'rewards-group',
            header: () => <Badge variant="secondary">Rewards</Badge>,
            columns: [
                {
                    id: 'money',
                    accessorFn: (row) => row.quest.RewardPool[0]?.CurrencyNormal ?? 0,
                    header: sortHeader('Money'),
                    cell: ({ row }) => <span className="text-xs text-green-500">{row.original.moneySummary}</span>,
                },
                {
                    id: 'fp',
                    accessorFn: (row) => row.quest.RewardPool[0]?.Fame ?? 0,
                    header: sortHeader('FP'),
                    cell: ({ row }) => <span className="text-xs text-green-500">{row.original.fpSummary}</span>,
                },
                {
                    id: 'xp',
                    accessorFn: (row) => row.xpSummary,
                    header: sortHeader('XP'),
                    cell: ({ row }) =>
                        row.original.xpSummary === '—' ? (
                            <span className="text-xs text-muted-foreground">—</span>
                        ) : (
                            <span className="text-xs text-green-500" style={{ whiteSpace: 'pre-line' }}>
                                {row.original.xpSummary}
                            </span>
                        ),
                },
                {
                    id: 'items',
                    accessorFn: (row) => row.itemsSummary,
                    header: sortHeader('Items'),
                    cell: ({ row }) =>
                        row.original.itemsSummary === '—' ? (
                            <span className="text-xs text-muted-foreground">—</span>
                        ) : (
                            <span className="text-xs text-green-500" style={{ whiteSpace: 'pre-line' }}>
                                {row.original.itemsSummary}
                            </span>
                        ),
                },
                {
                    id: 'tradeDeal',
                    accessorFn: (row) => row.tradeDealSummary,
                    header: sortHeader('Trade Deal'),
                    cell: ({ row }) => {
                        const deals = row.original.quest.RewardPool[0]?.TradeDeal;
                        if (!deals?.length) return <span className="text-xs text-muted-foreground">—</span>;
                        return (
                            <div className="flex flex-col gap-0.5">
                                {deals.map((td, i) => {
                                    const costParts: string[] = [];
                                    if (td.Price) costParts.push(`${td.Price.toLocaleString()} $`);
                                    if (td.Fame !== undefined) costParts.push(`${td.Fame} FP`);
                                    return (
                                        <span key={i} className="text-xs">
                                            {td.Amount && (
                                                <>
                                                    <span className="text-orange-400">{td.Amount}x</span>
                                                    <span className="text-muted-foreground"> of </span>
                                                </>
                                            )}
                                            <span className="text-green-500">{getItemName(td.Item, itemsOptions)}</span>
                                            {costParts.length > 0 && (
                                                <>
                                                    <span className="text-muted-foreground"> at </span>
                                                    {costParts.map((p, j) => (
                                                        <span key={j}>
                                                            {j > 0 && (
                                                                <span className="text-muted-foreground"> and </span>
                                                            )}
                                                            <span className="text-green-500">{p}</span>
                                                        </span>
                                                    ))}
                                                </>
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    },
                },
            ],
        },
    ];
}
