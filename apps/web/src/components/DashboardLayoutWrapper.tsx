import React from 'react';
import { SidebarProvider } from './ui/sidebar';
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
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <DashboardSidebar
            navigationItems={navigationItems}
            urlPathname={urlPathname}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4" suppressHydrationWarning>
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
            <main className="flex-1 bg-background overflow-auto p-4" suppressHydrationWarning>
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}
