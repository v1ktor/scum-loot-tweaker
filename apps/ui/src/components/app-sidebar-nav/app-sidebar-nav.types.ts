import type { Icon, IconProps } from '@tabler/icons-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type NavSubItem = {
    title: string;
    url: string;
    icon?:
        | ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
        | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    isNew?: boolean;
};

export type NavItem = {
    title: string;
    url: string;
    icon:
        | ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
        | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    comingSoon?: boolean;
    isNew?: boolean;
    items?: NavSubItem[];
};

export type NavListProps = {
    items: NavItem[];
};

/** A {@link NavListProps} group that also renders a heading. */
export type NavGroupProps = NavListProps & {
    label: string;
};
