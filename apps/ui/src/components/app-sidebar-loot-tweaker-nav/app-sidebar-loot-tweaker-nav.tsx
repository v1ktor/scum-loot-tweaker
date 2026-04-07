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

export function AppSidebarLootTweakerNav({ items }: NavListProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>SCUM Loot Tweaker</SidebarGroupLabel>
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
                            {item.title != 'Spawners' && (
                                <SidebarMenuBadge className="text-muted-foreground">Coming soon!</SidebarMenuBadge>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
