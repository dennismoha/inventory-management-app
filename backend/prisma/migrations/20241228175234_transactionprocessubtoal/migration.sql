/*
  Warnings:

  - Added the required column `productSubTotalCost` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productTotalCost` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" ADD COLUMN     "productSubTotalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productTotalCost" DOUBLE PRECISION NOT NULL;
