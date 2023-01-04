"use client";
import React, { useEffect, useState } from "react";
import GeneralStyles from "../../(styles)/general.module.css";
import { useRouter } from "next/navigation";

const RoleSwitch = ({ role, id }: { role: string; id: string }) => {
  const router = useRouter();

  const updateUserRole = async (
    currentRole: string,
    roleToChange: string,
    id: string
  ) => {
    const response = await fetch("/api/auth/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentRole, roleToChange, id }),
    });
    const responseJson = await response.json();
    router.refresh();
  };
  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          updateUserRole(role, "STUDENT", id);
        }}
        value={"STUDENT"}
        className={`${role === "STUDENT" ? "bg-yellow-500 " : "bg-blue-500"} ${
          GeneralStyles.button
        }`}
      >
        STUDENT
      </button>

      <button
        onClick={() => {
          updateUserRole(role, "TEACHER", id);
        }}
        value={"TEACHER"}
        className={`${role === "TEACHER" ? "bg-yellow-500 " : "bg-blue-500"} ${
          GeneralStyles.button
        }`}
      >
        TEACHER
      </button>

      <button
        onClick={() => {
          updateUserRole(role, "ADMIN", id);
        }}
        value={"ADMIN"}
        className={`${role === "ADMIN" ? "bg-yellow-500 " : "bg-blue-500"} ${
          GeneralStyles.button
        }`}
      >
        ADMIN
      </button>
    </div>
  );
};

export default RoleSwitch;
