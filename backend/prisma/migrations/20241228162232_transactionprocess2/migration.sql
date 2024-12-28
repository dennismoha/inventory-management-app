/*
  Warnings:

  - The primary key for the `TransactionProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `TransactionProduct` table. All the data in the column will be lost.
  - The required column `TransactionProductId` was added to the `TransactionProduct` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_pkey",
DROP COLUMN "Id",
ADD COLUMN     "TransactionProductId" TEXT NOT NULL,
ADD CONSTRAINT "TransactionProduct_pkey" PRIMARY KEY ("TransactionProductId");
