"use client";

import GeneralStyles from "../../(styles)/general.module.css";
import { useRouter } from "next/navigation";

const PageSwitch = () => {
  const router = useRouter();

  return (
    <div className="flex gap-4 justify-center items-center">
      <button
        onClick={() => {
          router.push("/student");
        }}
        value={"STUDENT"}
        className={`bg-blue-500  ${GeneralStyles.button}`}
      >
        STUDENT
      </button>

      <button
        onClick={() => {
          router.push("/teacher");
        }}
        value={"TEACHER"}
        className={` bg-blue-500 ${GeneralStyles.button}`}
      >
        TEACHER
      </button>

      <button
        onClick={() => {
          router.push("/admin");
        }}
        value={"ADMIN"}
        className={` bg-blue-500  ${GeneralStyles.button}`}
      >
        ADMIN
      </button>

      <button
        onClick={() => {
          router.push("/teacher/book");
        }}
        value={"BOOK"}
        className={` bg-blue-500  ${GeneralStyles.button}`}
      >
        BOOK
      </button>
    </div>
  );
};

export default PageSwitch;
