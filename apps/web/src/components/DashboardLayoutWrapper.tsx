import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ErrorBoundary from './ErrorBoundary';

interface NavigationItem {
  id: string;
  title: string;
  url: string;
  icon: React.ElementType | string;
  isActive?: boolean;
}

interface DashboardLayoutWrapperProps {
  navigationItems: NavigationItem[];
  userName: string;
  userEmail: string;
  pageTitle: string;
  children: React.ReactNode;
  urlPathname: string;
}

export function DashboardLayoutWrapper({
  navigationItems,
  userName,
  userEmail,
  pageTitle,
  children,
  urlPathname,
}: DashboardLayoutWrapperProps) {
  const updatedNavigationItems = navigationItems.map((item) => ({
    ...item,
    isActive: item.title === pageTitle,
  }));

  return (
    <SidebarProvider>
      <DashboardSidebar
        navigationItems={updatedNavigationItems}
        urlPathname={urlPathname}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              PROTOTYPE
            </Badge>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </SidebarInset>
    </SidebarProvider>
  );
}
