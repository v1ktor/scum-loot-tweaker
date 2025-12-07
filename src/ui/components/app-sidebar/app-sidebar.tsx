import {Cog, Info} from 'lucide-react'

import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar,} from '@/components/ui/sidebar.tsx'
import {IconBrandDiscordFilled, IconBrandGithubFilled, IconTagFilled} from '@tabler/icons-react';
import {useState} from 'react';
import {AppSidebarHeader} from '@/components/app-sidebar-header/app-sidebar-header.tsx';
import {AppSidebarLootTweakerNav} from '@/components/app-sidebar-loot-tweaker-nav/app-sidebar-loot-tweaker-nav.tsx';
import {AppSidebarQuestsNav} from '@/components/app-sidebar-quests-nav/app-sidebar-quests-nav.tsx';
import {NavItem} from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';
import {AppSidebarMiscNav} from '@/components/app-sidebar-misc-nav/app-sidebar-misc-nav.tsx';
import {AppSidebarProfile} from '@/components/app-sidebar-profile/app-sidebar-profile.tsx';

const scumLootTweakerMenuItems: NavItem[] = [
  {
    title: 'Spawners',
    url: '#',
    icon: Cog,
  },
  {
    title: 'Nodes',
    url: '#',
    icon: Cog,
  },
  {
    title: 'Parameters',
    url: '#',
    icon: Cog,
  },
  {
    title: 'Cooldown Groups',
    url: '#',
    icon: Cog,
  }
]

const scumQuestMenuItems: NavItem[] = [
  {
    title: 'Quest Editor',
    url: '#',
    icon: Cog,
  },
  {
    title: 'Vanilla Quests',
    url: '#',
    icon: Info,
  }
]

const user = {
  name: 'v1`',
  email: 'm@example.com',
  avatar: '/avatars/no-picture.jpg',
}

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
    title: 'Version 1.0.0',
    url: '#',
    icon: IconTagFilled,
  },
]

export function AppSidebar() {
  const {isMobile} = useSidebar();
  const [isLoggedIn] = useState(true);

  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader>
        <AppSidebarHeader/>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarLootTweakerNav items={scumLootTweakerMenuItems}/>
        <AppSidebarQuestsNav items={scumQuestMenuItems}/>
        <AppSidebarMiscNav items={items}/>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarProfile isLoggedIn={isLoggedIn} isMobile={isMobile} user={user}/>
      </SidebarFooter>
    </Sidebar>
  )
}
