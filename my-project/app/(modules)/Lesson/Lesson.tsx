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
      <td className="px-6 py-4 text-center">{lesson.student.name}</td>
      <td className="px-6 py-4 text-center">
        {format(parseISO(lesson.date), "dd-MM-yyyy")}
      </td>
      <td className="px-6 py-4 text-center">
        {format(parseISO(lesson.startTime), "HH:mm") +
          "-" +
          format(parseISO(lesson.endTime), "HH:mm")}
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => {
            deleteLesson(lesson.id);
          }}
          className=" btn btn-primary btn-sm "
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default Lesson;
