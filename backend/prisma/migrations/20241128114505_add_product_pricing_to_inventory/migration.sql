-- CreateTable
CREATE TABLE "ProductPricing" (
    "product_pricing_id" TEXT NOT NULL,
    "supplier_products_id" UUID NOT NULL,
    "Quantity" DECIMAL(8,2) NOT NULL,
    "unit_id" UUID NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "effective_date" DATE NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ProductPricing_pkey" PRIMARY KEY ("product_pricing_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductPricing_supplier_products_id_key" ON "ProductPricing"("supplier_products_id");

-- AddForeignKey
ALTER TABLE "ProductPricing" ADD CONSTRAINT "ProductPricing_supplier_products_id_fkey" FOREIGN KEY ("supplier_products_id") REFERENCES "SupplierProducts"("supplier_products_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPricing" ADD CONSTRAINT "ProductPricing_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;
