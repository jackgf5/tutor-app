import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { prisma } from "../../../lib/prisma";
import { roleCheck } from "../../../lib/RoleCheck/RoleCheck";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import TableBodyDashboard from "../../(modules)/TableBody/TableBodyDashboard";
import ChooseTimes from "../../(modules)/ChooseTimes/ChooseTimes";
import TeacherCalender from "../../(modules)/TeacherCalender/TeacherCalender";
import LessonsDashboard from "../../(modules)/LessonsDashboard/LessonsDashboard";

async function getLessons(session: Session | null) {
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
  const session = await unstable_getServerSession(authOptions);
  if ((await roleCheck("TEACHER")) === false) {
    redirect("/");
  }
  const lessons = await getLessons(session);

  const confirmedLessons = lessons.filter((lesson) => {
    return lesson.confirmed === true;
  });

  const unconfirmedLessons = lessons.filter((lesson) => {
    return lesson.confirmed === false;
  });

  return (
    <div className="w-full h-screen ">
      <div className=" flex w-full h-2/3 justify-center items-center p-5">
        <TeacherCalender session={session} />
      </div>

      {/*<div className=" w-full h-1/3 flex p-5 scrollbar-hide gap-3">
        <LessonsDashboard lessons={unconfirmedLessons} />
        <LessonsDashboard lessons={confirmedLessons} />
      </div>*/}
    </div>
  );
};

export default Page;
