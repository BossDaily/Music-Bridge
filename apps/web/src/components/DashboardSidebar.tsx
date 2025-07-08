import React, { useState, useEffect } from "react";
import { TrendingUp, Music, RotateCcw, Shuffle, Users, Settings, TestTube, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";


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
type SidebarProps = DashboardSidebarProps & Omit<React.ComponentProps<typeof Sidebar>, 'children'>;

export function DashboardSidebar({ urlPathname, navigationItems, ...props }: SidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="font-semibold">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  🎵
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Music Bridge</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={item.url === urlPathname} asChild>
                    <a href={item.url}>
                      {typeof item.icon === "string" ? (
                        <span>{item.icon}</span>
                      ) : typeof item.icon === "function" ? (
                        React.createElement(item.icon)
                      ) : null}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
