import { InventoryItem, ProductPricing } from "@/app/inventory/interfaces/inventory-interface";
import { Product } from "@/app/products/interface/products-Interface";
import { Unit } from "@/app/units/interface/units-interface";

export interface Supplier {
    supplier_id: string;  // UUID for supplier
    name: string;         // Supplier name (unique)
    address: string;      // Supplier address
    contact: string;      // Supplier contact information
    created_at: Date;     // ISO 8601 DateTime string
    updated_at: Date;     // ISO 8601 DateTime string
    SupplierProducts?: SupplierProduct[];  // Array of SupplierProducts
    SupplierPricing?: SupplierPricing[];   // Array of SupplierPricing
  }
  
  export interface SupplierPricing {  
    supplier_pricing: string;  // UUID for supplier pricing
    supplier_id: string;       // UUID of the supplier
    product_id: string;        // UUID of the product
    unit_id: string;           // UUID of the unit
    price: number;             // Decimal price (number type in JS)
    effective_date: Date;      // Date when the price is effective (ISO 8601 date)
    supplierProduct: SupplierProduct;
    created_at: Date;          // ISO 8601 DateTime string
    updated_at: Date;          // ISO 8601 DateTime string
    supplier?: Supplier;       // Reference to the supplier
    product?: Product;         // Reference to the product
    unit?: Unit;               // Reference to the unit
  }
  
  export interface SupplierProduct {
    supplier_products_id: string;  // UUID for supplier product
    supplier_id: string;           // UUID of the supplier
    product_id: string;            // UUID of the product
    created_at: Date;              // ISO 8601 DateTime string
    updated_at: Date;              // ISO 8601 DateTime string
    supplier?: Supplier;           // Reference to the supplier
    product?: Product;             // Reference to the product
    Inventory?: InventoryItem,
    ProductPricing?: ProductPricing
  }

  export interface SupplierProductsApiResponse {
    statusCode: number;
    data: SupplierProduct[]
    status: string;
  }


export interface SuppplierApiResponse {
    statusCode: number;
    data: Supplier[];
    status: string;
    
}

export interface NewSupplierProductPayload {
  supplier_id: string;
  product_id: string;
}

export interface SupplierPricingResponse {
  status: string;
  data: SupplierPricing[]
  statusCode: number
}

export type SupplierPricingPayload = Pick<SupplierProduct, 'supplier_products_id'> & Pick<SupplierPricing, 'unit_id' | 'effective_date' | 'price'> & {
  Quantity: number
}

