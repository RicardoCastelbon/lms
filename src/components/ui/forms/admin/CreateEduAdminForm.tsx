"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import RichText from "../../text-editor/RichText";
import { trpc } from "@/src/common/trpc";
// import { useSession } from "next-auth/react";
import {
  educationInputSchema,
  EducationInput,
} from "@/src/common/validation/education";
import { Education } from "@prisma/client";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};
const CreateEduAdminForm = ({ showModal, setShowModal }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<EducationInput>({
    defaultValues: {
      name: "",
    },
    // resolver: zodResolver(signUpSchema),
  });
  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.education.create.useMutation();

  const onSubmit = useCallback(
    async (data: EducationInput) => {
      try {
        const educationData = {
          ...data,
          content: String(quill?.root.innerHTML),
        };
        //Check if value is a string, if true, cast to number
        if (typeof data.name === "string") {
          data.name = String(data.name);
        }

        // Check all fields are filled
        if (!educationData.name) {
          // console.log("need to fill in all fields");
          // console.log(educationData);
          return;
        } else {
          console.log(educationData);
          const result = await mutateAsync(educationData);
          console.log("result", result);
          if (result.success) {
            quill!.root.innerHTML = "";
            reset();
            setShowModal(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, reset, quill]
  );

  return (
    <form
      className='flex flex-col gap-4 md:flex-row'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* left side */}
      <section className='flex-1 flex flex-col gap-4'>
        {/* form group */}
        <Controller
          name='name'
          control={control}
          rules={{ required: "Skriv in ett namn för denna utbildning" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className='w-full max-w-md flex flex-col mb-4'>
              <label htmlFor='name'>Utbildnings namn</label>
              <input
                {...field}
                id='name'
                type='text'
                placeholder='Lägg till ett utbildnings namn'
                className='input h-[40px] bg-muted input-bordered w-full mt-2 rounded-md'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              <p className='text-xs text-red-500 mt-1'>
                {errors.name?.message}
              </p>
            </div>
          )}
        />

        <button
          type='submit'
          className='bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground'
        >
          Spara
        </button>
      </section>
      {/* Right side */}
      <section className='h-full flex-1'>
        <div className='flex justify-between p-2 items-center'>
          {/* <p>Utbildningsinformation</p> */}
        </div>
        {/* <RichText ref={quillRef} /> */}
      </section>
    </form>
  );
};

export default CreateEduAdminForm;
