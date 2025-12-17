"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MenuItem {
  title: string;
  enTitle: string;
  href?: string;
  icon: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "儀表板",
    enTitle: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    title: "預約管理",
    enTitle: "Reservations",
    href: "/admin/reservations",
    icon: "📅",
  },
  {
    title: "客戶",
    enTitle: "Customers",
    href: "/admin/customers",
    icon: "👥",
  },
  {
    title: "服務項目",
    enTitle: "Services",
    href: "/admin/service-items",
    icon: "💅",
  },
  {
    title: "人員排班",
    enTitle: "Staff Scheduling",
    href: "/admin/staff/schedule",
    icon: "👥",
  },
  {
    title: "行事曆",
    enTitle: "Calendar",
    href: "/admin/calendar",
    icon: "📆",
  },
  {
    title: "客服系統",
    enTitle: "Customer Support",
    icon: "🎧",
    children: [
      {
        title: "對話列表",
        enTitle: "Conversations",
        href: "/admin/support",
        icon: "💬",
      },
      {
        title: "知識庫/FAQ",
        enTitle: "FAQ Management",
        href: "/admin/support/faq",
        icon: "📚",
      },
    ],
  },
  {
    title: "權限/角色",
    enTitle: "Roles & Permissions",
    href: "/admin/roles",
    icon: "🔒",
  },
  {
    title: "系統設定",
    enTitle: "Settings",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Step 2: 子選單「精確判斷」（禁止 includes / startsWith）
  const isConversationActive =
    pathname === "/admin/support" ||
    pathname === "/admin/support/conversations";

  const isFaqActive = pathname === "/admin/support/faq";

  // Step 3: 父選單「只依賴子選單結果」
  const isSupportActive = isConversationActive || isFaqActive;

  // 🔒 關鍵：Open 狀態「完全由 route 決定」
  // 展開條件：只要 pathname 以 /admin/support 開頭，則自動展開
  const isSupportOpen = pathname.startsWith("/admin/support");

  // 一般菜單項目的 Active 判斷（不使用 startsWith）
  const isActive = (href?: string) => {
    if (!href) return false;
    
    // 標準化路徑（移除尾部斜線）
    const normalizedPath = pathname.replace(/\/$/, "");
    const normalizedHref = href.replace(/\/$/, "");
    
    // 精確匹配
    return normalizedPath === normalizedHref;
  };

  const hasActiveChild = (item: MenuItem): boolean => {
    if (!item.children) return false;
    
    // 針對「客服系統」模組，使用精確判斷結果
    if (item.title === "客服系統") {
      return isSupportActive;
    }
    
    // 其他有子菜單的項目，檢查子菜單是否活躍
    return item.children.some((child) => {
      if (!child.href) return false;
      const normalizedPath = pathname.replace(/\/$/, "");
      const normalizedHref = child.href.replace(/\/$/, "");
      return normalizedPath === normalizedHref;
    });
  };

  const isMenuOpen = (item: MenuItem): boolean => {
    // 針對「客服系統」模組，使用 isSupportOpen
    if (item.title === "客服系統") {
      return isSupportOpen;
    }
    
    // 其他有子菜單的項目，檢查是否有活動子項目
    if (!item.children) return false;
    return item.children.some((child) => {
      if (!child.href) return false;
      const normalizedPath = pathname.replace(/\/$/, "");
      const normalizedHref = child.href.replace(/\/$/, "");
      return normalizedPath === normalizedHref;
    });
  };

  return (
    <aside
      className={`flex flex-col bg-white border-r border-zinc-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-200">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-zinc-900">
            Beauty Admin
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-zinc-100"
          aria-label="Toggle sidebar"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          
          // 判斷主菜單是否活躍
          let active = false;
          if (hasChildren) {
            // 有子菜單的項目，只依賴子選單結果
            active = hasActiveChild(item);
          } else {
            // 無子菜單的項目，使用精確匹配
            active = isActive(item.href);
          }

          // Open 狀態完全由 route 決定
          const isOpen = hasChildren ? isMenuOpen(item) : false;

          // 如果有子菜單
          if (hasChildren) {
            // 針對「客服系統」，主選單必須是可點擊的 Link，導向預設子頁面
            const defaultHref =
              item.title === "客服系統" ? "/admin/support" : undefined;

            return (
              <div key={item.title}>
                {defaultHref ? (
                  <Link
                    href={defaultHref}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <span className="text-xs text-zinc-500">
                          {item.enTitle}
                        </span>
                        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
                      </>
                    )}
                  </Link>
                ) : (
                  <div
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-zinc-700"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <span className="text-xs text-zinc-500">
                          {item.enTitle}
                        </span>
                        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
                      </>
                    )}
                  </div>
                )}
                {!collapsed && isOpen && (
                  <div className="ml-12 mt-1 space-y-0.5">
                    {item.children!.map((child) => {
                      let childActive = false;
                      
                      // 針對「客服系統」的子菜單，使用精確判斷
                      if (item.title === "客服系統") {
                        if (child.href === "/admin/support") {
                          childActive = isConversationActive;
                        } else if (child.href === "/admin/support/faq") {
                          childActive = isFaqActive;
                        }
                      } else {
                        // 其他子菜單使用精確匹配
                        if (child.href) {
                          const normalizedPath = pathname.replace(/\/$/, "");
                          const normalizedHref = child.href.replace(/\/$/, "");
                          childActive = normalizedPath === normalizedHref;
                        }
                      }
                      
                      return (
                        <Link
                          key={child.href}
                          href={child.href!}
                          className={`flex items-center gap-2 pl-6 pr-3 py-1.5 rounded text-sm transition-colors ${
                            childActive
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "bg-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                          }`}
                        >
                          <span className="text-xs">{child.icon}</span>
                          <span className="flex-1 text-xs">{child.title}</span>
                          <span className="text-xs text-zinc-400">
                            {child.enTitle}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // 一般菜單項目
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  <span className="text-xs text-zinc-500">{item.enTitle}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

