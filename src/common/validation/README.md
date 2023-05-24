# Validation

### Types from prisma are used where possible!

_Note! "Resource" are used throughout this readme, and it refers to any data source in the database, e.g "user", "course", "module" etc._

Validation between frontend and backend are handled by creating schemas with zod. It acts as a single source of truth for all resources stored in the db.

Zod validation files are found in `.src/common/validation `

A schema is created whenever there are data passed to the backend, as well as data returned from the backend.

The schemas are then inferred as types and exported to use throughout the project.
The Zod documentation can be found here for further reading:
[Zod documentation](https://zod.dev/ "Zod Documentation")

## File structure for Zod schemas

There are a predefined structure of the schema files that should be followed to keep clarity for all. This to prevent too many exported types for edge-cases.

Guidelines are:

- Should have a default schema for said resource, which should be a zod.object() with all the properties of the resource with the attached .or() that's an array of objects of the exact same properties.

_See example below_

```
const course = z
  .object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    /*... additional properties */
  })
  .or(
    z
      .object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
       /*... additional properties */
      })
      .array()
  );
```

- Have one or more schemas for input (e.g. a structure of a form on the website). Or when you want to fetch a resource by id/slug.

- Preferrably one output schema used for all controller functions of the same resource. To do this it is set up by a set of optional properties to fit both successful responses and error responses.

_See example below, note that the "error" object is declared as optional in its default declaration._

```
export const courseOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  course: course.nullish(),
  error: error, // <- is optional in default declaration
});
```

- Not all schemas has to be exported, schemas can be created as regular consts to be passed within the validation file for less repitition.

At the bottom of the file we export the schemas as types as such:

```
export type CourseInputSchema = z.infer<typeof courseInputSchema>;
export type CourseOutputSchema = z.infer<typeof courseOutputSchema>;
```
