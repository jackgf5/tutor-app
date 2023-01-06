import { unstable_getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import SignIn from "../Buttons/SignIn";
import SignOut from "../Buttons/SignOut";
import PageSwitch from "../PageSwitch/PageSwitch";
import RoleSwitch from "../RoleSwitch/RoleSwitch";

const Navbar = async () => {
  const session = await unstable_getServerSession(authOptions);

  function handleContent(): JSX.Element {
    if (session && session.user?.role && session.user.id) {
      return (
        <div className="w-full h-full flex items-center justify-evenly gap-[3rem]">
          <PageSwitch />
          <RoleSwitch role={session.user?.role} id={session.user.id} />
          <SignOut />
        </div>
      );
    } else {
      return (
        <div className=" w-full h-full flex items-center justify-center">
          <SignIn />
        </div>
      );
    }
  }

  return <div className="w-full h-[70px] shadow-sm">{handleContent()}</div>;
};

export default Navbar;
