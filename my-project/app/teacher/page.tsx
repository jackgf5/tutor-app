import React from "react";
import { roleCheck } from "../../lib/RoleCheck/RoleCheck";
import { redirect } from "next/navigation";
import PageSwitch from "../(modules)/PageSwitch/PageSwitch";
import MultiTable from "../(modules)/MultiTable/MultiTable";

const Page = async () => {
  if ((await roleCheck("STUDENT")) === false) {
    redirect("/");
  }

  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <MultiTable />
    </div>
  );
};

export default Page;
