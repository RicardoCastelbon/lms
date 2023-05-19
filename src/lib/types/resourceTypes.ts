import { Course_lib, Exercise_lib, Module_lib } from "@prisma/client";

export type ResourceObject = Course_lib | Module_lib | Exercise_lib;

export type LibResource = Course_lib[] | Module_lib[] | Exercise_lib[];
export type LibResourceObject = Course_lib | Module_lib | Exercise_lib;
