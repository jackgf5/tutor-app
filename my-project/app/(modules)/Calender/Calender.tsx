"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
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

interface lessonData {
  [key: string]: string;
}

const Calender = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const teacherId = pathname?.split("/")[3];
  const studentId = session?.user?.id;

  let today = startOfToday(); // Mon Oct 6 2014 00:00:00
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy")); //OCT-2014
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date()); //STRING -> DATE
  let [selectedDay, setSelectedDay] = useState(today); //Day selected by user
  let [selectedTime, setSelectedTime] = useState({
    startTime: "",
    endTime: "",
  });
  let [selectedButtonStart, setSelectedButtonStart] = useState<string>();
  let [selectedButtonEnd, setSelectedButtonEnd] = useState<string>();

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

  const availableTimes = [
    "1970-01-01T08:00:00.000Z",
    "1970-01-01T09:00:00.000Z",
    "1970-01-01T10:00:00.000Z",
    "1970-01-01T11:00:00.000Z",
    "1970-01-01T12:00:00.000Z",
    "1970-01-01T13:00:00.000Z",
    "1970-01-01T14:00:00.000Z",
    "1970-01-01T15:00:00.000Z",
    "1970-01-01T16:00:00.000Z",
    "1970-01-01T17:00:00.000Z",
    "1970-01-01T18:00:00.000Z",
    "1970-01-01T19:00:00.000Z",
    "1970-01-01T20:00:00.000Z",
  ];

  function handleTimeClick(e: any, id: string) {
    if (selectedTime.startTime === "") {
      setSelectedTime((previousTime) => ({
        ...previousTime,
        startTime: e.target.value,
      }));
      setSelectedButtonStart(id);
    } else if (selectedTime.endTime === "") {
      setSelectedTime((previousTime) => ({
        ...previousTime,
        endTime: e.target.value,
      }));

      setSelectedButtonEnd(id);
    } else {
      setSelectedTime((previousTime) => ({
        startTime: e.target.value,
        endTime: "",
      }));
      setSelectedButtonStart(id);
      setSelectedButtonEnd("");
    }
  }

  async function handleSubmit() {
    console.log(selectedDay.toISOString());
    if (teacherId && studentId && selectedTime && selectedDay) {
      const lessonData = {
        teacherId,
        studentId,
        startTime: selectedTime.startTime,
        endTime: selectedTime.endTime,
        date: selectedDay.toISOString(),
      };

      try {
        let response = await fetch("/api/lessons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lessonData),
        });

        if (response) {
          response = await response.json();
        }
      } catch (error) {
        console.log("error");
      }
    } else {
      console.log("not all info given");
    }
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-1/2 h-full justify-center items-center gap-2">
        <div className="flex justify-center  h-[5rem] w-[80%] shadow-xl rounded-lg bg-white   ">
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
        <div className=" w-[80%] h-[48%] p-10 shadow-xl rounded-xl bg-white  ">
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
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-emerald-500",
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

      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="flex flex-wrap gap-8 w-[80%] items-center justify-center  ">
          {availableTimes.map((timeISO) => {
            const isoToDate = parseISO(timeISO); //ISO -> DATE
            const timeString = format(isoToDate, "HH:mm"); //DATE -> 08:00"
            return (
              <button
                key={timeISO}
                value={timeISO}
                onClick={(e) => handleTimeClick(e, timeISO)}
                className={`${
                  selectedButtonStart === timeISO ||
                  selectedButtonEnd === timeISO
                    ? "border-4  border-emerald-500 scale-105 transition-all  "
                    : "border-none"
                }   min-w-[13rem] h-[4rem]  text-center cursor-pointer shadow-xl rounded-lg flex-1   `}
              >
                {timeString}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleSubmit}
          className=" mt-8 font-bold text-white bg-emerald-500 border-2 border-emerald-500 w-[80%] h-[4rem] rounded-2xl text-xl shadow-xl "
        >
          BOOK
        </button>
      </div>
    </div>
  );
};

export default Calender;
