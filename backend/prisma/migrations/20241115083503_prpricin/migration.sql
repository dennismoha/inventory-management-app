-- CreateTable
CREATE TABLE "Categories" (
    "categoryId" UUID NOT NULL,
    "category_slug" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "SubCategories" (
    "subcategory_id" UUID NOT NULL,
    "subcategory_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("subcategory_id")
);

-- CreateTable
CREATE TABLE "CategorySubCategory" (
    "category_subcategory_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "subcategory_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategorySubCategory_pkey" PRIMARY KEY ("category_id","subcategory_id")
);

-- CreateTable
CREATE TABLE "SupplierPricing" (
    "supplier_pricing" UUID NOT NULL,
    "supplier_products_id" UUID NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "Quantity" DECIMAL(8,2) NOT NULL,
    "unit_id" UUID NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "effective_date" DATE NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "SupplierPricing_pkey" PRIMARY KEY ("supplier_pricing")
);

-- CreateTable
CREATE TABLE "ProductUnits" (
    "product_unit_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,

    CONSTRAINT "ProductUnits_pkey" PRIMARY KEY ("product_unit_id")
);

-- CreateTable
CREATE TABLE "Units" (
    "unit_id" UUID NOT NULL,
    "unit" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "no_of_products" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("unit_id")
);

-- CreateTable
CREATE TABLE "SupplierProducts" (
    "supplier_products_id" UUID NOT NULL,
    "supplier_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "SupplierProducts_pkey" PRIMARY KEY ("supplier_products_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "subcategory_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "supplier_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_slug_key" ON "Categories"("category_slug");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_name_key" ON "Categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategories_subcategory_name_key" ON "SubCategories"("subcategory_name");

-- CreateIndex
CREATE UNIQUE INDEX "Units_unit_key" ON "Units"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "Units_short_name_key" ON "Units"("short_name");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierProducts_supplier_id_product_id_key" ON "SupplierProducts"("supplier_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_sku_key" ON "Products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_name_key" ON "Suppliers"("name");

-- AddForeignKey
ALTER TABLE "CategorySubCategory" ADD CONSTRAINT "CategorySubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySubCategory" ADD CONSTRAINT "CategorySubCategory_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "SubCategories"("subcategory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierPricing" ADD CONSTRAINT "SupplierPricing_supplier_products_id_fkey" FOREIGN KEY ("supplier_products_id") REFERENCES "SupplierProducts"("supplier_products_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierPricing" ADD CONSTRAINT "SupplierPricing_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUnits" ADD CONSTRAINT "ProductUnits_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUnits" ADD CONSTRAINT "ProductUnits_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProducts" ADD CONSTRAINT "SupplierProducts_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProducts" ADD CONSTRAINT "SupplierProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "SubCategories"("subcategory_id") ON DELETE RESTRICT ON UPDATE CASCADE;
