import Link from "next/link";

export default function AdminPage() {
  // Mock data for dashboard
  const stats = {
    todayReservations: 12,
    pendingReservations: 5,
    totalCustomers: 156,
    activeStaff: 8,
  };

  const recentReservations = [
    { id: 1, customer: "王小明", service: "基礎保養", time: "14:00", status: "已確認" },
    { id: 2, customer: "李小華", service: "深層清潔", time: "15:30", status: "待確認" },
    { id: 3, customer: "張三", service: "基礎保養", time: "16:00", status: "已確認" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">今日預約</p>
              <p className="text-2xl font-semibold text-zinc-900">{stats.todayReservations}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">待確認</p>
              <p className="text-2xl font-semibold text-zinc-900">{stats.pendingReservations}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">總客戶數</p>
              <p className="text-2xl font-semibold text-zinc-900">{stats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">在職人員</p>
              <p className="text-2xl font-semibold text-zinc-900">{stats.activeStaff}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">最近預約</h2>
            <Link
              href="/admin/reservations"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              查看全部 →
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-b-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">{reservation.customer}</p>
                  <p className="text-sm text-zinc-600">{reservation.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-900">{reservation.time}</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      reservation.status === "已確認"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
