import { Course, Exercise, Module } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import UpdateCourseForm from "./forms/teacher/UpdateCourseForm";

// type Resource = Course | Module | Exercise;
type Props = {
  resource: Course[] | Module[] | Exercise[];
  setResourceId: Dispatch<SetStateAction<number>>;
};

const ResourceSelection = ({ resource, setResourceId }: Props) => {
  /*  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  ); */
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
            className="w-full p-4 flex justify-between items-center bg-card hover:cursor-pointer hover:bg-background"
            onClick={() => setResourceId(item.id)}
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.published ? "Publicerad" : "Ej publicerad"}</p>
          </div>
        ))}
    </section>
  );
};

export default ResourceSelection;
