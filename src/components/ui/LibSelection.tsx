import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import parse from "html-react-parser";

import { ISearch } from "@/src/common/validation/search";
import { Course_lib, Exercise_lib, Module_lib } from "@prisma/client";
import { Plus } from "lucide-react";
import LibCard from "./forms/teacher/LibCard";
import Modal from "./modals/Modal";

type Resource = Course_lib[] | Module_lib[] | Exercise_lib[];

type Props = {
  resource: Resource;
};

const LibSelection = ({ resource }: Props) => {
  const [resourceData, setResourceData] = useState<Resource>([]); // what type?
  const [readInfo, setReadInfo] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<
    Course_lib | Module_lib | Exercise_lib
  >();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ISearch>({
    defaultValues: {
      search: "",
    },
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  const infoClickHandler = (id: number) => {
    console.log(id);
    setSelectedResource(getResourceData(resource, id));
    setReadInfo(true);
  };

  const getResourceData = (resource: Resource, id: number) => {
    const selected = resource.filter((item) => item.id === id);
    return selected[0];
  };

  return (
    <>
      <section
        className={`w-full h-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}
      >
        <form className="w-full max-w-md">
          <Controller
            name="search"
            control={control}
            rules={{ required: "Ange ett sökord" }}
            render={({
              field: { value, onChange, onBlur, name, ...field },
            }) => (
              <div className="w-full max-w-md flex flex-col mb-4">
                <label htmlFor="search">Sök kurser i biblioteket</label>
                <input
                  id="search"
                  type="search"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Sök kurser"
                  className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
                  {...field}
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors?.search?.message}
                </p>
              </div>
            )}
          />
          <button
            type="submit"
            className="w-full max-w-md bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
          >
            Sök
          </button>
        </form>

        <button
          //   type="submit"
          onClick={() => setReadInfo((prev) => !prev)}
          className=" max-w-md flex gap-2 justify-center bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground md:self-baseline"
        >
          <Plus />
          Skapa ny kurs
        </button>
      </section>
      {/* lib items / search results */}
      <div className="relative overflow-x-hidden">
        <section
          className={`relative w-full h-full flex flex-wrap justify-center gap-2 p-4  ${
            readInfo ? "-translate-x-[110%]" : "translate-x-0"
          } transition-transform duration-500 ease-in-out md:justify-start`}
        >
          {resource &&
            resource.map((item, index) => (
              <LibCard
                key={index}
                setReadInfo={setReadInfo}
                cardResource={item}
                infoClickHandler={infoClickHandler}
              />
            ))}
          {/* <LibCard setReadInfo={setReadInfo} />
          <LibCard setReadInfo={setReadInfo} />
          <LibCard setReadInfo={setReadInfo} />
          <LibCard />
          <LibCard />
          <LibCard />
          <LibCard /> */}
        </section>

        <div
          className={`absolute top-0 w-full h-full py-4 ${
            readInfo ? "translate-x-0" : "translate-x-[110%]"
          } transition-transform duration-500 ease-in-out lg:flex lg:justify-between`}
        >
          <article className="flex flex-col gap-2">
            {selectedResource && parse(selectedResource!.description)}
            <button
              //   type="submit"
              onClick={() => setReadInfo((prev) => !prev)}
              className="max-w-md flex gap-2 justify-center bg-indigo-500 text-white py-2 px-6 mt-2 rounded-sm hover:bg-indigo-50 hover:text-foreground md:self-baseline"
            >
              Välj
            </button>
          </article>
          <button
            //   type="submit"
            onClick={() => setReadInfo((prev) => !prev)}
            className="max-w-md flex gap-2 justify-center bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground md:self-baseline"
          >
            Tillbaka
          </button>
        </div>
      </div>
    </>
  );
};

export default LibSelection;
