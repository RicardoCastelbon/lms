import { trpc } from "@/src/common/trpc";
import { useIcon } from "@/src/lib/hooks/iconHook";
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
  const { mutateAsync } = trpc.course.updateCourse.useMutation();

  const { selectIcon } = useIcon();
  const publishClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    course: Course
  ) => {
    e.preventDefault();
    // console.log(course);
    if (role !== "TEACHER") return;

    const result = await mutateAsync({
      courseId: String(course.id),
      body: {
        ...course,
        published: course.published ? false : true,
        educationId: course.educationId !== null ? course.educationId : undefined,
        
      },
    });

    console.log(result);
  };

  return (
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div
        className={`flex flex-1 justify-center items-center ${
          course.color !== "" ? course.color : "bg-card"
        } rounded-t-lg`}
      >
        {selectIcon(course.icon)}
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">
        <h2 className="font-semibold text-lg mb-2">{course.title}</h2>
        {role && role === "TEACHER" ? (
          course.published ? (
            <>
              <p className="text-green-500">Publicerad</p>
              <button
                className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
                onClick={(e) => publishClickHandler(e, course)}
              >
                Avpublicera
              </button>
            </>
          ) : (
            <>
              <p className="text-rose-500">Ej publicerad</p>
              <button
                className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
                onClick={(e) => publishClickHandler(e, course)}
              >
                Publicera nu
              </button>
            </>
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
