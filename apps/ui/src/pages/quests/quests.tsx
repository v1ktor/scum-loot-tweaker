import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, SlidersHorizontal, X as XIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import type { QuestGiverConfig } from '@/data/quests/index.ts';
import { getQuestType, QUEST_GIVERS } from '@/data/quests/index.ts';
import type { Condition, EliminationCondition, FetchCondition, Quest, QuestType } from '@/data/quests/quests.types.ts';

type Row = {
    quest: Quest;
    giver: QuestGiverConfig;
    type: QuestType;
    moneySummary: string;
    fpSummary: string;
    xpSummary: string;
    itemsSummary: string;
    tradeDealSummary: string;
    conditionSummary: string;
    conditionExtraInfo: string;
};

const QUEST_TYPES: QuestType[] = ['Fetch', 'Elimination', 'Interaction'];

const COLUMN_LABELS: Record<string, string> = {
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

function summarizeConditions(conditions: Condition[]): string {
    return conditions
        .map((c) => {
            if (c.Type === 'Fetch') {
                const fc = c as FetchCondition;
                return fc.RequiredItems.map((ri) => `${ri.RequiredNum}x any of: ${ri.AcceptedItems.join(', ')}`).join(
                    ' + ',
                );
            }
            if (c.Type === 'Elimination') {
                const ec = c as EliminationCondition;
                return `Kill ${ec.Amount}x ${ec.TargetCharacters.join(', ')}`;
            }
            return 'Interaction';
        })
        .join(' + ');
}

function conditionExtraInfo(conditions: Condition[]): string {
    const parts: string[] = [];
    for (const c of conditions) {
        if (c.Type === 'Fetch') {
            const fc = c as FetchCondition;
            for (const ri of fc.RequiredItems) {
                if (ri.MinAcceptedItemHealth !== undefined) {
                    parts.push(`Min durability: ${ri.MinAcceptedItemHealth}%`);
                }
            }
        }
    }
    return parts.join(' · ');
}

function summarizeMoney(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';
    const r = quest.RewardPool[0];
    const parts: string[] = [];
    if (r.CurrencyNormal) parts.push(`${r.CurrencyNormal.toLocaleString()} $`);
    if (r.CurrencyGold) parts.push(`${r.CurrencyGold} Gold`);
    return parts.join(' · ') || '—';
}

function summarizeFame(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';
    const r = quest.RewardPool[0];
    return r.Fame ? `${r.Fame} FP` : '—';
}

function summarizeXp(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';
    const skills = quest.RewardPool[0].Skills;
    if (!skills?.length) return '—';
    return skills.map((s) => `${s.Skill} XP`).join('\n');
}

function summarizeItems(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';
    const items = quest.RewardPool[0].Items;
    if (!items?.length) return '—';
    return items.join('\n');
}

function summarizeTradeDeal(quest: Quest): string {
    if (!quest.RewardPool.length) return '—';
    const deals = quest.RewardPool[0].TradeDeal;
    if (!deals?.length) return '—';
    return deals
        .map((td) => {
            const quantity = td.Amount ? `${td.Amount}x of ${td.Item}` : td.Item;
            const costParts: string[] = [];
            if (td.Price) costParts.push(`${td.Price.toLocaleString()} $`);
            if (td.Fame !== undefined) costParts.push(`${td.Fame} FP`);
            const cost = costParts.join(' and ');
            return cost ? `${quantity} at ${cost}` : quantity;
        })
        .join('\n');
}

function buildRows(giver: QuestGiverConfig, tier: number): Row[] {
    return giver.quests
        .filter((q) => q.Tier === tier)
        .map((quest) => ({
            quest,
            giver,
            type: getQuestType(quest.id),
            moneySummary: summarizeMoney(quest),
            fpSummary: summarizeFame(quest),
            xpSummary: summarizeXp(quest),
            itemsSummary: summarizeItems(quest),
            tradeDealSummary: summarizeTradeDeal(quest),
            conditionSummary: summarizeConditions(quest.Conditions),
            conditionExtraInfo: conditionExtraInfo(quest.Conditions),
        }));
}

const ALL_ROWS: Row[] = QUEST_GIVERS.flatMap((giver) =>
    giver.quests.map((quest) => ({
        quest,
        giver,
        type: getQuestType(quest.id),
        moneySummary: summarizeMoney(quest),
        fpSummary: summarizeFame(quest),
        xpSummary: summarizeXp(quest),
        itemsSummary: summarizeItems(quest),
        tradeDealSummary: summarizeTradeDeal(quest),
        conditionSummary: summarizeConditions(quest.Conditions),
        conditionExtraInfo: conditionExtraInfo(quest.Conditions),
    })),
);

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

function makeColumns(showNpc: boolean): ColumnDef<Row>[] {
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
            filterFn: (row, _id, value: string) => row.original.type === value,
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
                                        const fc = c as FetchCondition;
                                        return fc.RequiredItems.map((ri, j) => (
                                            <span
                                                key={`${i}-${j}`}
                                                className="inline-flex flex-wrap items-baseline gap-1 text-xs text-muted-foreground"
                                            >
                                                <span className="text-orange-400">{ri.RequiredNum}x</span>
                                                <span>any of:</span>
                                                <span className="text-teal-400">{ri.AcceptedItems.join(', ')}</span>
                                            </span>
                                        ));
                                    }
                                    if (c.Type === 'Elimination') {
                                        const ec = c as EliminationCondition;
                                        return [
                                            <span
                                                key={i}
                                                className="inline-flex items-baseline gap-1 text-xs text-muted-foreground"
                                            >
                                                <span>Kill</span>
                                                <span className="text-orange-400">{ec.Amount}x</span>
                                                <span className="text-teal-400">{ec.TargetCharacters.join(', ')}</span>
                                            </span>,
                                        ];
                                    }
                                    return [
                                        <span key={i} className="text-xs text-muted-foreground">
                                            Interaction
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
                                            <span className="text-green-500">{td.Item}</span>
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

function QuestDataTable({
    rows,
    globalFilter,
    onGlobalFilterChange,
    showNpc = false,
}: {
    rows: Row[];
    globalFilter: string;
    onGlobalFilterChange: (v: string) => void;
    showNpc?: boolean;
}) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [localFilter, setLocalFilter] = useState('');

    const columns = makeColumns(showNpc);

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange,
        globalFilterFn: (row, _columnId, value: string) => {
            const q = value.toLowerCase();
            return (
                row.original.quest.Title.toLowerCase().includes(q) ||
                row.original.type.toLowerCase().includes(q) ||
                row.original.conditionSummary.toLowerCase().includes(q) ||
                row.original.moneySummary.toLowerCase().includes(q) ||
                row.original.fpSummary.toLowerCase().includes(q) ||
                row.original.xpSummary.toLowerCase().includes(q) ||
                row.original.itemsSummary.toLowerCase().includes(q) ||
                row.original.tradeDealSummary.toLowerCase().includes(q)
            );
        },
        state: { sorting, columnFilters, columnVisibility, globalFilter: globalFilter || localFilter },
    });

    const typeFilter = (table.getColumn('type')?.getFilterValue() as string) ?? '';

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                    {QUEST_TYPES.map((type) => (
                        <Button
                            key={type}
                            variant={typeFilter === type ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => table.getColumn('type')?.setFilterValue(typeFilter === type ? '' : type)}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Filter..."
                        value={localFilter}
                        onChange={(e) => setLocalFilter(e.target.value)}
                        className="h-8 w-48"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1.5">
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table.getAllLeafColumns().map((col) => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    checked={col.getIsVisible()}
                                    onCheckedChange={(value) => col.toggleVisibility(value)}
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {COLUMN_LABELS[col.id] ?? col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="max-w-full rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((h) => (
                                    <TableHead key={h.id} colSpan={h.colSpan}>
                                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllLeafColumns().length}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    No quests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={
                                                cell.column.id === 'conditions' ? { whiteSpace: 'normal' } : undefined
                                            }
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <p className="text-xs text-muted-foreground">{table.getFilteredRowModel().rows.length} quests</p>
        </div>
    );
}

export function Quests() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const activeGiver = searchParams.get('npc') ?? QUEST_GIVERS[0].npc;
    const activeTier = searchParams.get('tier') ?? '1';

    function setGiver(npc: string) {
        setSearchParams({ npc, tier: '1' });
    }

    function setTier(tier: string) {
        setSearchParams({ npc: activeGiver, tier });
    }

    return (
        <div className="flex flex-1 flex-col gap-4 px-6 py-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Vanilla Quests</h1>

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
                    rows={ALL_ROWS}
                    globalFilter={globalFilter}
                    onGlobalFilterChange={setGlobalFilter}
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
                                            rows={buildRows(giver, tier)}
                                            globalFilter=""
                                            onGlobalFilterChange={setGlobalFilter}
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
