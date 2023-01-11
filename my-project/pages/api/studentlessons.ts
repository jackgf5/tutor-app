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
      const { studentId } = req.body;

      const lessons = await prisma.lesson.findMany({
        where: {
          studentId: studentId,
          confirmed: true,
        },
      });

      res.status(200).json(lessons);
    }
  }
}
