"use client";
import React, { useCallback, useState } from "react";
import { useQuill } from "react-quilljs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichText from "../../text-editor/RichText";
import { trpc } from "@/src/common/trpc";
import { useSession } from "next-auth/react";
import { educationInputSchema, EducationInput } from "@/src/common/validation/education";

type Props = {
  closeModal: () => void;

};
const CreateEduAdminForm = ({ closeModal }: Props) => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);


  const { handleSubmit, control, reset } = useForm<EducationInput>({
    defaultValues: {
      // courseLib: {
        name: "",
        // description: "",
        // content: "",
      
      // },
    },
    resolver: zodResolver(educationInputSchema),
  });


  // const { data: session } = useSession();

  const { quill, quillRef } = useQuill();
  const { mutateAsync } = trpc.education.create.useMutation();

  const onSubmit = useCallback(
    async (data: EducationInput) => {
      try {
      const educationData = {
        ...data,
        content: String(quill?.root.innerHTML),
      };

      // Check all fields are filled
      if (!educationData.name  ) {
        console.log("need to fill in all fields");
        console.log(educationData); 
        return;
      } else {
        console.log(educationData);
        const result = await mutateAsync(educationData );
        console.log("result",result)
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

  console.log("on SUBMIT", onSubmit)

  return (
    <form
      className="flex flex-col gap-4 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
                <div className="w-full max-w-md flex flex-col mb-4">
                <label htmlFor="title">Utbildnings namn</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Skriv in utbildnings namn"
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
          <p>Utbildningsinformation</p>
        </div>
        <RichText ref={quillRef} />
      </section>
    </form>
  );
}

export default CreateEduAdminForm;
