"use client";
import React, { useEffect, useRef, useState } from "react";
import ColorSelect from "../../dropdowns/ColorSelect";
import Tiptap from "../../tiptap/TiptapEditor";
import RichText from "../../text-editor/RichText";

import { log } from "console";
import { useQuill } from "react-quilljs";
type Course = {
  title: string;
  color: string;
  description: string;
  content: string;
};
type Props = {};

const CreateCourseForm = (props: Props) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourse({ ...course, content: String(quill?.root.innerHTML) });
  };

  return (
    <form
      className="flex gap-4"
      onSubmit={(e) => {
        handleSubmit(e);
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
        <div className="flex flex-col">
          <p>Välj ikon</p>
        </div>
        <div className="flex flex-col">
          {/* <label htmlFor="color">Välj en bakgrundsfärg</label> */}
          <ColorSelect />
        </div>
      </section>
      {/* Right side */}
      <section className="h-full flex-1">
        Tiptap goes here
        <RichText quillRef={quillRef} />
        <button type="submit">Spara</button>
      </section>
    </form>
  );
};

export default CreateCourseForm;
