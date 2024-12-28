import { SupplierProduct } from "@/app/(admin)/admin/suppliers/interface/supplier-interface";
import { Customer } from "@/app/(seller)/pos/customers/interface/customer-interface";

export interface Transaction {
    transactionId: string;
    supplierProductId : string;
    quantity: number;
    productName: string;
    price: number;
    discount: number;
    vat: number;
    customerId: string | null;
    transactionDateCreated: Date;
    totalCost: number;
    paymentMethod: string | null;
    subtotal: number;
    SupplierProduct?: SupplierProduct;
    Customer?: Customer;
  }

  export interface NewTransactionPayload {
    statusCode: number;
    data: Transaction[]
    status: string;
}
