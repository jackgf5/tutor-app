import React from "react";
import { roleCheck } from "../../lib/RoleCheck/RoleCheck";
import { redirect } from "next/navigation";

import MultiTable from "../(modules)/MultiTable/MultiTable";
import ExploreOptions from "../(modules)/ExploreOptions/ExploreOptions";

const Page = async () => {
  if ((await roleCheck("STUDENT")) === false) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex p-5 gap-4">
      <ExploreOptions />
      {/* @ts-expect-error Async Server Component */}
      <MultiTable />
    </div>
  );
};

export default Page;
