import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { collapseVariantNames } from '@/utils/collapse-variant-names.ts';

export function VariantList({ names }: { names: string[] }) {
    const group = collapseVariantNames(names);

    if (!group.collapsed) {
        return <>{group.label}</>;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-help underline decoration-dotted underline-offset-2">{group.label}</span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">{group.names.join(', ')}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
