import React from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarLink,
  DesktopSidebar,
  useSidebar,
} from "@/components/ui/sidebar";
import { AnimatePresence, motion } from "motion/react";
import { IconX } from "@tabler/icons-react";
import ErrorBoundary from "./ErrorBoundary";
import { IconRenderer } from "./IconRenderer";

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
    icon: string; // Changed from React.ElementType | string to just string
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
  const { open, setOpen } = useSidebar();
  
  // Convert navigation items to the format expected by the new sidebar
  const links: Links[] = navigationItems.map((item) => ({
    label: item.title,
    href: item.url,
    icon: (
      <IconRenderer 
        iconName={item.icon} 
        className="h-5 w-5 min-h-5 min-w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200"
      />
    ),
  }));

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
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
      <div className="flex flex-col space-y-2 flex-1 mt-4">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Application
        </div>
        {links.map((link, index) => (
          isMobile ? (
            // Custom mobile link that always shows text
            <a
              key={index}
              href={link.href}
              className={cn(
                "flex items-center justify-start gap-3 py-3 px-2 rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                link.href === urlPathname && "bg-accent text-accent-foreground"
              )}
              onClick={() => setOpen(false)} // Close sidebar when link is clicked on mobile
            >
              <div className="flex-shrink-0">
                {link.icon}
              </div>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ) : (
            <SidebarLink 
              key={index} 
              link={link}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground rounded-md px-2",
                link.href === urlPathname && "bg-accent text-accent-foreground"
              )}
              
            />
          )
        ))}
      </div>

      {/* Mobile Footer - Account info for mobile */}
      {isMobile && (
        <div className="mt-auto pt-4 border-t border-border/40">
          <div className="flex items-center space-x-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              CN
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">My Account</div>
              <div className="text-xs text-muted-foreground truncate">Settings • Support • Logout</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ErrorBoundary>
      <Sidebar {...props}>
        {/* Desktop Sidebar */}
        <DesktopSidebar>
          <SidebarContent />
        </DesktopSidebar>
        
        {/* Custom Mobile Sidebar */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="md:hidden fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-6 z-[100] flex flex-col"
            >
              <div
                className="absolute right-6 top-6 z-50 text-neutral-800 dark:text-neutral-200 p-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <IconX className="h-5 w-5" />
              </div>
              <SidebarContent isMobile={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </Sidebar>
    </ErrorBoundary>
  );
}
