"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  CourseInputSchema,
  courseInputSchema,
} from "@/src/common/validation/course-end-user";
import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import IconSelect from "../../dropdowns/IconSelect";
import RichText from "../../text-editor/RichText";
import ColorSelect from "../../dropdowns/ColorSelect";
import { trpc } from "@/src/common/trpc";
import { useSession } from "next-auth/react";
import { ResourceObject } from "@/src/pages/dashboard";
/* type Course = {
  title: string;
  color: string;
  description: string;
  content: string;
}; */
type Props = {
  educationId: number;
  // setHasSubmitted: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  // hasSubmitted: boolean;
  libData?: ResourceObject | null;
};

const CreateCourseForm = ({
  educationId,
  // hasSubmitted,
  // setHasSubmitted,
  libData,

  setShowModal,
}: Props) => {
  const [iconName, setIconName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CourseInputSchema>({
    defaultValues: {
      title: libData ? libData.title : "",
      icon: "",
      // slug: "",
      color: "",
      content: libData ? libData.content : "",
      educationId: 0,
      points: "",
      published: false,
    },
  });

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.course.create.useMutation();

  useEffect(() => {
    if (quill && libData) {
      quill!.root.innerHTML = libData?.content;
    }
    /*  return () => {
      libData = null;
    }; */
  }, [libData, quill]);

  useEffect(() => {
    console.log(libData);
  }, [libData]);

  const onSubmit = useCallback(
    async (data: CourseInputSchema) => {
      try {
        // let selectedIcon = iconName;
        data.content = String(quill?.root.innerHTML);
        data.educationId = educationId;

        //Both color and iconName comes from outside the scope of the form.
        // data.icon = iconName;
        // data.color = color;
        data.published = false; // needed?
        console.log(data);
        setHasSubmitted((prev) => !prev);
        // console.log(hasSubmitted);

        const result = await mutateAsync(data);
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
    [iconName, color, mutateAsync, quill, reset]
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
          rules={{ required: "Ange ett namn på kursen" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="title">Kursnamn</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="title"
                type="text"
                placeholder="Skriv in kursnamn"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.title?.message}
              </p>
            </div>
          )}
        />
        <Controller
          name="points"
          control={control}
          rules={{ required: "Ange kursens totala poäng" }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="course-points">Kurspoäng</label>
              <input
                {...field}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                id="course-points"
                type="text"
                placeholder="Ange antal kurspoäng"
                className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.points?.message}
              </p>
            </div>
          )}
        />
        <Controller
          name="color"
          control={control}
          rules={{
            validate: {
              hasColor: (value) => {
                console.log(value);

                return value.length > 0 || "Välj en färg";
              },
            },
          }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="color">Välj bakgrundsfärg</label>
              <ColorSelect
                hasSubmitted={hasSubmitted}
                // {...field}
                value={value}
                setValue={setValue}
                onChange={onChange}
                onBlur={onBlur}
                setColor={setColor}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.color?.message}
              </p>
            </div>
          )}
        />
        <Controller
          name="icon"
          control={control}
          rules={{
            validate: {
              hasIcon: (value) => {
                console.log(value);

                return value.length > 0 || "Välj en ikon";
              },
            },
          }}
          render={({ field: { value, onChange, onBlur, name, ...field } }) => (
            <div className="w-full max-w-md flex flex-col mb-4">
              <label htmlFor="icon">Välj en kursikon</label>
              <IconSelect
                hasSubmitted={hasSubmitted}
                // {...field}
                value={value}
                // name={name}
                setValue={setValue}
                onChange={onChange}
                onBlur={onBlur}
                setIconName={setIconName}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors?.icon?.message}
              </p>
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

export default CreateCourseForm;
