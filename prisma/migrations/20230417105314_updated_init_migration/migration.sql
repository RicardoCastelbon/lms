/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    ADD COLUMN `userRole` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- CreateTable
CREATE TABLE `Education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
