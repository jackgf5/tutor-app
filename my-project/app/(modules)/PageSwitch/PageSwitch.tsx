"use client";

import GeneralStyles from "../../(styles)/general.module.css";
import { useRouter } from "next/navigation";

const PageSwitch = () => {
  const router = useRouter();

  return (
    <div className="flex gap-4 mx-auto justify-center items-center w-full h-screen">
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
    </div>
  );
};

export default PageSwitch;
