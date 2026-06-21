import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

export interface Parameter {
    Id: string;
    IsDisabledForSpawning: boolean;
    AllowedLocations: string[];
    CooldownPerSquadMemberMin: number;
    CooldownPerSquadMemberMax: number;
    CooldownGroup: string;
    Variations: string[];
    ShouldOverrideInitialAndRandomUsage: boolean;
    InitialUsageOverride: number;
    RandomUsageOverrideUsage: number;
}

export interface CooldownGroupCooldown {
    CooldownMin: number;
    CooldownMax: number;
}

export interface ParametersTableMeta {
    getCooldownGroupCooldown?: (name: string) => CooldownGroupCooldown | undefined;
}

const Dash = () => <span className="text-muted-foreground">—</span>;

export const columns: ColumnDef<Parameter>[] = [
    {
        accessorKey: 'Id',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Item
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.original.Id}</span>,
    },
    {
        accessorKey: 'IsDisabledForSpawning',
        header: 'Spawning',
        cell: ({ row }) =>
            row.original.IsDisabledForSpawning ? (
                <Badge variant="destructive">Disabled</Badge>
            ) : (
                <Badge variant="outline">Enabled</Badge>
            ),
    },
    {
        accessorKey: 'AllowedLocations',
        header: 'Allowed Locations',
        enableSorting: false,
        cell: ({ row }) => {
            const locations = row.original.AllowedLocations;
            if (locations.length === 0) return <Dash />;
            return (
                <div className="flex flex-wrap gap-1">
                    {locations.map((location) => (
                        <Badge key={location} variant="secondary">
                            {location}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'CooldownGroup',
        header: 'Cooldown Group',
        filterFn: 'equalsString',
        cell: ({ row, table }) => {
            const group = row.original.CooldownGroup;
            if (!group) return <Dash />;

            const meta = table.options.meta as ParametersTableMeta | undefined;
            const cooldown = meta?.getCooldownGroupCooldown?.(group);

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                            {group}
                        </Badge>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-64 p-3">
                        <div className="text-sm font-medium break-all">{group}</div>
                        {cooldown ? (
                            <div className="mt-2 text-sm tabular-nums">
                                <span className="text-muted-foreground">Cooldown </span>
                                {cooldown.CooldownMin === cooldown.CooldownMax
                                    ? `${cooldown.CooldownMin}h`
                                    : `${cooldown.CooldownMin}h – ${cooldown.CooldownMax}h`}
                            </div>
                        ) : (
                            <div className="mt-2 text-sm text-muted-foreground">No cooldown data found.</div>
                        )}
                    </PopoverContent>
                </Popover>
            );
        },
    },
    {
        id: 'cooldownPerSquadMember',
        header: 'Cooldown per Squad',
        enableSorting: false,
        cell: ({ row }) => {
            const { CooldownPerSquadMemberMin: min, CooldownPerSquadMemberMax: max } = row.original;
            if (min === 0 && max === 0) return <Dash />;
            if (min === max) {
                return <span className="text-sm tabular-nums">{min}h</span>;
            }
            return (
                <div className="flex flex-col gap-0.5 text-sm tabular-nums">
                    <span>
                        <span className="text-muted-foreground">Min</span> {min}h
                    </span>
                    <span>
                        <span className="text-muted-foreground">Max</span> {max}h
                    </span>
                </div>
            );
        },
    },
    {
        id: 'usageOverride',
        header: 'Usage Override',
        enableSorting: false,
        cell: ({ row }) => {
            const { ShouldOverrideInitialAndRandomUsage, InitialUsageOverride, RandomUsageOverrideUsage } =
                row.original;
            if (!ShouldOverrideInitialAndRandomUsage) return <Dash />;
            return (
                <span className="text-sm">
                    Initial {InitialUsageOverride} · Random {RandomUsageOverrideUsage}
                </span>
            );
        },
    },
    {
        accessorKey: 'Variations',
        header: 'Variations',
        enableSorting: false,
        cell: ({ row }) => {
            const variations = row.original.Variations;
            if (variations.length === 0) return <Dash />;

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/70">
                            {variations.length}
                        </Badge>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-64 p-2">
                        <ScrollArea className="max-h-64">
                            <div className="flex flex-col gap-1 pr-2">
                                {variations.map((variation) => (
                                    <span key={variation} className="text-sm">
                                        {variation}
                                    </span>
                                ))}
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );
        },
    },
];
