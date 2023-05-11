
import { Education } from "@prisma/client";
import { log } from "console";
import Link from "next/link";
import React from "react";
import { FaHtml5, FaTrash } from "react-icons/fa";
interface ICourse {
  id: number;
  name: string;
  title: string;
  slug: string;
}

type Props = {
  education: Education;
  onDelete: (education: number) => void;

};

const AdminCreateEduCards = ({ education }: Props) => {
  // console.log(course);
  // const handleDelete = () => {
  //   onDelete();
  // };

  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div className="flex flex-1 justify-center items-center bg-card rounded-t-lg">
        <FaHtml5 size="4em" />
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">

        <p>{education.name}</p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          // onClick={handleDelete}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCreateEduCards;
