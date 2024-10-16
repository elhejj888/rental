/*
  Warnings:

  - You are about to drop the column `description` on the `Car` table. All the data in the column will be lost.
  - Added the required column `marque` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modele` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` DROP COLUMN `description`,
    ADD COLUMN `marque` VARCHAR(191) NOT NULL,
    ADD COLUMN `modele` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;
