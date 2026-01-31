import React from "react";
import Calendar from "react-calendar";
import { isSameDay, isBefore, addDays, subDays } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "../../app/globals.css";

const StreakCalendar = ({ activityLog }) => {
  console.log("Activity Log:", activityLog);

  // 1. Convert string dates to Date objects and sort them
  const sortedDates = activityLog
    .map((logDate) => new Date(logDate))
    .sort((a, b) => a - b);
  console.log("Sorted Dates:", sortedDates);


  // 2. Create a Set for quick lookups
  const activeDaysSet = new Set(
    sortedDates.map((date) => date.toDateString())
  );
  console.log("Active Days Set:", activeDaysSet);


  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      if (!activeDaysSet.has(dateString)) return null;

      const isFirst = !activeDaysSet.has(subDays(date, 1).toDateString());
      const isLast = !activeDaysSet.has(addDays(date, 1).toDateString());

      let className = "highlight-streak";
      if (isFirst && isLast) {
        className += " streak-single";
      } else if (isFirst) {
        className += " streak-start";
      } else if (isLast) {
        className += " streak-end";
      } else {
        className += " streak-middle";
      }
      console.log(`Date: ${dateString}, Class: ${className}`);
      return className;
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full max-w-md">
      <div className="calendar-container flex justify-center">
        <Calendar
          tileClassName={tileClassName}
          prev2Label={null}
          next2Label={null}
          showFixedNumberOfWeeks={true}
        />
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          <span>Inactive</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
