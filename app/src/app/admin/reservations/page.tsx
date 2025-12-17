import Link from "next/link";

export default function ReservationsPage() {
  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">
        預約管理 (Reservations)
      </h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-zinc-100 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-700">
                  預約編號
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-700">
                  客戶
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-700">
                  服務
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-700">
                  日期 / 時段
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-700">
                  狀態
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-zinc-50">
                <td className="px-6 py-4 text-sm text-zinc-900">
                  <Link
                    href="/admin/reservations/1"
                    className="text-blue-600 hover:underline"
                  >
                    #001
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-900">客戶姓名</td>
                <td className="px-6 py-4 text-sm text-zinc-900">服務項目</td>
                <td className="px-6 py-4 text-sm text-zinc-900">
                  2024-01-15 14:00-15:00
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    待確認
                  </span>
                </td>
              </tr>
              <tr className="border-b hover:bg-zinc-50">
                <td className="px-6 py-4 text-sm text-zinc-900">
                  <Link
                    href="/admin/reservations/2"
                    className="text-blue-600 hover:underline"
                  >
                    #002
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-900">客戶姓名</td>
                <td className="px-6 py-4 text-sm text-zinc-900">服務項目</td>
                <td className="px-6 py-4 text-sm text-zinc-900">
                  2024-01-16 10:00-11:00
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    已確認
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
