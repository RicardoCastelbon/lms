
import { Course_lib} from "@prisma/client";
import { FileText, Info } from "lucide-react";
import React from "react";
import { FaHtml5, FaTrash } from "react-icons/fa";


type Props = {
  courseLib: Course_lib;
  // onDelete: (courseLibId: number) => void;
  infoClickHandler: () => void;
  title: string;
};

const AdminCreateCourseCards = ({ courseLib, title, infoClickHandler }: Props) => {

// const handleDelete = () => {
//     if (window.confirm("Are you sure")) {
//     onDelete(courseLib.id)
//        }
// }
 
  return (
    <div className="relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary text-white rounded-md shadow-md hover:shadow-xl hover:scale-105 duration-200">
      {/* card header */}
      <Info
        className="absolute top-2 right-2 hover:cursor-pointer"
        onClick={infoClickHandler}
      />
      <FileText size={48} />
      <h3>{title}</h3>
        <button
          className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
           onClick={infoClickHandler}
           
        >
          {/* <FaTrash className="m-1"/> Delete */}
        Radera</button>
      </div>
  );
};

export default AdminCreateCourseCards;
