import { Course } from "@prisma/client";
import { log } from "console";
import Link from "next/link";
import React from "react";
import { FaHtml5 } from "react-icons/fa";
interface ICourse {
  id: number;
  name: string;
  exercises: number;
  slug: string;
}

type Props = {
  course: Course;
  role: string | null | undefined;
};

const CourseCard = ({ course, role }: Props) => {
  // console.log(course);

  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div
        className={`flex flex-1 justify-center items-center ${
          course.color !== "" ? course.color : "bg-card"
        } rounded-t-lg`}
      >
        <FaHtml5 size="4em" />
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">
        <h2 className="font-semibold text-lg mb-2">{course.title}</h2>
        {role && role === "TEACHER" ? (
          course.published ? (
            <p className="text-green-500">Publicerad</p>
          ) : (
            <p className="text-red-500">Ej publicerad</p>
          )
        ) : (
          ""
        )}
        {/* <p>{course.exercises}</p> */}
        <Link
          href={`/dashboard/${course.slug}`}
          className="pointer-cursor bg-indigo-50 rounded-sm py-2 text-foregound hover:bg-indigo-500 hover:text-white"
        >
          Till kurs
        </Link>
        {/* <Button className="pointer-cursor">Till kurs</Button> */}
      </div>
    </div>
  );
};

export default CourseCard;
