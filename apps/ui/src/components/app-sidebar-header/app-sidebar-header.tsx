import { PocketKnife } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';

export function AppSidebarHeader() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild tooltip="SCUM Tools">
                    <a href="/">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <PocketKnife />
                        </div>
                        <div className="grid flex-1 text-left leading-tight">
                            <span className="truncate font-medium text-base">SCUM Tools</span>
                        </div>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
