import React from "react";
import { prisma } from "../../../lib/prisma";
import TableBody from "../TableBody/TableBody";
import { User } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import TeacherTableRow from "../TeacherTableRow/TeacherTableRow";

async function getTeachers(): Promise<User[]> {
  try {
    const response = await prisma.user.findMany();
    return response;
  } catch (error) {
    console.log("error");
    return [];
  }
}

const MultiTable = async () => {
  const teachers: User[] = await getTeachers();
  const session = await unstable_getServerSession(authOptions);
  const teachersFiltered = teachers.filter((teacher) => {
    return teacher.id !== session?.user?.id;
  });
  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pricing</th>
            <th>Subjects</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachersFiltered.map((teacher) => (
              <TeacherTableRow key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <tr>
              <th></th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MultiTable;
