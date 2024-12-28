/*
  Warnings:

  - You are about to drop the column `discount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `supplierProductId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_supplierProductId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "discount",
DROP COLUMN "price",
DROP COLUMN "productName",
DROP COLUMN "quantity",
DROP COLUMN "supplierProductId",
DROP COLUMN "vat";

-- CreateTable
CREATE TABLE "TransactionProduct" (
    "Id" SERIAL NOT NULL,
    "supplierProductId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "TransactionProduct_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
