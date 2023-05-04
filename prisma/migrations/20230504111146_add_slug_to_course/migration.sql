/*
  Warnings:

  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL';
