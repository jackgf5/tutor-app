import { redirect } from "next/navigation";
import React from "react";
import PageSwitch from "../(modules)/PageSwitch/PageSwitch";
import { roleCheck } from "../../lib/RoleCheck/RoleCheck";

const Page = async () => {
  if ((await roleCheck("ADMIN")) === false) {
    redirect("/");
  }
  return (
    <div>
      <PageSwitch />
    </div>
  );
};

export default Page;
