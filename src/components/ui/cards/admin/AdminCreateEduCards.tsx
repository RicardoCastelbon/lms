import education from "@/src/pages/education";
import { Education } from "@prisma/client";
import { FileText, Info } from "lucide-react";
import React from "react";
import { FaHtml5, FaTrash } from "react-icons/fa";

type Props = {
 education: Education;
 onDelete: (educationId: number) => void;
  infoClickHandler: () => void;
  name: string;
};

const AdminCreateEduCards = ({
  education,
  onDelete,
  name,
}: Props) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      onDelete(education.id)
         }
  }

  return (
    <div className='relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary text-white rounded-md shadow-md hover:shadow-xl hover:scale-105 duration-200'>
      <FaTrash
        className='absolute top-2 right-2 hover:cursor-pointer'
        onClick={handleDelete}
      />

      <FileText size={48} />
      <h3>{name}</h3>
      {/* <button
        className='bg-green-400 text-white py-2 px-2 rounded-md hover:bg-green-600'
        onClick={infoClickHandler}
      >
        Info
      </button> */}
    </div>
  );
};

export default AdminCreateEduCards;
