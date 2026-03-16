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
import {Link} from 'react-router-dom';

export function AppSidebarMiscNav({items}: NavListProps) {
  return (
    <SidebarGroup className={'mt-auto'}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isExternal = item.url.startsWith('http');
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  {isExternal ? (
                    <a href={item.url} target="_blank">
                      <item.icon/>
                      <span>{item.title}</span>
                      <ExternalLink className="ml-auto"/>
                    </a>
                  ) : (
                    <Link to={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
                {item.title.startsWith('Version') && (
                  <SidebarMenuBadge>{config.APP_VERSION}</SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
