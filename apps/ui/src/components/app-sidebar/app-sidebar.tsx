import { IconBrandDiscordFilled, IconBrandGithubFilled, IconTagFilled } from '@tabler/icons-react';
import { Cog, Download, Info } from 'lucide-react';
import { useState } from 'react';
import { AppSidebarHeader } from '@/components/app-sidebar-header/app-sidebar-header.tsx';
import { AppSidebarLootTweakerNav } from '@/components/app-sidebar-loot-tweaker-nav/app-sidebar-loot-tweaker-nav.tsx';
import { AppSidebarMiscNav } from '@/components/app-sidebar-misc-nav/app-sidebar-misc-nav.tsx';
import type { NavItem } from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';
import { AppSidebarProfile } from '@/components/app-sidebar-profile/app-sidebar-profile.tsx';
import { AppSidebarQuestsNav } from '@/components/app-sidebar-quests-nav/app-sidebar-quests-nav.tsx';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from '@/components/ui/sidebar.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';

const scumLootTweakerMenuItems: NavItem[] = [
    {
        title: 'Spawners',
        url: '/spawners',
        icon: Cog,
    },
    {
        title: 'Nodes',
        url: '#',
        icon: Cog,
        comingSoon: true,
    },
    {
        title: 'Parameters',
        url: '#',
        icon: Cog,
        comingSoon: true,
    },
    {
        title: 'Cooldown Groups',
        url: '#',
        icon: Cog,
        comingSoon: true,
    },
    {
        title: 'Custom Spawners',
        url: NavigationPath.CustomSpawners,
        icon: Download,
        isNew: true,
    },
];

const scumQuestMenuItems: NavItem[] = [
    {
        title: 'Quest Editor',
        url: '#',
        icon: Cog,
        comingSoon: true,
    },
    {
        title: 'Vanilla Quests',
        url: NavigationPath.Quests,
        icon: Info,
    },
    {
        title: 'Custom Quests',
        url: '#',
        icon: Download,
        comingSoon: true,
    },
];

const user = {
    name: 'v1`',
    email: 'm@example.com',
    avatar: '/avatars/no-picture.jpg',
};

const items: NavItem[] = [
    {
        title: 'Discord',
        url: 'https://discord.gg/8T6q6Xf945',
        icon: IconBrandDiscordFilled,
    },
    {
        title: 'GitHub',
        url: 'https://github.com/v1ktor/scum-loot-tweaker',
        icon: IconBrandGithubFilled,
    },
    {
        title: 'Version',
        url: '/changelog',
        icon: IconTagFilled,
    },
];

export function AppSidebar() {
    const { isMobile } = useSidebar();
    const [isLoggedIn] = useState(true);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <AppSidebarHeader />
            </SidebarHeader>
            <SidebarContent>
                <AppSidebarLootTweakerNav items={scumLootTweakerMenuItems} />
                <AppSidebarQuestsNav items={scumQuestMenuItems} />
                <AppSidebarMiscNav items={items} />
            </SidebarContent>
            <SidebarFooter>
                {false && <AppSidebarProfile isLoggedIn={isLoggedIn} isMobile={isMobile} user={user} />}
            </SidebarFooter>
        </Sidebar>
    );
}
