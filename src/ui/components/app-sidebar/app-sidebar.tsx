import {Cog, Info, PocketKnife} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconDotsVertical,
  IconLogin2,
  IconLogout,
  IconSettings,
  IconTagFilled,
  IconUserCircle
} from '@tabler/icons-react';
import {useState} from 'react';

// Menu items.
const scumLootTweakerMenuItems = [
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

const scumQuestMenuItems = [
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

const items = [
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
  const [isLoggedIn] = useState(false);

  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip={'SCUM Tools'}>
              <a href="#">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <PocketKnife/>
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium text-base">SCUM Tools</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SCUM Loot Tweaker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {scumLootTweakerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>SCUM Quests</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {scumQuestMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className={'text-muted-foreground'}>Coming soon!</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className={'mt-auto'}>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} target={item.title.startsWith('Version') ? '_self' : '_blank'}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {isLoggedIn ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    tooltip={user.name}
                  >
                    <Avatar className="h-8 w-8 rounded-lg grayscale">
                      <AvatarImage src={user.avatar} alt={user.name}/>
                      <AvatarFallback className="rounded-lg">v1</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
                    </div>
                    <IconDotsVertical className="ml-auto size-4"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name}/>
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.name}</span>
                        <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconUserCircle/>
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconSettings/>
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>
                    <IconLogout/>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={'Log In'}>
                <a href={'#'}>
                  <IconLogin2/>
                  <span>Log In</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuBadge className={'text-muted-foreground'}>Coming soon!</SidebarMenuBadge>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
