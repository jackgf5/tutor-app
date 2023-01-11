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
import { Lesson } from "@prisma/client";

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
  let [studentLessons, setStudentLessons] = useState<Lesson[]>();
  let [selectedButtonStart, setSelectedButtonStart] = useState<string>();
  let [selectedButtonEnd, setSelectedButtonEnd] = useState<string>();
  let [availableTimes, setAvailableTimes] = useState<string[]>([]);
  let [loading, setLoading] = useState<Boolean>(true);
  let [loading2, setLoading2] = useState<Boolean>(true);
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

  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch("/api/availabletimes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId }),
        });

        if (response) {
          const response2 = await response.json();
          setAvailableTimes(response2);
          console.log(response2);
          setLoading(false);
        }
      } catch (error) {
        console.log("error");
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData2() {
      try {
        let response = await fetch("/api/studentlessons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId }),
        });

        if (response) {
          const response2 = await response.json();
          setStudentLessons(response2);
          setLoading2(false);
        }
      } catch (error) {
        console.log("error");
      }
    }
    getData2();
  }, []);

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
          console.log(response);
        }
      } catch (error) {
        console.log("error");
      }
    } else {
      console.log("not all info given");
    }
  }

  return (
    <div className="flex mt-[10rem] w-full flex-col  h-full items-center justify-center gap-4 md:flex-row md:w-2/3 scrollbar-hid md:mt-[14rem]">
      <div className="flex flex-col  h-full justify-center items-center gap-2 w-full md:w-2/3">
        <div className="flex justify-center  h-[15%] w-[100%] shadow-md rounded-lg bg-white  ">
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
        {loading && loading2 && !studentLessons ? (
          <div className=" w-[100%] h-[85%] p-10 shadow-md rounded-xl bg-white  "></div>
        ) : (
          <div className=" w-[100%] h-[85%] p-10 shadow-md rounded-xl bg-white  ">
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
                        "text-[#570DF8]",
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
                        "bg-[#570DF8]",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-[#570DF8]",
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

                  <div className="w-1 h-1 mx-auto mt-1">
                    {studentLessons!.some((lesson: any) =>
                      isSameDay(parseISO(lesson.date), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-[#570DF8]"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-8 w-[80%] items-center justify-center  ">
            {availableTimes.map((timeISO) => {
              const date = new Date(timeISO);
              const timeString = format(date, "HH:mm"); //DATE -> 08:00"
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
      )}
    </div>
  );
};

export default Calender;
