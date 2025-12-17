"use client";

import { useState } from "react";
import { getStaffList, getShiftsByWeek } from "../data";
import Link from "next/link";

type ShiftType = "早班" | "晚班" | "全日班";

function getShiftTypeColor(shiftType: ShiftType): string {
  switch (shiftType) {
    case "早班":
      return "bg-blue-100 text-blue-800";
    case "晚班":
      return "bg-purple-100 text-purple-800";
    case "全日班":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getWeekDays(startDate: Date): Date[] {
  const days: Date[] = [];
  const start = new Date(startDate);
  start.setDate(startDate.getDate() - startDate.getDay());
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push(date);
  }
  return days;
}

function formatTime(time: string): string {
  return time.split(":")[0];
}

export default function ScheduleOverviewPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const weekDays = getWeekDays(currentDate);
  const staffList = getStaffList();
  const shifts = getShiftsByWeek(currentDate);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  const getShiftsForStaffAndDate = (staffId: number, date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return shifts.filter(
      (s) => s.staff_id === staffId && s.date === dateStr
    );
  };

  const getShiftsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return shifts.filter((s) => s.date === dateStr);
  };

  const formatDateRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    return `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}`;
  };

  const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDayNamesZh = ["一", "二", "三", "四", "五", "六", "日"];

  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">
        排班總覽 (Schedule)
      </h1>

      {/* 控制列 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToday}
            className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 text-sm"
          >
            Today
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousWeek}
              className="p-2 rounded hover:bg-zinc-100"
            >
              ←
            </button>
            <span className="text-sm font-medium text-zinc-900 min-w-[200px] text-center">
              {formatDateRange()}
            </span>
            <button
              onClick={handleNextWeek}
              className="p-2 rounded hover:bg-zinc-100"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet: 週視圖網格 */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <div className="min-w-[800px]">
          {/* 表頭 */}
          <div className="grid grid-cols-8 border-b border-zinc-200 sticky top-0 bg-white z-10">
            <div className="p-3 text-sm font-medium text-zinc-700 bg-zinc-50 border-r border-zinc-200">
              人員
            </div>
            {weekDays.map((date, index) => (
              <div
                key={index}
                className="p-3 text-center border-r border-zinc-200 last:border-r-0 bg-zinc-50"
              >
                <div className="text-xs text-zinc-600 mb-1">
                  {weekDayNamesZh[date.getDay()]}
                </div>
                <div className="text-sm font-medium text-zinc-900">
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* 人員列 */}
          {staffList.map((staff) => (
            <div key={staff.staff_id} className="grid grid-cols-8 border-b border-zinc-200">
              <div className="p-3 text-sm font-medium text-zinc-900 bg-zinc-50 border-r border-zinc-200">
                {staff.name}
              </div>
              {weekDays.map((date, index) => (
                <div
                  key={index}
                  className="min-h-[80px] p-2 border-r border-zinc-200 last:border-r-0 bg-white"
                >
                  {getShiftsForStaffAndDate(staff.staff_id, date).map(
                    (shift) => (
                      <Link
                        key={shift.shift_id}
                        href={`/admin/staff/shifts/${shift.shift_id}`}
                        className={`block p-2 rounded mb-1 cursor-pointer hover:opacity-80 ${getShiftTypeColor(
                          shift.shift_type as ShiftType
                        )}`}
                      >
                        <div className="text-xs font-medium">
                          {shift.shift_type}
                        </div>
                        <div className="text-xs">
                          {formatTime(shift.start_time)}-
                          {formatTime(shift.end_time)}
                        </div>
                      </Link>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 日期篩選列表 */}
      <div className="md:hidden space-y-4">
        {/* 日期選擇器 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-zinc-700 mb-3">
            選擇日期
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedDate(date.toISOString().split("T")[0])
                }
                className={`p-2 rounded text-xs ${
                  selectedDate === date.toISOString().split("T")[0]
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                <div>{weekDayNamesZh[date.getDay()]}</div>
                <div className="font-medium">{date.getDate()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 選定日期的班表列表 */}
        {selectedDate && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-700">
              {new Date(selectedDate).toLocaleDateString("zh-TW", {
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </h3>
            {getShiftsForDate(new Date(selectedDate)).length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-zinc-500">
                當日無排班
              </div>
            ) : (
              getShiftsForDate(new Date(selectedDate)).map((shift) => (
                <Link
                  key={shift.shift_id}
                  href={`/admin/staff/shifts/${shift.shift_id}`}
                  className="block bg-white border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {shift.staff_name}
                      </p>
                      <p
                        className={`inline-block px-2 py-1 rounded text-xs mt-1 ${getShiftTypeColor(
                          shift.shift_type as ShiftType
                        )}`}
                      >
                        {shift.shift_type}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-700">
                      {shift.start_time} - {shift.end_time}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

