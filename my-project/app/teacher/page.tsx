import React from "react";
import { roleCheck } from "../../lib/RoleCheck/RoleCheck";
import { redirect } from "next/navigation";
import PageSwitch from "../(modules)/PageSwitch/PageSwitch";
import MultiTable from "../(modules)/MultiTable/MultiTable";

const Page = async () => {
  return (
    <div>
      <MultiTable />
    </div>
  );
};

export default Page;
