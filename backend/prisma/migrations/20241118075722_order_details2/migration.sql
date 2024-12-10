/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `Miscellaneous` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Miscellaneous_order_id_key" ON "Miscellaneous"("order_id");
