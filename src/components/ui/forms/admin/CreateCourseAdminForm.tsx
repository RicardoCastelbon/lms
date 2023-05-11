"use client";
import React, { useCallback, useState } from "react";
import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconSelect from "../../dropdowns/IconSelect";
import RichText from "../../text-editor/RichText";
import ColorSelect from "../../dropdowns/ColorSelect";
import { trpc } from "@/src/common/trpc";
import { useSession } from "next-auth/react";
import {
  courseLibInputSchema,
  CourseLibInputSchema,
} from "@/src/common/validation/course-lib";

type Props = {
  closeModal: () => void;
};
const CreateCourseAdminForm = ({ closeModal }: Props) => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CourseLibInputSchema>({
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
    // resolver: zodResolver(courseLibInputSchema),
  });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.courseLib.create.useMutation();

  const onSubmit = useCallback(
    async (data: CourseLibInputSchema) => {
      try {
        const courseLibData = {
          ...data,
          content: String(quill?.root.innerHTML),
        };

        // Check all fields are filled
        if (
          !courseLibData.title ||
          !courseLibData.description ||
          !courseLibData.content
        ) {
          console.log("need to fill in all fields");
          console.log(courseLibData);
          return;
        } else {
          console.log(courseLibData);
          const result = await mutateAsync(courseLibData);
          console.log("result", result);
          if (result.success) {
            quill!.root.innerHTML = "";
            reset();
            closeModal();
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, reset, quill, closeModal]
  );

  console.log("on SUBMIT", onSubmit);

  return (
    <form
      className="flex flex-col gap-4 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}


        <Controller
              name="title"
              control={control}
              rules={{ required: "Sätt namn på denna kurs" }}
              render={({
                field: { value, onChange, onBlur, name, ...field },
              }) => (
                <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Kursnamn</label>
                  <input
                    {...field}
                    className="input h-[40px] bg-muted input-bordered w-full mt-2 rounded-md"
                    id="education"
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                  />
                  <p className="text-xs text-red-500">
                    {errors.title?.message}
                  </p>
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: "Lägg till en beskrivning" }}
              render={({
                field: { value, onChange, onBlur, name, ...field },
              }) => (
                <div className="w-full max-w-md flex flex-col mb-4">
                  <label htmlFor="description">Beskrivning</label>
                  <input
                    {...field}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    id="description"
                    // placeholder="Kurs beskrivning"
                    className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                  />
                  {errors?.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors?.description?.message}
                    </p>
                  )}
                </div>
              )}
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
            >
              Spara
            </button>
          </section>
          {/* Right side */}
          <section className="h-full flex-1">
            <div className="flex justify-between p-2 items-center">
              <p>Kursinformation</p>
            </div>
            <RichText ref={quillRef} />
          </section>
    </form>
  );
};

export default CreateCourseAdminForm;
