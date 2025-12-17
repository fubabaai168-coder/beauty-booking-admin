import Link from "next/link";
import StatusTag from "../../reservations/components/StatusTag";
import StaffAvatar from "./StaffAvatar";

interface EventCardProps {
  reservationId: number;
  time: string;
  customerName: string;
  serviceItem: string;
  status: string;
  staff?: string | null;
  isMobile?: boolean;
}

export default function EventCard({
  reservationId,
  time,
  customerName,
  serviceItem,
  status,
  staff,
  isMobile = false,
}: EventCardProps) {
  const getStatusBorderColor = (status: string): string => {
    switch (status) {
      case "待確認":
        return "border-l-4 border-l-yellow-500";
      case "已確認":
        return "border-l-4 border-l-blue-500";
      case "已取消":
        return "border-l-4 border-l-red-500";
      case "候補中":
        return "border-l-4 border-l-blue-500";
      default:
        return "border-l-4 border-l-gray-500";
    }
  };

  if (isMobile) {
    return (
      <Link
        href={`/admin/reservations/${reservationId}`}
        className="block bg-white border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-zinc-900">{time}</span>
              <StatusTag status={status} />
            </div>
            <p className="text-sm font-medium text-zinc-900 mb-1">
              {customerName}
            </p>
            <p className="text-sm text-zinc-600 truncate mb-2">{serviceItem}</p>
            <div className="mt-2">
              <StaffAvatar name={staff || null} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/admin/reservations/${reservationId}`}
      className={`block bg-white border border-zinc-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${getStatusBorderColor(
        status
      )}`}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-zinc-900">{time}</span>
          <StatusTag status={status} />
        </div>
        <p className="text-sm font-medium text-zinc-900 truncate">
          {customerName}
        </p>
        <p className="text-xs text-zinc-600 truncate">{serviceItem}</p>
        <div className="mt-1">
          <StaffAvatar name={staff || null} />
        </div>
      </div>
    </Link>
  );
}

