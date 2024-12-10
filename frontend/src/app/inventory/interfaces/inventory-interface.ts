import { SupplierProduct } from "@/app/suppliers/interface/supplier-interface";
import { Unit } from "@/app/units/interface/units-interface";

export interface InventoryItem {
    inventoryId: string;                  // Unique identifier for the inventory
    supplier_products_id: string;         // Reference to the supplier's product
    product_weight: number;
    stock_quantity: number;              // Quantity of the product in stock
    reorder_level: number;                // The level at which new stock should be ordered
    last_restocked: Date;                 // Date when the item was last restocked
    unit_id: string;                      // Unit of measure (e.g., kg, g, etc.)
    created_at: Date;                     // Timestamp of when the record was created
    updated_at: Date;                     // Timestamp of the last update to the record
    softDelete: boolean;                  // Flag indicating if the item is logically deleted
    status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';              // Status of the item (ACTIVE, INACTIVE, DISCONTINUED)
    
    // Relations
    supplierProduct?: SupplierProduct;    // Reference to the supplier product record
    unit?: Unit;                          // Reference to the unit of measurement
  }


  export interface InventoryItemsApiResponse  {
    statusCode: number;
    data: InventoryItem[]
    status: string;
  }

  export interface ProductPricing {
    product_pricing_id: string;
    supplier_products_id: string;
    Quantity: number;
    unit_id: string;
    price: number;
    effective_date: Date;
    created_at: Date;
    updated_at: Date;
    supplierProduct?: SupplierProduct; // Relation to SupplierProducts model
    unit?: Unit; // Relation to Units model
  }

  export type NewProductPricingPayload = Pick<ProductPricing,'supplier_products_id' | 'Quantity' |'unit_id'| 'price' | 'effective_date' >


  

  export type NewInventoryItemPayload  = Pick<InventoryItem , 'supplier_products_id' | 'stock_quantity' |'reorder_level' | 'unit_id' | 'last_restocked' >