import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import classNames from "classnames";

const Calender = () => {
  let today = startOfToday(); // Mon Oct 6 2014 00:00:00
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy")); //OCT-2014
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date()); //STRING -> DATE
  let [selectedDay, setSelectedDay] = useState(today); //Day selected by user

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  let days = eachDayOfInterval({
    //Dates between time interval
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  return (
    <div>
      <div className="flex justify-center  h-[5rem] w-[100%] shadow-xl rounded-lg bg-white   ">
        <button
          type="button"
          onClick={previousMonth}
          className=" w-[3rem] text-gray-400 hover:text-gray-500 flex items-center justify-center "
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>

        <h2 className="flex font-semibold text-gray-900  w-[14rem] items-center justify-center ">
          {format(firstDayCurrentMonth, "MMMM yyyy").toUpperCase()}
        </h2>

        <button
          onClick={nextMonth}
          type="button"
          className=" 
                w-[3rem] text-gray-400 hover:text-gray-500 flex items-center justify-center"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className=" w-[100%] h-[46.5vh]  p-10 shadow-xl rounded-xl bg-white  ">
        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(day);
                }}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    "text-emerald-500",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-emerald-500",
                  isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    "bg-emerald-500",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calender;
