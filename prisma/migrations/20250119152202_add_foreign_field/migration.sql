/*
  Warnings:

  - You are about to drop the column `carModel` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `carType` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `carModel`,
    DROP COLUMN `carType`,
    ADD COLUMN `carId` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
