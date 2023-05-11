"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RichText from "../../text-editor/RichText";
import { trpc } from "@/src/common/trpc";
import {
  exerciseLibInputSchema,
  ExerciseLibInputSchema,
} from "@/src/common/validation/exercise_lib";

type Props = {
  //closeModal: () => void; // New property
  showModal: boolean;
};

const CreateModuleAdminForm = ({ showModal }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExerciseLibInputSchema>({
    // mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
    // resolver: zodResolver(moduleLibInputSchema),
  });

  const { quill, quillRef: refOne } = useQuill();
  const { quill: quillTwo, quillRef: refTwo } = useQuill();
  const { mutateAsync } = trpc.exercise_lib.create.useMutation();
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const onSubmit = useCallback(
    async (data: ExerciseLibInputSchema) => {
      try {
        // const moduleLibData = {
        //   ...data.moduleLib,
        //   content: String(quill?.root.innerHTML),
        // };
        data.content = String(quill?.root.innerHTML);
        console.log(quillTwo?.root.innerHTML);

        data.description = String(quillTwo?.root.innerHTML);
        console.log(data);

        // Check all fields are filled
        /*   if (
          !moduleLibData.title ||
          !moduleLibData.description ||
          !moduleLibData.content
        ) {
          console.log("need to fill in all fields");
          console.log(moduleLibData);
          return;
        } else {
          console.log(moduleLibData);
          const result = await mutateAsync({ moduleLib: moduleLibData });
          if (result.success) {
            quill!.root.innerHTML = "";
            reset();
            closeModal();
          }
        } */
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, reset, quill, showModal]
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
              <label htmlFor="title">Namn på uppgift</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="title"
                type="text"
                placeholder="Ange namn på uppgift"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.title?.message}
              </p>
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            // required: "Ange en beskrivande text av uppgiften",
            validate: {
              hasContent: (value) => {
                value = String(quillTwo?.getText());
                console.log(value.length);

                return (
                  value.length > 10 || "Ange en beskrivning med minst 10 tecken"
                );
              },
            },
          }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="description">Beskrivning</label>
              <RichText
                id="description"
                {...field}
                // field={field}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={refTwo}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.description?.message}
              </p>
            </div>
          )}
        />

        {/* <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
        >
          Spara
        </button> */}
      </section>
      {/* Right side */}
      <section className="h-full flex-1">
        <div className="flex justify-between p-2 items-center">
          <label htmlFor="content">Övningsinformation</label>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
          >
            Spara
          </button>
        </div>
        <Controller
          name="content"
          control={control}
          rules={{
            // required: "Ange en beskrivande text av uppgiften",
            validate: {
              hasContent: (value) => {
                value = String(quill?.getText());
                console.log(value.length);

                return value.length > 10 || "Ange en text med minst 10 tecken";
              },
            },
          }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              {/* <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="description"
                type="text"
                placeholder="Skriv in modulnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              /> */}
              <RichText
                id="content"
                {...field}
                // field={field}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={refOne}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.content?.message}
              </p>
            </div>
          )}
        />
        {/* <RichText ref={refOne} /> */}
      </section>
    </form>
  );
};

export default CreateModuleAdminForm;
