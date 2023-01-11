"use client";
import { format, parseISO } from "date-fns";

const Lesson = ({ lesson }: any) => {
  return (
    <tr className="hover:bg-gray-50 h-[20%] w-full">
      <td className="px-6 py-4 text-center">Teacher Name</td>
      <td className="px-6 py-4 text-center">
        {format(parseISO(lesson.date), "dd-MM-yyyy")}
      </td>
      <td className="px-6 py-4 text-center">
        {format(parseISO(lesson.startTime), "HH:mm") +
          "-" +
          format(parseISO(lesson.endTime), "HH:mm")}
      </td>
      <td className="px-6 py-4 text-center">Maths</td>
    </tr>
  );
};

export default Lesson;
