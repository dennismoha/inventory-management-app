import { Transaction } from '../../transactions/interfaces/transactions-interface';

export interface Customer {
  customerId: string;
  firstName: string; // Customer's first name
  lastName: string; // Customer's last name
  email: string;
  phoneNumber: string;
  address: string | null; // Optional: Customer's address

  country: string | null; // Optional: Customer's country
  createdAt: Date;
  updatedAt: Date;
  status: string; // Customer status: "active", "inactive", etc.
  loyaltyPoints: number;
  totalSpent: number;

  notes: string | null; // Optional: Any special notes or preferences about the customer
  preferredPaymentMethod: string | null; // Optional: Preferred payment method (e.g., Credit card, PayPal)
}

// used in the customer insights

export interface NewCustomerPayload {
  statusCode: number;
  data: Customer[];
  status: string;
}

export interface CustomerTotalSalesInterface {
  supplier_products_id: string;
  supplierProduct: string;
  products: string;
  totalSales: number;
}

export type GetTransactionDateData = Transaction;
