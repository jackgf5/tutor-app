import { Role } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { roleCheckApi } from "../../../lib/RoleCheckApi/RoleCheckApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    /*if ((await roleCheckApi(req, res, "ADMIN")) === false) {
      res.status(401).json({ msg: "unauhorised" });
    }*/
    const { currentRole, roleToChange, id } = req.body;

    if (currentRole !== roleToChange) {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role: roleToChange as Role,
        },
      });
      res.status(200).json(updatedUser);
    } else {
      res.status(200).json({ msg: "already has role" });
    }
  }
}
