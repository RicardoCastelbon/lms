import { Module_lib } from "@prisma/client";
import { log } from "console";
import Link from "next/link";
import React from "react";
import { FaHtml5, FaTrash } from "react-icons/fa";
import { FileText, Info } from "lucide-react";

type Props = {
  moduleLib: Module_lib;
  // onDelete: (moduleLibId: number) => void;
  infoClickHandler: () => void;
  title: string;
  // /making a comment
};

const AdminCreateModuleCards = ({
  title,
  moduleLib,
  infoClickHandler,
}: Props) => {
  //   const handleDelete = () => {
  //     if (window.confirm("Are you sure")) {
  //     onDelete(moduleLib.id)
  //        }
  // }

  return (
    <div className='relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary text-white rounded-md shadow-md hover:shadow-xl hover:scale-105 duration-200'>
      {/* card header */}
      <FaTrash
        className='absolute top-2 right-2 hover:cursor-pointer'
        onClick={infoClickHandler}
      />
      {/* card body */}
      {/* <div className="flex flex-col gap-2 p-2 text-center"> */}
      <FileText size={48} />
      <h3>{title}</h3>
      <button
        className='bg-green-400 text-white py-1 px-2 rounded-md hover:bg-green-600'
        onClick={infoClickHandler}
      >
        {/* <FaTrash className="m-1"/> Delete */}
        Info
      </button>
      {/* </div> */}
    </div>
  );
};

export default AdminCreateModuleCards;
