-- AlterTable
ALTER TABLE `Education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `userRole` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course_lib` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module_lib` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Module_lib_courseId_key`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise_lib` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `moduleId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Exercise_lib_moduleId_key`(`moduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Module_courseId_key`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `moduleId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Exercise_moduleId_key`(`moduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Module_lib` ADD CONSTRAINT `Module_lib_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course_lib`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise_lib` ADD CONSTRAINT `Exercise_lib_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module_lib`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
