import { Link } from 'react-router-dom';
import type { NavListProps } from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';

export function AppSidebarQuestsNav({ items }: NavListProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>SCUM Quests</SidebarGroupLabel>
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
                            {item.isNew && (
                                <SidebarMenuBadge className="bg-green-500/20 text-green-400 border border-green-500/30 rounded-md px-1.5 text-[10px]">New</SidebarMenuBadge>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
