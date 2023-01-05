import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export const roleCheckApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  role: string
) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== role) {
    return false;
  } else {
    return true;
  }
};
