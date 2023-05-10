

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
import { courseLibInputSchema, CourseLibInputSchema } from "@/src/common/validation/course-lib";

type Props = {
  closeModal: () => void;

};
const CreateCourseAdminForm = ({ closeModal }: Props) => {
  const [iconName, setIconName] = useState<string>("");
  // const [color, setColor] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);


  const { handleSubmit, control, reset } = useForm<CourseLibInputSchema>({
    defaultValues: {
      // courseLib: {
        title: "",
        description: "",
        content: "",
      
      // },
    },
    resolver: zodResolver(courseLibInputSchema),
  });


  const { data: session } = useSession();

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
      if (!courseLibData.title || !courseLibData.description || !courseLibData.content) {
        console.log("need to fill in all fields");
        console.log(courseLibData);
        return;
      } else {
        console.log(courseLibData);
        const result = await mutateAsync(courseLibData );
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
            rules={{ required: true }}
            render={({ field }) => (
                <div className="w-full max-w-md flex flex-col mb-4">
                <label htmlFor="title">Modulnamn</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Skriv in modulnamn"
                    className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                    {...field}
                />

                <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="w-full max-w-md flex flex-col mb-4">
                    <label htmlFor="title">Beskrivning</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Skriv in modulnamn"
                        className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                        {...field}
                    />
                    </div>
                    )}
                    />
                </div>
            )}
            />

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
        <RichText ref={quillRef} />
      </section>
    </form>
  );
};

export default CreateCourseAdminForm;
