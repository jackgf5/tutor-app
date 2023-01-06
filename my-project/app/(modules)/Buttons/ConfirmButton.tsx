"use client";

import GeneralStyles from "../../(styles)/general.module.css";
import { useRouter } from "next/navigation";

const ConfirmButton = ({ lessonId }: { lessonId: string }) => {
  const router = useRouter();

  async function handleConfirmSession() {
    try {
      let response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
        }),
      });

      if (response) {
        response = await response.json();
        router.refresh();
      }
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <button onClick={handleConfirmSession} className={GeneralStyles.button2}>
      CONFIRM
    </button>
  );
};

export default ConfirmButton;
