// features/inventory/interfaces/inventory.interface.ts

import { Decimal } from '@prisma/client/runtime/library';
import { SupplierProduct } from '@src/features/suppliers/interfaces/supplier.interface';
import { Unit } from '@src/features/units/interfaces/units.interface';

export interface Inventory {
  inventoryId: string; // Unique identifier for the inventory
  supplier_products_id: string; // Reference to the supplier's product
  product_weight: Decimal;
  stock_quantity: Decimal; // Quantity of the product in stock
  reorder_level: number; // The level at which new stock should be ordered
  last_restocked: Date; // Date when the item was last restocked
  unit_id: string; // Unit of measure (e.g., kg, g, etc.)
  created_at: Date; // Timestamp of when the record was created
  updated_at: Date; // Timestamp of the last update to the record
  softDelete: boolean; // Flag indicating if the item is logically deleted
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED'; // Status of the item (ACTIVE, INACTIVE, DISCONTINUED)

  // Relations
  supplierProduct?: SupplierProduct; // Reference to the supplier product record
  unit?: Unit; // Reference to the unit of measurement
}

export interface ProductPricing {
  product_pricing_id: string;
  supplier_products_id: string;
  Quantity: Decimal;
  unit_id: string;
  price: Decimal;
  VAT: Decimal | null;
  discount: Decimal | null;
  effective_date: Date;
  created_at: Date;
  updated_at: Date;
  supplierProduct?: SupplierProduct; // Relation to SupplierProducts model
  unit?: Unit; // Relation to Units model
}

// export interface Inventory {
//     inventoryId: string;
//     productName: string;
//     sku: string;
//     totalProductQuantity: number;
//     created_at: Date;
//     updated_at: Date;
//   }

export interface InventorystockQuantityVsReorderLevel {
  inventoryId: number;
  stock_quantity: Decimal;
  reorder_level: number;
  // Add other fields from your Inventory model if needed
}

export interface InventoryRestock {
  inventoryRestockId: string;
  inventory_Id: string; // UUID for the inventory item (primary key)
  new_stock_quantity: Decimal; // The new stock quantity after restocking (Decimal type)
  old_stock_quantity: Decimal; // The stock quantity before restocking (Decimal type)
  reorder_level: number; // Reorder level indicating when to reorder stock
  restock_date: Date; // The date when the restocking occurred (DateTime)
  softDelete: boolean; // Flag indicating whether the record is soft deleted (boolean)
  InventoryItemID?: Inventory; //  Inventory relation (InventoryItemID is a reference to `inventoryId`)
}

/**
 * Represents a single entry in the Inventory Sales Tracking table.
 */
export interface InventorySalesTracking {
  inventorysalesTrackingId: string;
  inventoryId: string;
  new_stock_quantity: Decimal;
  /**
   * The quantity of stock that existed before the restock.
   */
  old_stock_quantity: Decimal;
  /**
   * The level at which the item needs to be reordered.
   */
  reorder_level: number;
  /**
   * The date when the item was restocked.
   */
  restock_date: Date;
  softDelete: boolean;
  InventoryItemID?: Inventory; // Assuming Inventory model is defined elsewhere
}
