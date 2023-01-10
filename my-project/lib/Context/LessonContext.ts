import { Lesson } from "@prisma/client";
import { createContext, useContext } from "react";

interface ILessonContext {
  lessons: Lesson[];
  addLessons: (Lessons: Lesson[]) => void;
}

export const LessonContext = createContext<ILessonContext>({
  lessons: [],
  addLessons(Lessons) {},
});

export const useLessonContext = () => {
  return useContext(LessonContext);
};
