/*
  Warnings:

  - You are about to drop the column `vat` on the `TransactionProduct` table. All the data in the column will be lost.
  - Added the required column `VAT` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" DROP COLUMN "vat",
ADD COLUMN     "VAT" DOUBLE PRECISION NOT NULL;
