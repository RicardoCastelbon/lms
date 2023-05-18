"use client";
import React,  {Dispatch,SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RichText from "../../text-editor/RichText";
import {
  moduleInputSchema,
  ModuleInputSchema,
  ModuleUpdateFormSchema,
  UpdateModuleInputSchema,
} from "@/src/common/validation/module-end-user";
import { trpc } from "@/src/common/trpc";
import { Module } from "@prisma/client";

type Props = {
    moduleId: number;
    userModule: Module
    setHasSubmitted: Dispatch<SetStateAction<boolean>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    hasSubmitted: boolean;
};

const UpdateModuleForm = ({ 
    hasSubmitted,
    setHasSubmitted,
    userModule,
    setShowModal,

}: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ModuleUpdateFormSchema>({
    defaultValues: {
      title: userModule.title,
    //   startDate: "",
    //   endDate: "",
    //   courseId: 0,
    content: userModule.content,
    published: userModule.published,

    },
  });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.module.update.useMutation();

  useEffect(() => {
    if (quill) {
      quill!.root.innerHTML = userModule.content;
    }
    /* return () => {
      course = {};
    }; */
  }, [userModule, quill]);

  const onSubmit = useCallback(
    async (data: ModuleInputSchema) => {
      try {
        // let selectedIcon = iconName;
        data.content = String(quill?.root.innerHTML);
        // data.published = false; // needed?
        // data.moduleId = moduleId;

        console.log(data);
        const result = await mutateAsync({
            moduleId: String(userModule.id),
            body: {
                ...data,
            }
        });
        
        if (result.success) {
        setHasSubmitted(true);
        quill!.root.innerHTML = "";
        reset();
        setShowModal(false);
      }
  
    } catch (err) {
        console.log(err);
        reset();
      }
    },
    [mutateAsync, quill, reset]
  );
//   useEffect(() => {}, []);

  return (
    <form className="md:flex gap-4 block"
     onSubmit={handleSubmit(onSubmit)}>
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Ange ett namn på modulen" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Modulnamn</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="title"
                type="text"
                placeholder="Skriv in modulnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.title?.message}
              </p>
            </div>
          )}
        />
        {/* <Controller
          name="startDate"
          control={control}
          rules={{ required: "Ange ett startdatum" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Startdatum</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="startDate"
                type="date"
                placeholder="Skriv in startdatum"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.startDate?.message}
              </p>
            </div>
          )}
        /> */}
        {/* <Controller
          name="endDate"
          control={control}
          rules={{ required: "Ange ett inlämningsdatum" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Inlämningsdatum</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="endDate"
                type="date"
                placeholder="Skriv in inlämningsdatum"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.endDate?.message}
              </p>
            </div>
          )}
        /> */}
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

export default UpdateModuleForm;
