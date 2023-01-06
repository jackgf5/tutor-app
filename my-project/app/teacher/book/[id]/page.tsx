import { redirect } from "next/navigation";
import React from "react";
import Calender from "../../../(modules)/Calender/Calender";
import { roleCheck } from "../../../../lib/RoleCheck/RoleCheck";
const Page = async () => {
  if ((await roleCheck("STUDENT")) === false) {
    redirect("/");
  }
  return (
    <div className="w-full h-screen">
      <Calender />
    </div>
  );
};

export default Page;
