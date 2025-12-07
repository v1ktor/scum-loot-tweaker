'use client'

import {ChevronDown,} from 'lucide-react'

import {Button} from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar.tsx'
import {IconLogout, IconSettings, IconUserCircle} from '@tabler/icons-react';

export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 px-3 py-2 justify-start data-[state=open]:bg-accent"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/avatars/01.png" alt="@username"/>
              <AvatarFallback className="rounded-lg">JD</AvatarFallback>
            </Avatar>
            <span className="mr-2 text-sm font-medium">John Doe</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={'img/no-profile.jpg'} alt={'v1'}/>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">v1`</span>
                <span className="text-muted-foreground truncate text-xs">
                    mail@example.com
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
    </div>
  )
}
