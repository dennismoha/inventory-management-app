// import { Decimal } from '@prisma/client/runtime/library';
import { Customer } from '@src/features/customers/interfaces/customer.interface';
import { SupplierProduct } from '@src/features/suppliers/interfaces/supplier.interface';


// Transaction Type (in interfaces/transaction.interface.ts)
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