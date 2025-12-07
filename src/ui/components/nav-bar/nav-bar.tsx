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

export function NavBar() {
  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger/>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  SCUM Tools
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  SCUM Loot Tweaker
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3">
          <NavActions/>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-4 py-10">
        <div className="bg-muted/50 mx-auto h-24 w-full max-w-4xl rounded-xl"/>
        <div className="bg-muted/50 mx-auto h-full w-full max-w-4xl rounded-xl"/>
      </div>
    </SidebarInset>
  );
}
