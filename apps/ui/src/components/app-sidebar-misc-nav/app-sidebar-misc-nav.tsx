import {NavListProps} from '@/components/app-sidebar-nav/app-sidebar-nav.types.ts';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu, SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar.tsx';
import {config} from '@/config.ts';
import {ExternalLink} from 'lucide-react';

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
                  {!item.title.startsWith('Version') && (<ExternalLink className="ml-auto"/>)}
                </a>
              </SidebarMenuButton>
              {item.title.startsWith('Version') && (
                <SidebarMenuBadge>{config.APP_VERSION}</SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
