import { LayoutDashboard, LogOut, PackageSearch, Settings } from "lucide-react";

export interface SidebarDataType {
  id: number;
  name: string;
  href: string;
  icon: React.ElementType;
}

export const SidebarData: SidebarDataType[] = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Order",
    href: "/order",
    icon: PackageSearch,
  },
  {
    id: 3,
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
    {
    id: 4,
    name: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];