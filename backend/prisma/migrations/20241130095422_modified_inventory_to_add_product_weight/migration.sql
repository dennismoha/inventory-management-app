/*
  Warnings:

  - Added the required column `product_weight` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "product_weight" DECIMAL(8,2) NOT NULL;
