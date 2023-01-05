import { redirect } from "next/navigation";
import React from "react";
import { roleCheck } from "../../lib/RoleCheck/RoleCheck";
import PageSwitch from "../(modules)/PageSwitch/PageSwitch";

const Page = async () => {
  if ((await roleCheck("STUDENT")) === false) {
    redirect("/");
  }
  return <div></div>;
};

export default Page;
