/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Course_lib` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Exercise_lib` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Module` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Module_lib` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Exercise` DROP FOREIGN KEY `Exercise_moduleId_fkey`;

-- DropForeignKey
ALTER TABLE `Exercise_lib` DROP FOREIGN KEY `Exercise_lib_moduleId_fkey`;

-- DropForeignKey
ALTER TABLE `Module` DROP FOREIGN KEY `Module_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Module_lib` DROP FOREIGN KEY `Module_lib_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_educationId_fkey`;

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Course` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Course_lib` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Education` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Exercise` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `moduleId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Exercise_lib` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `moduleId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Module` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Module_lib` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `userRole` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `educationId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_educationId_fkey` FOREIGN KEY (`educationId`) REFERENCES `Education`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_lib` ADD CONSTRAINT `Module_lib_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course_lib`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise_lib` ADD CONSTRAINT `Exercise_lib_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module_lib`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
