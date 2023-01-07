import React from "react";
import { format } from "date-fns";
import ConfirmButton from "../Buttons/ConfirmButton";

const TableBodyDashboard = ({
  studentName,
  studentId,
  date,
  startTime,
  endTime,
  confirmed,
  lessonId,
}: any) => {
  return (
    <>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        <tr className="hover:bg-gray-50">
          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div className="relative h-10 w-10">{studentName}</div>
          </th>
          <td className="px-6 py-4">
            <span
              className={`inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold ${
                confirmed
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              } `}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  confirmed ? "bg-green-600" : "bg-red-600"
                }`}
              ></span>
              {confirmed ? "CONFIRMED" : "UNCONFIRMED"}
            </span>
          </td>
          <td className="px-6 py-4">{format(date, "dd-MM-yyyy")}</td>
          <td className="px-6 py-4">
            {format(startTime, "HH:mm") + "-" + format(endTime, "HH:mm")}
          </td>
          <td className="px-6 py-4">
            {confirmed ? <div></div> : <ConfirmButton lessonId={lessonId} />}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableBodyDashboard;
