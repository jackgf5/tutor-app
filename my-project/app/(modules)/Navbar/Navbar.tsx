import { unstable_getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import SignIn from "../Buttons/SignIn";
import SignOut from "../Buttons/SignOut";
import RoleSwitch from "../RoleSwitch/RoleSwitch";

const Navbar = async () => {
  const session = await unstable_getServerSession(authOptions);

  function handleContent(): JSX.Element {
    if (session) {
      return (
        <div>
          <RoleSwitch />
          <SignOut />
        </div>
      );
    } else {
      return <SignIn />;
    }
  }

  return (
    <div className="w-full h-[70px] shadow-xl relative">{handleContent()}</div>
  );
};

export default Navbar;
