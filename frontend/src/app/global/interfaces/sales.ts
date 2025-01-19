import { Transaction } from "@/app/(seller)/pos/transactions/interfaces/transactions-interface";

// SalesResponse
export type SalesResponse = number;    

  
  // ProductSalesResponse
  export interface ProductSalesResponse {
    supplier_products_id: string; 
    supplierProduct: string; 
    products: string; 
    totalSales: number; 
  }
  
  // CustomerSalesResponse
  export interface CustomerSalesResponse {
    customerId: string; 
    firstName: string; 
    lastName: string; 
    email?: string; 
    totalSales: CustomerProductSales[]; 
    transactionDate: Transaction[];
  }
  
  export interface CustomerProductSales {
    supplier_products_id: string; 
    supplierProduct: string; 
    products: string; 
    totalSales: number; 
  }
  
  // ProfitResponse
  export interface ProfitResponse {
    profit: number; 
    message: string;
  }
  
  // InventorySalesDifferenceResponse
  export interface InventorySalesDifferenceResponse {
    stockCost: {
      _sum: {
        stock_quantity: number; 
      };
    };
    salesCost: {
      _sum: {
        productTotalCost: number; 
      };
    };
    message: string;
  }
  
  export interface TransactionProductsBetweenDates {
    totalSales: number;
    transactions: Transaction[];
  }
  