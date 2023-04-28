"use client";
import React, { useCallback, useState } from "react";
import {
  CourseEndUserSchema,
  courseEndUserSchema,
} from "@/src/common/validation/course-end-user";
import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import IconSelect from "../../dropdowns/IconSelect";
import RichText from "../../text-editor/RichText";
import ColorSelect from "../../dropdowns/ColorSelect";
import { trpc } from "@/src/common/trpc";
import { useSession } from "next-auth/react";
type Course = {
  title: string;
  color: string;
  description: string;
  content: string;
};
type Props = {};

const CreateCourseForm = (props: Props) => {
  const [iconName, setIconName] = useState<string>("");
  const { handleSubmit, control, register, setValue, reset } =
    useForm<CourseEndUserSchema>({
      defaultValues: {
        title: "",
        icon: "",
        color: "",
        content: "",
        educationId: 0,
        points: "",
      },
      resolver: zodResolver(courseEndUserSchema),
    });

  const { data: session } = useSession();

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.course.create.useMutation();

  const onSubmit = useCallback(
    async (data: CourseEndUserSchema) => {
      try {
        // let selectedIcon = iconName;
        data.content = String(quill?.root.innerHTML);
        data.educationId = 1;
        data.icon = iconName;
        // console.log(iconName);
        if (
          !data.title ||
          !data.color ||
          !data.icon ||
          !data.content ||
          !data.educationId ||
          !data.points
        ) {
          console.log("need to fill in all fields");
          console.log(data);
          return;
        } else {
          console.log(data);
          const result = await mutateAsync(data);
          if (result.status === "success") {
            quill!.root.innerHTML = "";
            reset();
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, iconName, reset, quill]
  );

  return (
    <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Kursnamn</label>
              <input
                id="title"
                type="text"
                placeholder="Skriv in kursnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="points"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Kurspoäng</label>
              <input
                id="course-points"
                type="text"
                placeholder="Ange antal kurspoäng"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="color">Välj bakgrundsfärg</label>
              <ColorSelect field={field} />
            </div>
          )}
        />
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="icon">Välj en kursikon</label>
              {/* <ColorSelect field={field} /> */}
              <IconSelect field={field} setIconName={setIconName} />
            </div>
          )}
        />
        {/* <div className="flex flex-col">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2 text-sm"
            type="text"
            placeholder="Ge kursen ett namn"
          />
        </div> */}
        {/*  <div className="w-full max-w-md flex flex-col mb-4">
   

       
          <IconSelect setIconName={setIconName} />
        </div> */}
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
