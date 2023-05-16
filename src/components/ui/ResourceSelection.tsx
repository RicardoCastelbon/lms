import { Course, Exercise, Module } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import UpdateCourseForm from "./forms/teacher/UpdateCourseForm";
import { log } from "console";
import { trpc } from "@/src/common/trpc";

type Resource = Course | Module | Exercise;
type Props = {
  resource: Course[] | Module[] | Exercise[];
  setResourceId: Dispatch<SetStateAction<number>>;
  role: string | undefined | null;
};

const ResourceSelection = ({ resource, setResourceId, role }: Props) => {
  const { mutateAsync } = trpc.course.updateCourse.useMutation();

  const publishClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    resource: Resource
  ) => {
    e.preventDefault();
    // console.log(course);
    if (role !== "TEACHER") return;

    const result = await mutateAsync({
      courseId: String(resource.id),
      body: {
        ...resource,
        published: resource.published ? false : true,
      },
    });

    console.log(result);
  };
  return (
    <section className="w-full h-full flex flex-col gap-2 p-2">
      {/* List header */}
      <div className="w-full px-4 flex justify-between items-center">
        <h3>Kursnamn</h3>
        <p>Status</p>
      </div>
      {/* list of courses */}
      {resource &&
        resource.map((item) => (
          <div
            key={item.id}
            className="w-full p-4 flex justify-between items-center bg-card  hover:bg-background"
          >
            <h3
              className=" hover:cursor-pointer font-semibold"
              onClick={() => setResourceId(item.id)}
            >
              {item.title}
            </h3>
            <div className="flex gap-6 items-center">
              {role && role === "TEACHER" ? (
                item.published ? (
                  <>
                    {/* <p className="text-green-500">Publicerad</p> */}
                    <button
                      className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
                      onClick={(e) => publishClickHandler(e, item)}
                    >
                      Avpublicera
                    </button>
                  </>
                ) : (
                  <>
                    {/* <p className="text-rose-500">Ej publicerad</p> */}
                    <button
                      className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
                      onClick={(e) => publishClickHandler(e, item)}
                    >
                      Publicera nu
                    </button>
                  </>
                )
              ) : (
                ""
              )}
              <p>{item.published ? "Publicerad" : "Ej publicerad"}</p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ResourceSelection;
