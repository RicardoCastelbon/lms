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

type Props = {
  moduleId: number;
};

const CreateExerciseForm = ({ moduleId }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ExerciseInputSchema>({
    defaultValues: {
      title: "",
      content: "",
      moduleId: moduleId,
    },
  });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.exercise.create.useMutation();

  const onSubmit = useCallback(
    async (data: ExerciseInputSchema) => {
      try {
        data.content = String(quill?.root.innerHTML);
        data.moduleId = moduleId;
        console.log(data);
        const result = await mutateAsync(data);
        if (result.success) {
          quill!.root.innerHTML = "";
          reset();
        }
      } catch (err) {
        console.error(err);
        reset();
      }
    },
    [mutateAsync, reset, quill, moduleId]
  );

  return (
    <form className="md:flex gap-4 block" onSubmit={handleSubmit(onSubmit)}>
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Ange ett namn på uppgiften" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Uppgiftsnamn</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="title"
                type="text"
                placeholder="Skriv in uppgiftsnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.title?.message}
              </p>
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
        <Controller
          name="content"
          control={control}
          rules={{
            // required: "Ange en beskrivande text av uppgiften",
            validate: {
              hasContent: (value) => {
                value = String(quill?.getText());

                return value.length > 10 || "Ange en text med minst 10 tecken";
              },
            },
          }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <RichText
                id="content"
                {...field}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={quillRef}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.content?.message}
              </p>
            </div>
          )}
        />
      </section>
    </form>
  );
};

export default CreateExerciseForm;
