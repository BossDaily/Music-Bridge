import React from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import ErrorBoundary from "./ErrorBoundary";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface DashboardSidebarProps {
  urlPathname: string;
  navigationItems: {
    id: string;
    title: string;
    url: string;
    icon: React.ElementType | string;
    isActive?: boolean;
  }[];
}

type SidebarProps = DashboardSidebarProps &
  Omit<React.ComponentProps<typeof Sidebar>, "children">;

export function DashboardSidebar({
  urlPathname,
  navigationItems,
  ...props
}: SidebarProps) {
  // Convert navigation items to the format expected by the new sidebar
  const links: Links[] = navigationItems.map((item) => ({
    label: item.title,
    href: item.url,
    icon: typeof item.icon === "string" ? (
      <span>{item.icon}</span>
    ) : typeof item.icon === "function" ? (
      React.createElement(item.icon)
    ) : null,
  }));

  return (
    <ErrorBoundary>
      <Sidebar {...props}>
        <SidebarBody>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center space-x-2 py-4">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                🎵
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Music Bridge</span>
                <span className="truncate text-xs text-muted-foreground">Dashboard</span>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2 flex-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Application
              </div>
              {links.map((link, index) => (
                <SidebarLink 
                  key={index} 
                  link={link}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground rounded-md px-2",
                    link.href === urlPathname && "bg-accent text-accent-foreground"
                  )}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </ErrorBoundary>
  );
}
