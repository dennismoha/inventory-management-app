import { Category, SubCategory } from '@src/features/categories/interfaces/categories.interface';
import { Product } from '@src/features/products/interfaces/product.interface';
import { ProductUnit } from '@src/features/products/interfaces/product.interface';
import { Unit } from '@src/features/units/interfaces/units.interface';
import { Supplier, SupplierPricing, SupplierProduct } from '@src/features/suppliers/interfaces/supplier.interface';
import { Order, OrderProducts } from '@src/features/orders/interfaces/order.interface';
import { Inventory, ProductPricing, InventorystockQuantityVsReorderLevel } from '@src/features/inventory/interfaces/inventory.interface';
import { Miscellaneous } from '@src/features/miscellaneous/interfaces/miscellaneous.interface';
import { Customer } from '@src/features/customers/interfaces/customer.interface';
import { Transaction } from '@src/features/transactions/interfaces/transaction.interface';

// Utility type to handle both singular and array types
type WithArray<T> = T | T[];

// success_data type using WithArray
type success_data =
  | WithArray<Miscellaneous>
  | WithArray<Inventory>
  | WithArray<Order>
  | WithArray<OrderProducts>
  | WithArray<SupplierPricing>
  | WithArray<SupplierProduct>
  | WithArray<Supplier>
  | WithArray<Unit>
  | WithArray<Category>
  | WithArray<SubCategory>
  | WithArray<Product>
  | WithArray<ProductUnit>
  | WithArray<ProductPricing>
  | WithArray<Customer>
  | WithArray<Transaction>
  | WithArray<InventorystockQuantityVsReorderLevel>
  | null;

// GetSuccessMessage function
export default function GetSuccessMessage(statusCode: number, data: success_data, statusMessage: string) {
  return {
    statusCode: statusCode || 200, // Default to 200 if statusCode is not provided
    data: data || [], // Default to empty array if data is not provided (no null data allowed)
    status: statusMessage || 'Success' // Default to 'Success' if statusMessage is not provided
  };
}

// type success_data =
//     | Order
//     | OrderProducts
//     | SupplierPricing
//     | SupplierPricing[]
//     | SupplierProduct
//     | SupplierProduct[]
//     | Supplier
//     | Supplier[]
//     | Unit
//     | Unit[]
//     | Category
//     | Category[]
//     | SubCategory[]
//     | Product[]
//     | Product
//     | ProductUnit
//     | ProductUnit[]
//     | [];

// export default function GetSuccessMessage(statusCode: number, data: success_data, statusMessage: string) {
//     return {
//         statusCode: statusCode || 200, // Default to 200 if statusCode is not provided
//         data: data || null, // Default to null if data is not provided
//         status: statusMessage || 'Success' // Default to 'Success' if statusMessage is not provided
//     };
// }
