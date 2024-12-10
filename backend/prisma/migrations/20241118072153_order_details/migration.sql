-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'unpaid', 'partially_paid');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'bank', 'credit');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'empty', 'failed', 'fulfilled', 'extended', 'order_default');

-- CreateTable
CREATE TABLE "Order" (
    "supplier_id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "orderName" TEXT NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "shippingDate" TIMESTAMP(3) NOT NULL,
    "orderDeliveryDate" TIMESTAMP(3) NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL,
    "comments" TEXT,
    "supplierDetails" TEXT,
    "receiptPictorials" TEXT,
    "receiptText" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Miscellaneous" (
    "miscellaneous_id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "base_fare" DECIMAL(10,2) NOT NULL,
    "discount_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "additional_charges" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(10,2) NOT NULL,
    "shipping_charge" DECIMAL(10,2) NOT NULL,
    "payment_processing_fee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total_order_value" DECIMAL(10,2) NOT NULL,
    "currency_code" VARCHAR(3) NOT NULL,
    "fare_breakdown" JSONB,
    "tip_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "refund_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "other_fees" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "payment_status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Miscellaneous_pkey" PRIMARY KEY ("miscellaneous_id")
);

-- CreateTable
CREATE TABLE "OrderProducts" (
    "orderProductsId" TEXT NOT NULL,
    "orderId" UUID NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_per_unit" DECIMAL(10,2) NOT NULL,
    "units" TEXT NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "supplierProductsPricingId" UUID NOT NULL,

    CONSTRAINT "OrderProducts_pkey" PRIMARY KEY ("orderProductsId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "inventoryId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "totalProductQuantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventoryId")
);

-- CreateTable
CREATE TABLE "InventoryTracking" (
    "inventoryTrackingId" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "orderProductId" TEXT NOT NULL,
    "quantityDeducted" INTEGER NOT NULL,
    "dateDeducted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "InventoryTracking_pkey" PRIMARY KEY ("inventoryTrackingId")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Miscellaneous" ADD CONSTRAINT "Miscellaneous_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_supplierProductsPricingId_fkey" FOREIGN KEY ("supplierProductsPricingId") REFERENCES "SupplierPricing"("supplier_pricing") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTracking" ADD CONSTRAINT "InventoryTracking_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "OrderProducts"("orderProductsId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTracking" ADD CONSTRAINT "InventoryTracking_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Inventory"("inventoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
