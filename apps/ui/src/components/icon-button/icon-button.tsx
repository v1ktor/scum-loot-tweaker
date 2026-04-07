import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { Button, type buttonVariants } from '@/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';

export interface IconButtonProps {
    onClick?: () => void;
    variant?: VariantProps<typeof buttonVariants>['variant'];
    size?: VariantProps<typeof buttonVariants>['size'];
    className?: string;
    text?: string;
    tooltip?: string;
    leftOrnament?: ReactNode;
    rightOrnament?: ReactNode;
}

export function IconButton({
    onClick,
    variant,
    size,
    className,
    text,
    tooltip,
    leftOrnament,
    rightOrnament,
}: IconButtonProps) {
    const button = (
        <Button variant={variant ?? 'outline'} size={size ?? 'sm'} className={className} onClick={onClick}>
            {leftOrnament}
            {text}
            {rightOrnament}
        </Button>
    );

    if (!tooltip) return button;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
