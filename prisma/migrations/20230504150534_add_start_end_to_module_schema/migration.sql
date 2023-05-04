/*
  Warnings:

  - You are about to drop the column `description` on the `module` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `module` DROP COLUMN `description`,
    ADD COLUMN `endDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL';
