"use client";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichText from "../../text-editor/RichText";
import { trpc } from "@/src/common/trpc";
import {
  moduleLibInputSchema,
  ModuleLibInputSchema,
} from "@/src/common/validation/module-lib";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};

const CreateModuleAdminForm = ({ showModal,setShowModal }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ModuleLibInputSchema>({
    defaultValues: {
          title: "",
          description: "",
          content: "",
    
  },
    // resolver: zodResolver(moduleLibInputSchema),
  });


  const { quill, quillRef: refOne } = useQuill();
  const { quill: quillTwo, quillRef: refTwo } = useQuill();
    const { mutateAsync } = trpc.moduleLib.create.useMutation();

  const onSubmit = useCallback(
    async (data: ModuleLibInputSchema) => {
        try {
          data.content = String(quill?.root.innerHTML);
          console.log(quillTwo?.root.innerHTML);
  
          data.description = String(quillTwo?.root.innerHTML);
          console.log(data);
          const result = await mutateAsync(data);
          if (result.success) {
            quill!.root.innerHTML = "";
            reset();
            setShowModal(false);
          }
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
          rules={{ required: "Ange ett namn på modalen" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Namn på modalen</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="title"
                type="text"
                placeholder="Ange namn på modalen"
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
                // console.log(value.length);

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
          <label htmlFor="content">Modalinformation</label>
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
                ref={refOne}
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


export default CreateModuleAdminForm;
