import {SidebarProvider} from '@/components/ui/sidebar'
import {AppSidebar} from '@/components/app-sidebar/app-sidebar.tsx'
import React from 'react';
import {NavBar} from '@/components/nav-bar/nav-bar.tsx';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <NavBar/>
      {children}
    </SidebarProvider>
  )
}
