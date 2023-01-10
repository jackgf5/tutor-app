"use client";

import { Lesson } from "@prisma/client";
import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import { LessonContext } from "./Context/LessonContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const addLessons = (lessonsToAdd: Lesson[]) => {
    setLessons([...lessons, ...lessonsToAdd]);
  };
  return (
    <SessionProvider>
      <LessonContext.Provider
        value={{
          lessons,
          addLessons,
        }}
      >
        {children}
      </LessonContext.Provider>
    </SessionProvider>
  );
}
