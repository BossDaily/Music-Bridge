import React from "react";
import { TrendingUp, Music, RotateCcw, Shuffle, Users, Settings, TestTube } from "lucide-react";
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
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  userName: string;
  userEmail: string;
}
type SidebarProps = DashboardSidebarProps & React.ComponentProps<typeof Sidebar>;

export function DashboardSidebar({ userName, userEmail, ...props }: SidebarProps) {
  // Define navigationItems here so icons are valid React components
  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: TrendingUp,
    },
    {
      title: "Global Playlists",
      url: "#",
      icon: Music,
    },
    {
      title: "Sync Manager",
      url: "#",
      icon: RotateCcw,
    },
    {
      title: "Transfer Tool",
      url: "#",
      icon: Shuffle,
    },
    {
      title: "Connected Services",
      url: "#",
      icon: Users,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Prototype",
      url: "/dashboard/prototype",
      icon: TestTube,
    },
  ];
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {typeof item.icon === "string" ? (
                        <span>{item.icon}</span>
                      ) : (
                        item.icon ? React.createElement(item.icon) : null
                      )}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                👤
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userName}</span>
                <span className="truncate text-xs">{userEmail}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
