"use client";

import { signIn } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <div className="navbar-end">
      <button
        className=" btn btn-primary btn-sm mr-4"
        onClick={() => {
          signIn("google");
        }}
      >
        SIGN IN
      </button>
    </div>
  );
};

export default SignOut;
