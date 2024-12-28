/*
  Warnings:

  - Added the required column `inventoryId` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_quantity` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" ADD COLUMN     "inventoryId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stock_quantity" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;
