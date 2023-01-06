import { Role } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { roleCheckApi } from "../../lib/RoleCheckApi/RoleCheckApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if ((await roleCheckApi(req, res, "STUDENT")) === false) {
      res.status(401).json({ msg: "unauhorised" });
    } else {
      const { teacherId, studentId, startTime, endTime, date } = req.body;
      const overlappingLessons = await prisma.lesson.findMany({
        where: {
          AND: [
            { startTime: { lte: endTime } },
            { endTime: { gte: startTime } },
            { date: { equals: date } },
          ],
        },
      });

      if (overlappingLessons.length > 0) {
        res.status(409).json({ msg: "time taken" });
      } else {
        const lesson = await prisma.lesson.create({
          data: {
            date,
            startTime,
            endTime,
            student: {
              connect: { id: studentId },
            },
            teacher: {
              connect: { id: teacherId },
            },
          },
        });
        res.status(200).json(lesson);
      }
    }
  }
}
