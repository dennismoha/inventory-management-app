/*
  Warnings:

  - A unique constraint covering the columns `[supplier_id,product_id]` on the table `SupplierProducts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SupplierProducts_supplier_id_product_id_key" ON "SupplierProducts"("supplier_id", "product_id");
