/*
  Warnings:

  - You are about to alter the column `shifts` on the `provider` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `provider` MODIFY `shifts` JSON NOT NULL;
