import { LucideIcon } from 'lucide-react';

// Define the type for each submenu item
type SubmenuItem = {
  href: string; // URL to navigate to
  icon: LucideIcon; // Icon (string, assuming it's just a placeholder for an icon name)
  label: string; // Label text for the submenu item
};

// Define the type for the sidebar menu link
export type SidebarMenuLink = {
  label: string; // The title of the menu section (e.g., "products")
  href: string;
  submenu: SubmenuItem[]; // Array of submenu items
  icon: LucideIcon;
};
