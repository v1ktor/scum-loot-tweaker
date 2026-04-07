import type { Icon, IconProps } from '@tabler/icons-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type NavItem = {
    title: string;
    url: string;
    icon:
        | ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
        | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

export type NavListProps = {
    items: NavItem[];
};
