import { Link } from 'react-router-dom';
import type { NavGroupProps } from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar.tsx';

const NEW_BADGE_CLASS = 'bg-green-500/20 text-green-400 border border-green-500/30 rounded-md px-1.5 text-[10px]';
const SUB_LIST_FULL_WIDTH = 'mr-px pr-0';

export function AppSidebarNav({ label, items }: NavGroupProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            {item.comingSoon && (
                                <SidebarMenuBadge className="text-muted-foreground">Coming soon!</SidebarMenuBadge>
                            )}
                            {item.isNew && <SidebarMenuBadge className={NEW_BADGE_CLASS}>New</SidebarMenuBadge>}
                            {item.items && item.items.length > 0 && (
                                <SidebarMenuSub className={SUB_LIST_FULL_WIDTH}>
                                    {item.items.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <Link to={subItem.url}>
                                                    {subItem.icon && <subItem.icon />}
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                            {subItem.isNew && (
                                                <SidebarMenuBadge className={`top-1 ${NEW_BADGE_CLASS}`}>
                                                    New
                                                </SidebarMenuBadge>
                                            )}
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
