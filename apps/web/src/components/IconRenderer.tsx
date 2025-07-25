import React from "react";
import { 
  Home, 
  Music, 
  RotateCcw, 
  Shuffle, 
  Users, 
  Settings, 
  TestTube,
  type LucideIcon
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Home,
  Music,
  RotateCcw,
  Shuffle,
  Users,
  Settings,
  TestTube,
};

interface IconRendererProps {
  iconName: string;
  className?: string;
  size?: number;
  variant?: "small" | "medium" | "large";
}

export function IconRenderer({ 
  iconName, 
  className, 
  size, 
  variant = "medium" 
}: IconRendererProps) {
  const IconComponent = iconMap[iconName];
  
  // Default size classes based on variant if no className is provided
  const defaultClassName = variant === "small" 
    ? "h-4 w-4 min-h-4 min-w-4 flex-shrink-0" 
    : variant === "large" 
    ? "h-6 w-6 min-h-6 min-w-6 flex-shrink-0" 
    : "h-5 w-5 min-h-5 min-w-5 flex-shrink-0";
  
  const finalClassName = className || `${defaultClassName} text-neutral-700 dark:text-neutral-200`;
  
  if (!IconComponent) {
    // Fallback to a generic icon or text if icon not found
    return <div className={finalClassName}>?</div>;
  }
  
  return <IconComponent className={finalClassName} size={size} />;
}
