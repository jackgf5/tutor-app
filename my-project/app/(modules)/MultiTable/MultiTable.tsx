import React from "react";
import { prisma } from "../../../lib/prisma";
import TableBody from "../TableBody/TableBody";
import { User } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

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
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Price
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Subjects
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        {teachersFiltered.map((teacher) => (
          <TableBody
            key={teacher.id}
            image={teacher.image}
            name={teacher.name}
            email={teacher.email}
            pricing={teacher.pricing}
            subjects={teacher.subjects}
            id={teacher.id}
          />
        ))}
      </table>
    </div>
  );
};

export default MultiTable;
