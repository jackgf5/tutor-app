"use client";
import React from "react";
import { signIn } from "next-auth/react";
import GeneralStyles from "../../(styles)/general.module.css";

const SignOut = () => {
  return (
    <div
      onClick={() => {
        signIn("google");
      }}
      className={`${GeneralStyles.button} bg-blue-500`}
    >
      LOGIN
    </div>
  );
};

export default SignOut;
