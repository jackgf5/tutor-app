"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { prisma } from "../../../lib/prisma";
import { useRouter } from "next/navigation";
import GeneralStyles from "../../(styles)/general.module.css";

const UpdateTimes = ({
  teacherAvailableTimes,
  userId,
}: {
  teacherAvailableTimes: String[];
  userId: string;
}) => {
  const router = useRouter();

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

  const availableTimesAsDate = availableTimes.map((date) => {
    return new Date(date);
  });

  const dateTeacherAvailableTimes = teacherAvailableTimes.map(
    (time) => new Date(time as string)
  );

  const [teacherTimes, setTeacherTimes] = useState<Date[]>(
    dateTeacherAvailableTimes
  );

  const getClassName = (time: any) => {
    if (
      teacherTimes!.some(
        (teacherTime: Date) => teacherTime.getTime() === time.getTime()
      )
    ) {
      return "bg-green-500";
    }
    return "bg-red-500";
  };

  function handleTimeChange(currentTime: string) {
    const currentTimeDate: Date = new Date(currentTime);
    console.log(teacherTimes);
    if (
      teacherTimes.some(
        (teacherTime) => teacherTime.getTime() === currentTimeDate.getTime()
      )
    ) {
      // Remove time from teacherAvailableTimes
      setTeacherTimes(
        teacherTimes.filter(
          (teacherTime) => teacherTime.getTime() !== currentTimeDate.getTime()
        )
      );
    } else {
      // Add time to teacherAvailableTimes
      setTeacherTimes([...teacherTimes, currentTimeDate]);
    }
    console.log(teacherTimes);
  }

  const updatedTimes = async function updateTimes() {
    try {
      let response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherTimes,
          userId,
        }),
      });

      if (response) {
        response = await response.json();
        console.log(response);
        router.refresh();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="w-1/2 flex flex-wrap gap-2 ">
      {availableTimesAsDate.map((time) => {
        const timeString = format(time, "HH:mm"); //DATE -> 08:00"
        return (
          <button
            key={time.toISOString()}
            value={time.toISOString()}
            className={`${getClassName(time)} text-white p-4`}
            onClick={(e) => {
              handleTimeChange(e.currentTarget.value);
            }}
          >
            {timeString}
          </button>
        );
      })}
      <button className={GeneralStyles.button2} onClick={updatedTimes}>
        here
      </button>
    </div>
  );
};

export default UpdateTimes;
