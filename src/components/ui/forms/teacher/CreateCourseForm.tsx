"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  IcourseEndUserSchema,
  courseEndUserSchema,
} from "@/src/common/validation/course-end-user";
import { useQuill } from "react-quilljs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import IconSelect from "../../dropdowns/IconSelect";
import RichText from "../../text-editor/RichText";
import ColorSelect from "../../dropdowns/ColorSelect";
type Course = {
  title: string;
  color: string;
  description: string;
  content: string;
};
type Props = {};

const CreateCourseForm = (props: Props) => {
  const { handleSubmit, control, register, setValue, reset } =
    useForm<IcourseEndUserSchema>({
      defaultValues: {
        title: "",
        icon: "",
        color: "",
        content: "",
      },
      resolver: zodResolver(courseEndUserSchema),
    });
  const [course, setCourse] = useState<Course>({
    title: "",
    color: "",
    description: "",
    content: "",
  });
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    console.log(course);
  }, [course]);

  /*   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourse({ ...course, content: String(quill?.root.innerHTML) });
  }; */

  return (
    <form
      className="flex gap-4"
      onSubmit={(e) => {
        // handleSubmit(e);
      }}
    >
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <div className="flex flex-col">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2 text-sm"
            type="text"
            placeholder="Ge kursen ett namn"
          />
        </div>
        <div className="flex flex-col gap-4 mt-20">
          <div className="flex flex-col">
            <p>Välj bakgrundsfärg</p>
          </div>
          {/* <label htmlFor="color">Välj en bakgrundsfärg</label> */}
          <ColorSelect />
          <IconSelect />
        </div>
      </section>
      {/* Right side */}
      <section className="h-full flex-1">
        <div className="flex justify-between p-2 items-center">
          <p>Kursinformation</p>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
          >
            Spara
          </button>
        </div>
        <RichText quillRef={quillRef} />
      </section>
    </form>
  );
};

export default CreateCourseForm;
