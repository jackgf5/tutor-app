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
      const { teacherId } = req.body;

      const teacher = await prisma.user.findUnique({
        where: { id: teacherId },
      });

      const availableTimes = teacher?.availableTimes;
      res.status(200).json(availableTimes);
    }
  }
}
