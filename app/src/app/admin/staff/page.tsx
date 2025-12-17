import { getStaffList } from "./data";
import StaffCard from "./components/StaffCard";

export default function StaffListPage() {
  const staffList = getStaffList();

  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">
        人員管理 (Staff)
      </h1>

      {/* Desktop/Tablet: 卡片網格 */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((staff) => (
          <StaffCard
            key={staff.staff_id}
            staffId={staff.staff_id}
            name={staff.name}
            role={staff.role}
            services={staff.services}
            status={staff.status}
          />
        ))}
      </div>

      {/* Mobile: 垂直堆疊卡片列表 */}
      <div className="md:hidden space-y-3">
        {staffList.map((staff) => (
          <StaffCard
            key={staff.staff_id}
            staffId={staff.staff_id}
            name={staff.name}
            role={staff.role}
            services={staff.services}
            status={staff.status}
            isMobile={true}
          />
        ))}
      </div>
    </div>
  );
}




