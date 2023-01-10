"use client";

import GeneralStyles from "../../(styles)/general.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PageSwitch = () => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <Link href="/student" className={`bg-blue-500  ${GeneralStyles.button}`}>
        STUDENT
      </Link>

      <Link href="/teacher" className={` bg-blue-500 ${GeneralStyles.button}`}>
        TEACHER
      </Link>

      <Link href="/admin" className={` bg-blue-500  ${GeneralStyles.button}`}>
        ADMIN
      </Link>

      <Link
        href="/teacher/book"
        className={` bg-blue-500  ${GeneralStyles.button}`}
      >
        BOOK
      </Link>

      <Link
        href="/teacher/dashboard"
        className={` bg-blue-500  ${GeneralStyles.button}`}
      >
        DASHBOARD
      </Link>
    </div>
  );
};

export default PageSwitch;
