import {NavListProps} from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar.tsx';

export function AppSidebarMiscNav({items}: NavListProps) {
  return (
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
  )
}
