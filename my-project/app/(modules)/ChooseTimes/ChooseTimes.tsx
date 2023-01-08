import React from "react";
import GeneralStyles from "../../(styles)/general.module.css";
import { prisma } from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import UpdateTimes from "../Buttons/UpdateTimes";

async function getTeacherAvailableTimes(session: any) {
  const teacher = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  const teacherAvailableTimes = teacher?.availableTimes;
  return teacherAvailableTimes;
}

const ChooseTimes = async () => {
  const session = await unstable_getServerSession(authOptions);
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
  const teacherAvailableTimes = (await getTeacherAvailableTimes(
    session
  )) as Date[];
  const teacherAvailableTimesAsStrings = teacherAvailableTimes.map((time) =>
    time.toISOString()
  );
  return (
    <div className=" w-1/3">
      <div className="w-full flex items-center justify-center">
        <UpdateTimes
          teacherAvailableTimes={teacherAvailableTimesAsStrings}
          userId={session?.user?.id as string}
        />
      </div>
    </div>
  );
};

export default ChooseTimes;
