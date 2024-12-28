import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";
import { SupplierProduct } from "@/app/(admin)/admin/suppliers/interface/supplier-interface";
import { Customer } from "@/app/(seller)/pos/customers/interface/customer-interface";

// export interface Transaction {
//     transactionId: string;
//     supplierProductId : string;
//     quantity: number;
//     productName: string;
//     price: number;
//     discount: number;
//     vat: number;
//     customerId: string | null;
//     transactionDateCreated: Date;
//     totalCost: number;
//     paymentMethod: string | null;
//     subtotal: number;
//     SupplierProduct?: SupplierProduct;
//     Customer?: Customer;
//   }

export interface Transaction {
  transactionId: string; // Transaction ID
  // customerId?: string | null; // Customer ID if applicable

  totalCost: number; // Total cost after applying discounts and VAT
  paymentMethod: string; // Payment method (e.g., card, PayPal, cash)
  subtotal: number; // Subtotal (price * quantity). total before taxes and others are added

  // Relationships
  customer?: Customer | null;

  TransactionProduct?: TransactionProduct[]
  // List of related transaction products
}

// This is the structure of the data of all items in a transaction
export type TransactionProduct = Pick<InventoryItem, 'inventoryId' | 'stock_quantity' | 'supplier_products_id'> & {
  quantity: number,
  productName: string,
  price: number,
  VAT: number,
  discount: number
  transactionId: string
  SupplierProduct?: SupplierProduct

}

// Assuming the types for SupplierProducts and Transaction are defined elsewhere

// export interface TransactionProduct {  
//   quantity: number; // Quantity of the product
//   productName: string; // Name of the product
//   price: number; // Price of the product
//   discount: number; // Discount applied to the product
//   vat: number; // VAT applied to the product
//   transactionId: string; // ID of the related transaction   
// }

// this is the structure of the data from the frontend

export interface TransactionProductItems {
  cartProducts: TransactionProduct[]
  statusTab: boolean,
  totalCost: {
    total: number
    subtotal: number
  }
  paymentMethod: 'cash' |
  'bank' |
  'credit'
  customerId?: string
}





  export interface NewTransactionPayload {
    statusCode: number;
    data: Transaction[]
    status: string;
}
