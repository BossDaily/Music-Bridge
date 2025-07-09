import React from 'react';
import { SidebarProvider, useSidebar } from './ui/sidebar';
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
import { IconMenu2 } from '@tabler/icons-react';
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

function MobileHeader() {
  const { setOpen } = useSidebar();
  
  return (
    <header className="md:hidden flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background" suppressHydrationWarning>
      <button
        onClick={() => setOpen(true)}
        className="p-2 hover:bg-accent rounded-md"
        aria-label="Open navigation menu"
      >
        <IconMenu2 className="h-5 w-5" />
      </button>
      <div className="flex items-center space-x-2">
        <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
          🎵
        </div>
        <span className="font-semibold text-sm">Music Bridge</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          PROTOTYPE
        </Badge>
        <ModeToggle />
      </div>
    </header>
  );
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
        <div className="flex flex-col md:flex-row h-screen bg-background">
          {/* Mobile Header */}
          <MobileHeader />
          
          <DashboardSidebar
            navigationItems={navigationItems}
            urlPathname={urlPathname}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Desktop Header - hidden on mobile since mobile header is separate */}
            <header className="hidden md:flex h-16 shrink-0 items-center gap-2 border-b px-4" suppressHydrationWarning>
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
            <main className="flex-1 bg-background overflow-auto p-4 md:p-4 pt-2 md:pt-4" suppressHydrationWarning>
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}
