import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { href: "/admin", label: "儀表板", labelEn: "Dashboard" },
    { href: "/admin/reservations", label: "預約管理", labelEn: "Reservations" },
    { href: "/admin/customers", label: "客戶", labelEn: "Customers" },
    { href: "/admin/services", label: "服務項目", labelEn: "Services" },
    { href: "/admin/calendar", label: "行事曆", labelEn: "Calendar" },
    { href: "/admin/settings", label: "系統設定", labelEn: "Settings" },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-zinc-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">後台管理</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
