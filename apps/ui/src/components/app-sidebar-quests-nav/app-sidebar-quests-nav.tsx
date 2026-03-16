import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar.tsx';
import {NavListProps} from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';

export function AppSidebarQuestsNav({items}: NavListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>SCUM Quests</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
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
  )
}
