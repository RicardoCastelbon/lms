import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Course_lib, Exercise_lib, Module_lib } from "@prisma/client";
import { Plus } from "lucide-react";
import LibCard from "./forms/teacher/LibCard";
// import { ResourceObject } from "@/src/pages/dashboard";
import { Resource, ResourceObject } from "@/src/lib/types/resourceTypes";
// type Resource = Course_lib[] | Module_lib[] | Exercise_lib[];

type Props = {
  resource: Resource;
  setIsCreateFormOpen: Dispatch<SetStateAction<boolean>>;
  selectLibResourceHandler: (selectedResource: ResourceObject) => void;
};

const LibSelection = ({
  resource,
  setIsCreateFormOpen,
  selectLibResourceHandler,
}: Props) => {
  const [resourceData, setResourceData] = useState<Resource | null>(null); // what type?
  const [readInfo, setReadInfo] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<
    Course_lib | Module_lib | Exercise_lib | null
  >(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log(searchTerm);
    setResourceData(filterSearchHandle(resource, searchTerm));
  }, [searchTerm, resource]);

  const infoClickHandler = (id: number) => {
    console.log(id);
    setSelectedResource(getResourceData(resource, id));
    setReadInfo(true);
    setSearchTerm("");
  };

  //get the clicked recource when clicking info to set "selectedResource". This acts as object to display description
  const getResourceData = (resource: Resource, id: number) => {
    const selected = resource.filter((item) => item.id === id);
    return selected[0];
  };

  const filterSearchHandle = (resource: Resource, input: string) => {
    const searchResult = resource.filter((item) =>
      item.title.toLowerCase().includes(input)
    );
    console.log(searchResult);

    return searchResult;
  };

  return (
    <>
      <section
        className={`w-full h-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}
      >
        <form className="w-full max-w-md">
          <div className="w-full max-w-md flex flex-col mb-4">
            <label htmlFor="search">Sök kurser i biblioteket</label>
            <input
              id="search"
              type="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök kurser"
              className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2"
            />
          </div>
        </form>

        <button
          onClick={() => {
            setIsCreateFormOpen(true);
            setSearchTerm("");
          }}
          className="max-w-md flex gap-2 justify-center bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground md:self-baseline"
        >
          <Plus />
          Skapa ny kurs
        </button>
      </section>
      {/* lib items / search results */}
      {/* Whenever the readInfo is true implement scroll, else no "WON'T WORK IF CARDS EXCEEDS A HEIGHT OF 450PX?!" */}
      <div
        className={`relative overflow-x-hidden ${
          readInfo ? "overflow-y-scroll" : ""
        } md:h-[450px]`}
      >
        <section
          className={`relative w-full  flex flex-wrap justify-center gap-2 p-4  ${
            readInfo ? "-translate-x-[110%]" : "translate-x-0"
          } transition-transform duration-500 ease-in-out md:justify-start`}
        >
          {!resourceData
            ? resource.map((item, index) => (
                <LibCard
                  key={index}
                  setReadInfo={setReadInfo}
                  cardResource={item}
                  infoClickHandler={infoClickHandler}
                />
              ))
            : resourceData.map((item, index) => (
                <LibCard
                  key={index}
                  setReadInfo={setReadInfo}
                  cardResource={item}
                  infoClickHandler={infoClickHandler}
                />
              ))}
        </section>

        <div
          className={`absolute top-0 w-full h-min-full py-4 ${
            readInfo ? "translate-x-0" : "translate-x-[110%]"
          } transition-transform duration-500 ease-in-out overflow-y-scroll lg:flex lg:justify-between`}
        >
          <article className="flex flex-col gap-2">
            {selectedResource && parse(selectedResource!.description)}
            <button
              onClick={() => {
                selectedResource && selectLibResourceHandler(selectedResource);
                setReadInfo((prev) => !prev);
              }}
              className="max-w-md flex gap-2 justify-center bg-indigo-500 text-white py-2 px-6 mt-2 rounded-sm hover:bg-indigo-50 hover:text-foreground md:self-baseline"
            >
              Välj
            </button>
          </article>
          <button
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
