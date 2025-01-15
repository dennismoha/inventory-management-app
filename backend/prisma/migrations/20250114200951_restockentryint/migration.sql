/*
  Warnings:

  - You are about to alter the column `stock_quantity` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "stock_quantity" SET DATA TYPE INTEGER;
