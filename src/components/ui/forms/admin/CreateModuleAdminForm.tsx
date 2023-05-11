"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  closeModal: () => void;
};

const CreateModuleAdminForm = ({ closeModal }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ModuleLibInputSchema>({
    defaultValues: {
          title: "",
          description: "",
          content: "",
    
  },
    // resolver: zodResolver(moduleLibInputSchema),
  });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.moduleLib.create.useMutation();

  const onSubmit = useCallback(
    async (data: ModuleLibInputSchema) => {
      try {
        const moduleLibData = {
          ...data,
          content: String(quill?.root.innerHTML),
        };

        // Check all fields are filled
        if (
          !moduleLibData.title ||
          !moduleLibData.description ||
          !moduleLibData.content
        ) {
          // console.log("need to fill in all fields");
          // console.log(moduleLibData);
          return;
        } else {
          console.log(moduleLibData);
          const result = await mutateAsync(moduleLibData );
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
    <form className="md:flex gap-4 block" onSubmit={handleSubmit(onSubmit)}>
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Lägg till en title för denna modal" }}
          render={({
             field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor=".title">Modalnamn</label>
              <input
                {...field}
                id="title"
                type="text"
                 placeholder="Lägg till modalnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                onChange={onChange}
                onBlur={onBlur}
                 value={value}
              />
              {/* {errors?.title && ( */}
                <p className="text-xs text-red-500 mt-1">
                  {errors?.title?.message}
                </p>
              {/* )} */}
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Lägg till en beskrivning på denna modal" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="description">Beskrivning</label>
              <input
                {...field}
                id="description"
                type="text"
                placeholder="Lägg till en beskrivning"
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                value={value}
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              {errors?.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description?.message}
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
          <p>Modalinformation</p>
        </div>
        <RichText ref={quillRef} />
      </section>
    </form>
  );
};

export default CreateModuleAdminForm;
