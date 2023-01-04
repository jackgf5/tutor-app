import React from "react";
import { roleCheck } from "../../lib/RoleCheck/RoleCheck";
import { redirect } from "next/navigation";
import PageSwitch from "../(modules)/PageSwitch/PageSwitch";

const Page = async () => {
  if ((await roleCheck("TEACHER")) === false) {
    redirect("/");
  }
  return (
    <div>
      <PageSwitch />
    </div>
  );
};

export default Page;
