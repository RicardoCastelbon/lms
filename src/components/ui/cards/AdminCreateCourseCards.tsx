
import { Course_lib} from "@prisma/client";
import React from "react";
import { FaHtml5, FaTrash } from "react-icons/fa";


type Props = {
  courseLib: Course_lib;
  onDelete: (courseLibId: number) => void;
};

const AdminCreateCourseCards = ({ courseLib, onDelete }: Props) => {

const handleDelete = () => {
    if (window.confirm("Are you sure")) {
    onDelete(courseLib.id)
       }
}
 
  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div className="flex flex-1 justify-center items-center bg-card rounded-t-lg">
        <FaHtml5 size="4em" />
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">

        <p>{courseLib.title}</p>
        <button
          className="bg-red-400 text-white py-1 px-2 rounded-md hover:bg-red-600"
           onClick={handleDelete}
           
        >
          {/* <FaTrash className="m-1"/> Delete */}
        Radera</button>
      </div>
    </div>
  );
};

export default AdminCreateCourseCards;
