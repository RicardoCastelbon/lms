
import { Module_lib } from "@prisma/client";
import { log } from "console";
import Link from "next/link";
import React from "react";
import { FaHtml5 } from "react-icons/fa";
interface ICourse {
  id: number;
  name: string;
  title: string;
  slug: string;
}

type Props = {
  moduleLib: Module_lib;
};

const AdminCreateModuleCards = ({ moduleLib }: Props) => {
  // console.log(course);

  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div className="flex flex-1 justify-center items-center bg-card rounded-t-lg">
        <FaHtml5 size="4em" />
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">

        <p>{moduleLib.title}</p>

      </div>
    </div>
  );
};

export default AdminCreateModuleCards;
