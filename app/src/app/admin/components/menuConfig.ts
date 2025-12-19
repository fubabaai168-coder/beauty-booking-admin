import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  CalendarDays,
  Settings,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

export interface MenuItem {
  href: string;
  label: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const menuItems: MenuItem[] = [
  {
    href: "/admin",
    label: "儀表板",
    labelEn: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/reservations",
    label: "預約管理",
    labelEn: "Reservations",
    icon: Calendar,
  },
  {
    href: "/admin/customers",
    label: "客戶",
    labelEn: "Customers",
    icon: Users,
  },
  {
    href: "/admin/services",
    label: "服務項目",
    labelEn: "Services",
    icon: Package,
  },
  {
    href: "/admin/calendar",
    label: "行事曆",
    labelEn: "Calendar",
    icon: CalendarDays,
  },
  {
    href: "/admin/support",
    label: "客服系統",
    labelEn: "Customer Support",
    icon: MessageSquare,
  },
  {
    href: "/admin/support/faq",
    label: "FAQ 管理",
    labelEn: "FAQ Management",
    icon: HelpCircle,
  },
  {
    href: "/admin/settings",
    label: "系統設定",
    labelEn: "Settings",
    icon: Settings,
  },
];

