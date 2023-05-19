import { Course_lib, Exercise_lib, Module_lib } from "@prisma/client";

export type ResourceObject = Course_lib | Module_lib | Exercise_lib;

export type Resource = Course_lib[] | Module_lib[] | Exercise_lib[];
