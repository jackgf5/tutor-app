import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export const roleCheck = async (role: string) => {
  const session = await unstable_getServerSession(authOptions);
  if (!session) {
    return false;
  } else {
    return true;
  }
};
