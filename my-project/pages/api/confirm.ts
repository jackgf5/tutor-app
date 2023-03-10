import { Role } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { roleCheckApi } from "../../lib/RoleCheckApi/RoleCheckApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if ((await roleCheckApi(req, res, "TEACHER")) === false) {
      res.status(401).json({ msg: "unauhorised" });
    } else {
      const { lessonId } = req.body;
      console.log(lessonId);

      const updatedLesson = await prisma.lesson.update({
        where: { id: lessonId },
        data: {
          confirmed: true,
        },
      });

      const startTime = updatedLesson.startTime;
      const endTime = updatedLesson.endTime;
      const date = updatedLesson.date;

      await prisma.lesson.deleteMany({
        where: {
          AND: [
            { startTime: { lte: endTime } },
            { endTime: { gte: startTime } },
            { date: { equals: date } },
            { confirmed: { equals: false } },
          ],
        },
      });

      res.status(200).json(updatedLesson);
    }
  }
}
