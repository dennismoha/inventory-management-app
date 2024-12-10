/*
  Warnings:

  - You are about to drop the column `totalProductQuantity` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplier_products_id]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `last_restocked` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reorder_level` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_products_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISCONTINUED');

-- DropForeignKey
ALTER TABLE "InventoryTracking" DROP CONSTRAINT "InventoryTracking_productID_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "totalProductQuantity",
ADD COLUMN     "last_restocked" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reorder_level" INTEGER NOT NULL,
ADD COLUMN     "softDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "InventoryStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "stock_quantity" DECIMAL(8,2) NOT NULL,
ADD COLUMN     "supplier_products_id" UUID NOT NULL,
ADD COLUMN     "unit_id" UUID NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_supplier_products_id_key" ON "Inventory"("supplier_products_id");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_supplier_products_id_fkey" FOREIGN KEY ("supplier_products_id") REFERENCES "SupplierProducts"("supplier_products_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;
