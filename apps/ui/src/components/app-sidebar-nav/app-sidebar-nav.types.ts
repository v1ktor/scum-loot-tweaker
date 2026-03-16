import {ForwardRefExoticComponent, RefAttributes} from 'react';
import {LucideProps} from 'lucide-react';
import {Icon, IconProps} from '@tabler/icons-react';

export type NavItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  > | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
};

export type NavListProps = {
  items: NavItem[];
};
