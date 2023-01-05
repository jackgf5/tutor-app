import React from "react";
import { prisma } from "../../../lib/prisma";
import TableBody from "../TableBody/TableBody";
import { User } from "@prisma/client";

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
        {teachers.map((teacher) => (
          <TableBody
            key={teacher.id}
            image={teacher.image}
            name={teacher.name}
            email={teacher.email}
            pricing={teacher.pricing}
            subjects={teacher.subjects}
          />
        ))}
      </table>
    </div>
  );
};

export default MultiTable;
