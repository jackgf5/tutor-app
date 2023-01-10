import { Lesson } from "@prisma/client";
import React from "react";
import TableBodyDashboard from "../TableBody/TableBodyDashboard";

const LessonsDashboard = ({ lessons }: { lessons: Lesson[] }) => {
  return (
    <div className="overflow-scroll rounded-lg border border-gray-200 shadow-sm  w-1/2 h-full scrollbar-hide">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Confirmed
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Date
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        {lessons.map((lesson: any) => (
          <TableBodyDashboard
            studentId={lesson.studentId}
            date={lesson.date}
            startTime={lesson.startTime}
            endTime={lesson.endTime}
            confirmed={lesson.confirmed}
            studentName={lesson.student.name}
          />
        ))}
      </table>
    </div>
  );
};

export default LessonsDashboard;
