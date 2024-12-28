/*
  Warnings:

  - You are about to drop the column `supplierProductId` on the `TransactionProduct` table. All the data in the column will be lost.
  - Added the required column `supplier_products_id` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_supplierProductId_fkey";

-- AlterTable
ALTER TABLE "TransactionProduct" DROP COLUMN "supplierProductId",
ADD COLUMN     "supplier_products_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_supplier_products_id_fkey" FOREIGN KEY ("supplier_products_id") REFERENCES "SupplierProducts"("supplier_products_id") ON DELETE RESTRICT ON UPDATE CASCADE;
