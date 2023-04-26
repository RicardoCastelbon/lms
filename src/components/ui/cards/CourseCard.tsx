import Link from "next/link";
import React from "react";
import { FaHtml5 } from "react-icons/fa";

type Props = {};

const CourseCard = (props: Props) => {
  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div className="flex flex-1 justify-center items-center bg-background rounded-t-lg">
        <FaHtml5 size="4em" />
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">
        <h2 className="font-semibold text-lg mb-2">Frontend-utveckling</h2>
        <p>Uppgifter</p>
        <p>14</p>
        <Link
          href=""
          className="pointer-cursor bg-primary rounded-sm py-2 text-white hover:bg-background hover:text-foreground"
        >
          Till kurs
        </Link>
        {/* <Button className="pointer-cursor">Till kurs</Button> */}
      </div>
    </div>
  );
};

export default CourseCard;
