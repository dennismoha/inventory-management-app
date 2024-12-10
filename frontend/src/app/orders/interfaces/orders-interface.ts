// features/orders/order.interface.ts

import { Supplier, SupplierPricing } from "@/app/suppliers/interface/supplier-interface";




export interface Order {
  supplier_id: string,
  orderId: string;
  orderName: string;
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partially_paid';
  paymentMethod: 'cash' | 'bank' | 'credit';
  orderDate: Date;
  shippingDate: Date;
  orderDeliveryDate: Date;
  orderStatus?: 'pending' | 'empty' | 'failed' | 'fulfilled' | 'extended' | 'order_default';
  comments?: string | null;
  created_at: Date;
  last_updated_at: Date;
  supplier:Supplier,
  OrderProducts?:OrderProducts
}


export interface OrderProducts {
  orderProductsId: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  order_quantity: number;
  price_per_unit: number;
  unit_id: string;
  totalAmount: number;
  supplierProductsPricingId: string;
  order?: Order;
  supplierPricing?: SupplierPricing;
//   inventoryTracking?: Inventory
}

export interface OrderResponse {
    status: string,
    statusCode: string,
    data: Order[]
}

export type OrderProductResponse = Pick<OrderResponse,'status' | 'statusCode' > & {
    data: OrderProducts[] | OrderProducts
}



