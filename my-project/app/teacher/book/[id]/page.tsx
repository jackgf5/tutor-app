import { redirect } from "next/navigation";
import React from "react";
import Calender from "../../../(modules)/Calender/Calender";
import { roleCheck } from "../../../../lib/RoleCheck/RoleCheck";
const Page = async () => {
  if ((await roleCheck("STUDENT")) === false) {
    redirect("/");
  }
  return (
    <div className="w-full h-screen scrollbar-hide flex">
      <div className="flex w-full h-2/3 justify-center items-center p-5">
        <Calender />
      </div>
    </div>
  );
};

export default Page;
