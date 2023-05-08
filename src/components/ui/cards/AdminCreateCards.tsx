import Link from "next/link";
import React from "react";
import { FaHtml5 } from "react-icons/fa";
import { Course_lib, Exercise_lib, Module, Module_lib } from "@prisma/client";

type Props = {
  entity: Entity;};
type Entity = Course_lib | Module_lib | Exercise_lib;


const AdminCreateCards: React.FC<Props> = ({   entity }) => {
  if (!entity) {
    return null;
  }
  const entityType = entity.hasOwnProperty("title") ? "module" : "course";
  const route = `/${entityType}s/${entity.id}`;
  const title = entityType === "module" ? entity.title : entity.title;
  return (
    
    <div className="w-[232px] h-[338px] shadow-lg flex flex-col rounded-lg">
      {/* card header */}
      <div className="flex flex-1 justify-center items-center bg-card rounded-t-lg">
        <FaHtml5 size="4em" />
      </div>
      {/* card body */}
      <div className="flex flex-col gap-2 p-2 text-center">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
              <Link
        href={`/modules/${module.id}`}          
        className="pointer-cursor bg-primary rounded-sm py-2 text-white hover:bg-background hover:text-foreground"
        >
          Se mer
        </Link>
      </div>
    </div>
  );
};

export default AdminCreateCards;
