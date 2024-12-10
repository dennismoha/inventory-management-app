/*
  Warnings:

  - You are about to drop the column `units` on the `OrderProducts` table. All the data in the column will be lost.
  - Added the required column `order_quantity` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `productId` on the `OrderProducts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OrderProducts" DROP COLUMN "units",
ADD COLUMN     "order_quantity" INTEGER NOT NULL,
ADD COLUMN     "unit_id" UUID NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;
