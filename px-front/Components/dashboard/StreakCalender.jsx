"use client";
import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO,
  isYesterday,
  differenceInDays,
} from "date-fns";

const StreakCalendar = ({ streakDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate current consecutive streak
  const calculateStreak = () => {
    if (streakDates.length === 0) return 0;

    const sortedDates = streakDates
      .map((d) => parseISO(d))
      .sort((a, b) => b - a); // Newest first

    let count = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start checking from today or yesterday
    let checkDate = isSameDay(sortedDates[0], today)
      ? today
      : isYesterday(sortedDates[0])
      ? sortedDates[0]
      : null;

    if (!checkDate) return 0;

    for (let i = 0; i < sortedDates.length; i++) {
      if (isSameDay(sortedDates[i], checkDate)) {
        count++;
        checkDate = addDays(checkDate, -1);
      } else {
        break;
      }
    }
    return count;
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between py-1 px-2 bg-gray-50 border-b">
      <h2 className="text-sm font-bold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-2 hover:bg-gray-200 rounded"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-2 hover:bg-gray-200 rounded"
        >
          →
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 mb-2 border-b">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500 py-1 uppercase"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isStreak = streakDates.includes(formattedDate);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day}
            className={`relative h-6 flex items-center justify-center border-sm transition-all
              ${
                !isSameMonth(day, monthStart)
                  ? "text-gray-300"
                  : "text-gray-700"
              }
              ${isStreak ? "bg-orange-100 text-orange-700 font-bold" : ""}
            `}
          >
            <span
              className={`z-10 text-sm ${isToday ? "border-b-2 border-blue-500" : ""}`}
            >
              {format(day, "d")}
            </span>
            {isStreak && (
              <div className="absolute inset-0 bg-orange-400 opacity-20 rounded-lg m-1" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-md w-60 mx-auto bg-white shadow-xl rounded-xl overflow-hidden border">
      <div className="p-2 bg-blue-400 text-white flex justify-between items-center">
        <div className="flex gap-5" >
          <h3 className="text-xs font-black">{calculateStreak()} Days Streak 🔥</h3>
        </div>
      </div>
      {renderHeader()}
      <div className="p-2">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default StreakCalendar;
