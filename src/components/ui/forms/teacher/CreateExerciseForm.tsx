"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RichText from "../../text-editor/RichText";

import { trpc } from "@/src/common/trpc";
import {
  exerciseInputSchema,
  ExerciseInputSchema,
} from "@/src/common/validation/exercise-end-user";

type Props = {};

const CreateExerciseForm = (props: Props) => {
  const { handleSubmit, control, reset } = useForm<ExerciseInputSchema>({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      moduleId: 0,
    },
    resolver: zodResolver(exerciseInputSchema),
  });

  const { quill, quillRef } = useQuill();
  //const { mutateAsync } = trpc.module.create.useMutation();

  const onSubmit = useCallback(
    async (data: ExerciseInputSchema) => {
      try {
        data.content = String(quill?.root.innerHTML);
        data.moduleId = 1;

        if (
          !data.title ||
          !data.content ||
          !data.description ||
          !data.moduleId
        ) {
          console.log("need to fill in all fields");
          console.log(data);
          return;
        } else {
          console.log(data);
          /*  const result = await mutateAsync(data);
          if (result.success) {
            quill!.root.innerHTML = "";
            reset();
          } */
        }
      } catch (err) {
        console.error(err);
      }
    },
    [/* mutateAsync, */ reset, quill]
  );

  useEffect(() => {}, []);

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
              <label htmlFor="title">Uppgiftsnamn</label>
              <input
                id="title"
                type="text"
                placeholder="Skriv in uppgiftsnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Beskrivning</label>
              <input
                id="description"
                type="text"
                placeholder="Skriv in beskrivning"
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
          <p>Uppgiftsinformation</p>
        </div>
        <RichText ref={quillRef} />
      </section>
    </form>
  );
};

export default CreateExerciseForm;
