import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Badge } from './ui/badge';

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive?: boolean;
}

interface DashboardLayoutWrapperProps {
  navigationItems: NavigationItem[];
  userName: string;
  userEmail: string;
  pageTitle: string;
  children: React.ReactNode;
}

export function DashboardLayoutWrapper({
  navigationItems,
  userName,
  userEmail,
  pageTitle,
  children,
}: DashboardLayoutWrapperProps) {
  const updatedNavigationItems = navigationItems.map((item) => ({
    ...item,
    isActive: item.title === pageTitle,
  }));

  return (
    <SidebarProvider>
      <DashboardSidebar
        navigationItems={updatedNavigationItems}
        userName={userName}
        userEmail={userEmail}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              PROTOTYPE
            </Badge>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
