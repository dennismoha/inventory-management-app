// features/inventory/interfaces/inventory.interface.ts

import { Decimal } from '@prisma/client/runtime/library';
import { SupplierProduct } from '@src/features/suppliers/interfaces/supplier.interface';
import { Unit } from '@src/features/units/interfaces/units.interface';

export interface Inventory {
  inventoryId: string;                  // Unique identifier for the inventory
  supplier_products_id: string;         // Reference to the supplier's product
  product_weight: Decimal;
  stock_quantity: Decimal;              // Quantity of the product in stock
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

export interface ProductPricing {
  product_pricing_id: string;
  supplier_products_id: string;
  Quantity: Decimal;
  unit_id: string;
  price: Decimal;
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
  