# Common folder

Everything that's configuration for the application in general goes here. Such as the TRPC instatiation, the prisma instatiation, authentication etc.

## NOTE!

Neither prisma OR trpc should be instatiated anywhere else in the application, both are exported modules and can be imported where need be.

### Validation folder

Create separate files for unique validations, e.g register form validation, creation of courses, modules and exercises. Anything where input needs to be validated.
