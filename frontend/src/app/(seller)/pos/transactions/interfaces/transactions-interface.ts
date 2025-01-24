import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";
import { SupplierProduct } from "@/app/(admin)/admin/suppliers/interface/supplier-interface";
import { Customer } from "@/app/(seller)/pos/customers/interface/customer-interface";


export interface Transaction {
  transactionId: string; // Transaction ID
  // customerId?: string | null; // Customer ID if applicable

  totalCost: number; // Total cost after applying discounts and VAT
  paymentMethod: string; // Payment method (e.g., card, PayPal, cash)
  subtotal: number; // Subtotal (price * quantity). total before taxes and others are added
  productSubTotalCost: number,
  productTotalCost?: number,
  // Relationships
  customer: Customer | null;
  transactionDateCreated: Date;

  TransactionProduct: TransactionProduct[]
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
  supplierProduct?: SupplierProduct
  productSubTotalCost?: number,
  productTotalCost?: number,

}




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
