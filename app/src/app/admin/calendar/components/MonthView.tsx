import { getReservations } from "../../reservations/data";
import EventCard from "./EventCard";

interface MonthViewProps {
  currentDate: Date;
}

export default function MonthView({ currentDate }: MonthViewProps) {
  const reservations = getReservations();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 取得當月第一天和最後一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  // 建立日曆網格
  const days: (Date | null)[] = [];
  // 填入空白（上個月的日期）
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  // 填入當月日期
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  // 取得特定日期的預約
  const getReservationsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split("T")[0];
    return reservations.filter((r) => r.booking_date === dateStr);
  };

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-7 border-b border-zinc-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-zinc-700 bg-zinc-50"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((date, index) => (
          <div
            key={index}
            className="min-h-[120px] border-r border-b border-zinc-200 p-2 bg-white"
          >
            {date ? (
              <>
                <div className="text-sm font-medium text-zinc-900 mb-2">
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {getReservationsForDate(date).map((reservation) => (
                    <EventCard
                      key={reservation.reservation_id}
                      reservationId={reservation.reservation_id}
                      time={reservation.booking_time_slot.split("-")[0]}
                      customerName={reservation.customer_name}
                      serviceItem={reservation.service_item}
                      status={reservation.status}
                      staff={reservation.staff || null}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-zinc-50 h-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

