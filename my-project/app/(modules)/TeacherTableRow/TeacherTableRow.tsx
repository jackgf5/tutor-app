const TeacherTableRow = ({ teacher }: any) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={teacher.image} />
              </div>
            </div>
            <div>
              <div className="font-bold">{teacher.name}</div>
              <div className="text-sm opacity-50">{teacher.email}</div>
            </div>
          </div>
        </td>
        <td>
          ${teacher.pricing}
          <span className="text-sm"> / hr</span>
          <br />
        </td>
        <td className="">
          {teacher.subjects.slice(0, 5).map((subject: any) => {
            return (
              <button className="btn btn-primary btn-xs mx-1">{subject}</button>
            );
          })}
        </td>
        <th>
          <button className="btn btn-primary btn-xs">details</button>
        </th>
      </tr>
    </>
  );
};

export default TeacherTableRow;
