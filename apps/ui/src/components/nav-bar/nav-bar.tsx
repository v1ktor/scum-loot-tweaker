import {SidebarInset, SidebarTrigger} from '@/components/ui/sidebar.tsx';
import {Separator} from '@/components/ui/separator.tsx';
import {
  Breadcrumb,
  BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb.tsx';
import {NavActions} from '@/components/nav-actions/nav-actions.tsx';
import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import {NavigationPath} from '@/data/navigation-path.ts';

const breadcrumbMap: Record<string, string> = {
  [NavigationPath.Spawners]: 'Spawners',
  [NavigationPath.Parameters]: 'Parameters',
  [NavigationPath.Nodes]: 'Nodes',
  [NavigationPath.Changelog]: 'Changelog',
};

export function NavBar({content}: {content: ReactNode}) {
  const {pathname} = useLocation();
  const currentPage = breadcrumbMap[pathname];

  return (
    <SidebarInset>
      <header
        className="flex h-14 shrink-0 items-center gap-2 sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger/>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  SCUM Loot Tweaker
                </BreadcrumbLink>
              </BreadcrumbItem>
              {currentPage && (
                <>
                  <BreadcrumbSeparator/>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      {currentPage}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3">
          {false && (
            <NavActions/>
          )}
        </div>
      </header>
      {content}
    </SidebarInset>
  );
}
