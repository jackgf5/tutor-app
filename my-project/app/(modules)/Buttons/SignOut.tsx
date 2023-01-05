"use client";
import React from "react";
import { signOut } from "next-auth/react";
import GeneralStyles from "../../(styles)/general.module.css";
import classNames from "classnames";

const SignOut = () => {
  return (
    <div
      onClick={() => {
        signOut();
      }}
      className={classNames(GeneralStyles.button2, "mr-4 ")}
    >
      LOGOUT
    </div>
  );
};

export default SignOut;
