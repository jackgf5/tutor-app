"use client";
import React, { useEffect, useTransition } from "react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

const Lesson = ({ lesson, callback }: any) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function deleteLesson(lessonId: string) {
    try {
      let response = await fetch("/api/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lessonId }),
      });

      if (response) {
        response = await response.json();
        await Promise.all([callback(), router.refresh()]);
      }
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <tr className="hover:bg-gray-50 h-[20%] w-full">
      <td className="px-6 py-4">{lesson.student.name}</td>
      <td className="px-6 py-4 h-1/2">
        {format(parseISO(lesson.date), "dd-MM-yyyy")}
      </td>
      <td className="px-6 py-4">
        {format(parseISO(lesson.startTime), "HH:mm") +
          "-" +
          format(parseISO(lesson.endTime), "HH:mm")}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => {
            deleteLesson(lesson.id);
          }}
          className="bg-red-500 w-2/3 h-[3rem]  text-white text-center cursor-pointer shadow-xl rounded-lg flex-1 mt-4 font-bold"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default Lesson;
