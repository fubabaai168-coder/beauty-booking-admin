import Link from "next/link";
import StatusTag from "./components/StatusTag";
import { mockReservations } from "./mock";

export default function ReservationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">預約管理</h1>
      
      {/* Desktop 列表 */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                預約編號
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                客戶姓名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                電話
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                服務項目
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                日期 / 時間
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                狀態
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {mockReservations.map((reservation) => (
              <tr
                key={reservation.reservation_id}
                className="hover:bg-zinc-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                  #{reservation.reservation_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                  {reservation.customer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                  {reservation.customer_phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                  {reservation.service_item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                  <div>{reservation.booking_date}</div>
                  <div className="text-xs text-zinc-500">{reservation.booking_time_slot}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusTag status={reservation.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/reservations/${reservation.reservation_id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    查看詳情
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile 列表 */}
      <div className="block md:hidden space-y-4">
        {mockReservations.map((reservation) => (
          <div
            key={reservation.reservation_id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  #{reservation.reservation_id}
                </h3>
                <p className="text-sm text-zinc-900 mt-1">{reservation.customer_name}</p>
                <p className="text-xs text-zinc-600 mt-1">{reservation.customer_phone}</p>
              </div>
              <StatusTag status={reservation.status} />
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-zinc-600">服務：</span>
                <span className="text-zinc-900 ml-2">{reservation.service_item}</span>
              </div>
              <div>
                <span className="text-zinc-600">日期：</span>
                <span className="text-zinc-900 ml-2">{reservation.booking_date}</span>
              </div>
              <div>
                <span className="text-zinc-600">時間：</span>
                <span className="text-zinc-900 ml-2">{reservation.booking_time_slot}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-200">
              <Link
                href={`/admin/reservations/${reservation.reservation_id}`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                查看詳情 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
