import { IconDotsVertical, IconLogin2, IconLogout, IconSettings, IconUserCircle } from '@tabler/icons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';

type SidebarProfileProps = {
    isLoggedIn: boolean;
    isMobile: boolean;
    user: {
        name: string;
        email: string;
        avatar: string;
    };
};

export function AppSidebarProfile({ isLoggedIn, isMobile, user }: SidebarProfileProps) {
    return (
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
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">v1</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                                </div>
                                <IconDotsVertical className="ml-auto size-4" />
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
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.name}</span>
                                        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <IconUserCircle />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <IconSettings />
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <IconLogout />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            ) : (
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Log In">
                        <a href="#">
                            <IconLogin2 />
                            <span>Log In</span>
                        </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="text-muted-foreground">Coming soon!</SidebarMenuBadge>
                </SidebarMenuItem>
            )}
        </SidebarMenu>
    );
}
