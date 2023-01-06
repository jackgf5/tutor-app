import React from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import TableNavigateButtons from "../Buttons/TableNavigateButtons";

interface Props {
  name: string | null;
  email: string | null;
  image: string | null;
  pricing: number;
  subjects: string[];
  id: string;
}

const TableBody = ({ image, name, email, pricing, subjects, id }: Props) => {
  return (
    <>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        <tr className="hover:bg-gray-50">
          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div className="relative h-10 w-10">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src={"https://i.stack.imgur.com/l60Hf.png"}
                alt=""
              />
              <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-700">{name}</div>
              <div className="text-gray-400">{email}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              Active
            </span>
          </td>
          <td className="px-6 py-4">
            ${pricing} <span className="text-sm">/hr</span>
          </td>
          <td className="px-6 py-4">
            <div className="flex gap-2">
              {subjects.map((subject) => (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                  {subject}
                </span>
              ))}
            </div>
          </td>
          <td className="px-6 py-4">
            <TableNavigateButtons id={id} />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableBody;
