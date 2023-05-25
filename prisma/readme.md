# Prisma README

## Intro

In this README you will find everything related to Prisma, how the schema of prisma works, the migration system and the seed.ts/data folder.This can come to change during the development phase.

Prisma is an ORM and a very good solution to work with databases and typescript. It provides a simple, type-safe API to query the database and it can be used with most of SQL dialects(mySQL in our case) and mongoDB.

The readme will be devided in 3 sections:

### Schema.prisma

The Prisma schema file is the main configuration file for your Prisma setup. This file will be in charge of the setup of the prisma client, the database to use and all the models with their respctive relations(in SQL). The current models existing in the app are:

- User: Represents a user of the app, can be administrator of the school, teacher or student

- Admin: Represents the app administrator (we developers).

- Education: Represents the specific education of a school.

- Module: Represents a module inside an education

- Exercise: Represents a Exercise inside a Module.

- Education_lib: Represents the specific education that has been previosly configurated by us admins and which the users can users can get access to.

- Module_lib: Represents the specific module that has been previosly configurated by us admins and which the users can users can get access to.

- Exercise_lib: Represents the specific exercise that has been previosly configurated by us admins and which the users can users can get access to.

### Migrations

The migration files contained in the migration folder are in charge of keeping the story of the changes that have been done in your schema.prisma.

What is extremly important to know about the migrations is that once the schema.prisma have been changed to add or change in any way the models and it is proven that everything is working as it should, then it will be necessary to run "yarn prisma migrate dev" before pushing anything to github and we will generate a new migration file. If we do not do this it the dev and production databases will be unsync (More info: https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate).

Everytime you run "yarn prisma migrate dev", prisma create and deletes the "shadow database" and is primarily used to detect problems such as schema drift. (More info: https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database)

### Database seeder

The seed.ts is composed of several functions that seed the database using the data in form of array of objects that are in the data folder.
