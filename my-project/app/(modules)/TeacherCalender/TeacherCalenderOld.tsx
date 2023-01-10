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
import Lesson from "../Lesson/Lesson";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const Calender = ({ session }: { session: Session | null }) => {
  const teacherId = session?.user?.id;
  const router = useRouter();
  let today = startOfToday(); // Mon Oct 6 2014 00:00:00
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy")); //OCT-2014
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date()); //STRING -> DATE
  let [selectedDay, setSelectedDay] = useState(today); //Day selected by user
  let [teacherLessons, setTeacherLessons] = useState([]);
  let [loading, setLoading] = useState<Boolean>(true);
  let [loading2, setLoading2] = useState<Boolean>(true);
  let days = eachDayOfInterval({
    //Dates between time interval
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const selectedDaylessons = teacherLessons.filter((lesson) =>
    isSameDay(parseISO(lesson.date), selectedDay)
  );

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

  async function getData() {
    try {
      let response = await fetch("/api/teacherlessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId }),
      });

      if (response) {
        const response2 = await response.json();
        setTeacherLessons(response2);

        setLoading(false);
      }
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex w-2/3 h-full items-center justify-center">
      <div className="flex flex-col  h-full justify-center items-center gap-2 w-1/2">
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
        {loading && loading2 ? (
          <div>loading...</div>
        ) : (
          <div className=" w-[100%] h-[70%] p-10 shadow-xl rounded-xl bg-white  ">
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
                      console.log(selectedDaylessons);
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

                  <div className="w-1 h-1 mx-auto mt-1">
                    {teacherLessons.some((lesson: any) =>
                      isSameDay(parseISO(lesson.date), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <table className="border-collapse text-left text-sm overflow-scroll scrollbar-hide h-[5rem] w-[100%] shadow-xl rounded-lg bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Student
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Date
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Time
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Subject
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 h-[5rem] w-[100%]  rounded-lg bg-white ">
          {selectedDaylessons.length > 0 ? (
            selectedDaylessons.map((lesson) => (
              <Lesson key={lesson.id} lesson={lesson} callback={getData} />
            ))
          ) : (
            <tr>
              <th></th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Calender;
