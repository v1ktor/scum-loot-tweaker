import type React from 'react';
import { AppSidebar } from '@/components/app-sidebar/app-sidebar.tsx';
import { NavBar } from '@/components/nav-bar/nav-bar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <NavBar content={children} />
        </SidebarProvider>
    );
}
