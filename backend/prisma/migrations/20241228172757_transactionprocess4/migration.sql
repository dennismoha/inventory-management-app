/*
  Warnings:

  - You are about to drop the column `status` on the `TransactionProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("inventoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
