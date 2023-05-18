"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { Exercise } from "@prisma/client";
import { ExerciseInputSchema, UpdateExerciseInputSchema } from "@/src/common/validation/exercise-end-user";
import { ExerciseData } from "@/src/pages/dashboard/[course]";

type Props = {
  // moduleId: number;
  exercise: ExerciseData;
  setHasSubmitted: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  hasSubmitted: boolean;
};

const UpdateModuleForm = ({
    hasSubmitted,
    setHasSubmitted,
    exercise,
    setShowModal,
    
}: Props) => {
    const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseData | null>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ExerciseData>({
    defaultValues: exerciseToUpdate ? {
        moduleName: exerciseToUpdate.moduleName,
        exercise: {
          id: exerciseToUpdate.exercise.id,
          moduleId: exerciseToUpdate.exercise.moduleId,
          title: exerciseToUpdate.exercise.title,
          slug: exerciseToUpdate.exercise.slug,
          content: exerciseToUpdate.exercise.content,
          published: exerciseToUpdate.exercise.published,
        },
      } : undefined,
    });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.exercise.update.useMutation();

  useEffect(() => {
    if (quill) {
      quill!.root.innerHTML = exercise.exercise.content;
    }
    /* return () => {
      course = {};
    }; */
  }, [exercise, quill]);exercise

  const onSubmit = useCallback(
    async (data: ExerciseData) => {
      try {
        // let selectedIcon = iconName;
        data.exercise.content = String(quill?.root.innerHTML);
        // data.published = false; // needed?
        // data.moduleId = moduleId;
  
        console.log(data);
        const result = await mutateAsync({
            exerciseId: String(exercise.exercise.id),
          body: {
            title: data.exercise.title,
            content: data.exercise.content,
            moduleId: data.exercise.moduleId,
          },
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
  
  return (
    <form className="md:flex gap-4 block" onSubmit={handleSubmit(onSubmit)}>
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <Controller
          name="exercise.title"
          control={control}
          rules={{ required: "Ange ett namn på övningen" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              {/* <label htmlFor="title">Modulnamn</label> */}
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
                {errors?.exercise?.title?.message}
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
          <p>Modulinformation</p>
        </div>
        <Controller
          name="exercise.content"
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
                {errors?.exercise?.content?.message}
              </p>
            </div>
          )}
        />
      </section>
    </form>
  );
};

export default UpdateModuleForm;
