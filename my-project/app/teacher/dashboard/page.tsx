import { redirect } from "next/navigation";
import React from "react";
import Calender from "../../(modules)/Calender/Calender";
import { prisma } from "../../../lib/prisma";
import { roleCheck } from "../../../lib/RoleCheck/RoleCheck";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import TableBodyDashboard from "../../(modules)/TableBody/TableBodyDashboard";
import ChooseTimes from "../../(modules)/ChooseTimes/ChooseTimes";
import TeacherCalender from "../../(modules)/TeacherCalender/TeacherCalender";

async function getLessons() {
  const session = await unstable_getServerSession(authOptions);
  const lessons = await prisma.lesson.findMany({
    where: {
      teacher: {
        id: session?.user?.id,
      },
    },
    include: {
      student: true,
    },
  });
  return lessons;
}

const Page = async () => {
  if ((await roleCheck("TEACHER")) === false) {
    redirect("/");
  }
  const lessons = await getLessons();

  const confirmedLessons = lessons.filter((lesson) => {
    return lesson.confirmed === true;
  });

  const unconfirmedLessons = lessons.filter((lesson) => {
    return lesson.confirmed === false;
  });

  return (
    <div className="w-full h-screen">
      <div className=" w-full h-1/3 flex p-5 scrollbar-hide gap-3">
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
            {unconfirmedLessons.map((lesson: any) => (
              <TableBodyDashboard
                studentId={lesson.studentId}
                date={lesson.date}
                startTime={lesson.startTime}
                endTime={lesson.endTime}
                confirmed={lesson.confirmed}
                studentName={lesson.student.name}
                lessonId={lesson.id}
              />
            ))}
          </table>
        </div>

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
            {confirmedLessons.map((lesson: any) => (
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
      </div>

      <div className=" flex w-full h-2/3 justify-center items-center p-5">
        <TeacherCalender />
        <ChooseTimes />
      </div>
    </div>
  );
};

export default Page;
