/* import { Prisma } from '@prisma/client'

// 1: Define a type that includes the relation to `Post`
const moduleWithExercises = Prisma.validator<Prisma.UserArgs>()({
  include: { exercises: true },
})

// 2: Define a type that only contains a subset of the scalar fields
const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
  select: { email: true, name: true },
})

// 3: This type will include a user and all their posts
type UserWithPosts = Prisma.UserGetPayload<typeof moduleWithExercises> */
