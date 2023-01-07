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

      await prisma.lesson.delete({
        where: { id: lessonId },
      });

      res.status(200).json({ msg: "Lesson deleted" });
    }
  }
}
