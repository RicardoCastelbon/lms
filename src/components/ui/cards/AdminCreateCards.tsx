
import { log } from "console";
import Link from "next/link";
import React from "react";
import { FaHtml5 } from "react-icons/fa";
interface ICourse {
  id: number;
  name: string;
  // title: string;
  slug: string;
  // buttonText: string; 
}

const buttonTexts: { [key: string]: string } = {
  "Utbildningar": "Se utbildningar",
  "Kurser": "Se Kurser",
  "Moduler": "Se Moduler",
  "Övningar": "Se övningar",
}
const AdminCreateCards = ({ id, name,  slug }: ICourse) => {
  const buttonText = buttonTexts[name] || "Se mer"; // fallback to "Se mer" if name is not found

  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      <div className="flex flex-1 justify-center items-center bg-card rounded-t-lg">
        <FaHtml5 size="4em" />
      </div>
      <div className="flex flex-col gap-2 p-2 text-center">
        <h2 className="font-semibold text-lg mb-2">{name}</h2>
        {/* <p>{name}</p> */}
        <Link href={slug}>
          <p className="pointer-cursor bg-indigo-50 rounded-sm py-2 text-foreground hover:bg-indigo-500 hover:text-white">
          {buttonText}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminCreateCards;