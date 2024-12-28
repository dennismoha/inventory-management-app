/*
  Warnings:

  - Added the required column `VAT` to the `ProductPricing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `ProductPricing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductPricing" ADD COLUMN     "VAT" DECIMAL(8,2) NOT NULL,
ADD COLUMN     "discount" DECIMAL(8,2) NOT NULL;
