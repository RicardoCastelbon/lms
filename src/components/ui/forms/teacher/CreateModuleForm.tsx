"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RichText from "../../text-editor/RichText";
import {
  moduleInputSchema,
  ModuleInputSchema,
} from "@/src/common/validation/module-end-user";
import { trpc } from "@/src/common/trpc";

type Props = {};

const CreateModuleForm = (props: Props) => {
  const { handleSubmit, control, reset } = useForm<ModuleInputSchema>({
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      courseId: 0,
      content: "",
    },
    resolver: zodResolver(moduleInputSchema),
  });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.module.create.useMutation();

  const onSubmit = useCallback(
    async (data: ModuleInputSchema) => {
      try {
        // let selectedIcon = iconName;
        data.content = String(quill?.root.innerHTML);
        data.courseId = 1;

        // console.log(iconName);
        if (!data.title || !data.startDate || !data.endDate || !data.courseId) {
          console.log("need to fill in all fields");
          console.log(data);
          return;
        } else {
          console.log(data);
          const result = await mutateAsync(data);
          /*  if (result.status === "success") {
            quill!.root.innerHTML = "";
            reset();
          } */
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, reset, quill]
  );

  return (
    <form className="md:flex gap-4 block" onSubmit={handleSubmit(onSubmit)}>
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
            </div>
          )}
        />
        <Controller
          name="startDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Startdatum</label>
              <input
                id="startDate"
                type="date"
                placeholder="Skriv in startdatum"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="endDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Inlämningsdatum</label>
              <input
                id="endDate"
                type="date"
                placeholder="Skriv in inlämningsdatum"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                {...field}
              />
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
          <p>Modulinformation</p>
        </div>
        <RichText quillRef={quillRef} />
      </section>
    </form>
  );
};

export default CreateModuleForm;
