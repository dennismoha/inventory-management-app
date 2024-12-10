/*
  Warnings:

  - You are about to drop the column `productName` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Inventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "productName",
DROP COLUMN "sku";
