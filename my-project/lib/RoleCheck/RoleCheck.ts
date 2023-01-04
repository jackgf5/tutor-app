import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export const roleCheck = async (role: string) => {
  const session = await unstable_getServerSession(authOptions);
  if (!session || session.user?.role !== role) {
    return false;
  } else {
    return true;
  }
};
