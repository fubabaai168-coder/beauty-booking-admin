import { getReservations } from "../../reservations/data";
import EventCard from "./EventCard";

interface DayListViewProps {
  currentDate: Date;
}

export default function DayListView({ currentDate }: DayListViewProps) {
  const reservations = getReservations();
  const dateStr = currentDate.toISOString().split("T")[0];

  const dayReservations = reservations.filter(
    (r) => r.booking_date === dateStr
  );

  // 依時間排序
  const sortedReservations = [...dayReservations].sort((a, b) => {
    const timeA = a.booking_time_slot.split("-")[0];
    const timeB = b.booking_time_slot.split("-")[0];
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="space-y-3">
      {sortedReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-zinc-500">
          當日無預約
        </div>
      ) : (
        sortedReservations.map((reservation) => (
          <EventCard
            key={reservation.reservation_id}
            reservationId={reservation.reservation_id}
            time={reservation.booking_time_slot}
            customerName={reservation.customer_name}
            serviceItem={reservation.service_item}
            status={reservation.status}
            staff={reservation.staff || null}
            isMobile={true}
          />
        ))
      )}
    </div>
  );
}

