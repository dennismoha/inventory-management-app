/*
  Warnings:

  - The primary key for the `TransactionProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_pkey",
ALTER COLUMN "Id" DROP DEFAULT,
ALTER COLUMN "Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TransactionProduct_pkey" PRIMARY KEY ("Id");
DROP SEQUENCE "TransactionProduct_Id_seq";
