import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductApiResponse,
  NewProductPayload,
} from "@/app/products/interface/products-Interface";
import {
  Category,
  CategoryResponse,
  SubCategory,
  SubCategoryApiResponse,
} from "@/app/categories/interface/categories-interface";
import {
  Unit,
  UnitApiResponse,
  UnitBodyPayload,
} from "@/app/units/interface/units-interface"; // Import the Unit types
// import { Supplier } from '; // Import the Supplier type
import {
  Supplier,
  SupplierPricing,
  SupplierProduct,
  SuppplierApiResponse,
  NewSupplierProductPayload,
  SupplierPricingResponse,
  SupplierProductsApiResponse,
  SupplierPricingPayload,
} from "@/app/suppliers/interface/supplier-interface";
import { Order, OrderProductResponse, OrderProducts, OrderResponse } from "@/app/orders/interfaces/orders-interface";
import { InventoryItem, InventoryItemsApiResponse, NewInventoryItemPayload, NewProductPricingPayload, ProductPricing } from "@/app/inventory/interfaces/inventory-interface";
import { ApiResponse } from "@/app/utils/interfaces/util-interface";
export interface Product {
  product_id: string; // UUID
  name: string; // Name of the product
  description: string; // Description of the product
  category_id: string; // UUID of the category
  subcategory_id: string; // UUID of the subcategory
  image_url: string; // URL to the product image
  sku: string; // Optional SKU (Stock Keeping Unit)
  created_at: Date; // ISO 8601 DateTime string
  updated_at: Date; // ISO 8601 DateTime string
  category?: Category; // Parent category of the product
  subcategory?: SubCategory; // Parent subcategory of the product
  // ProductUnits?: ProductUnit[]; // Array of product units (not detailed in your schema)
  // SupplierPricing?: SupplierPricing[]; // Array of supplier pricing (not detailed in your schema)
  // SupplierProducts?: SupplierProduct[]; // Array of supplier products (not detailed in your schema)
}

export interface Products {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface Miscellaneous {
  order_id: string;
  base_fare: number;
  discount_amount: number;
  additional_charges: number;
  tax_amount: number;
  shipping_charge: number;
  payment_processing_fee: number;
  total_order_value: number;
  currency_code: string;
  fare_breakdown: string;
  tip_amount: number;
  refund_amount: number;
  other_fees: number;
  payment_status: string;
  notes?: string;
  order?: Order
}

export const InventoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "inventoryApi",
  tagTypes: [
    "DashboardMetrics",
    "Products",
    "Users",
    "Expenses",
    "categories",
    "SubCategory",
    "Units",
    "Suppliers",
    "SupplierPricing",   
    "SupplierProducts",
    "orders",
    "orderProducts",
    "Miscellaneous",
    "InventoryItems",
    "ProductPricing"
  ],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    // getProducts: build.query<ProductApiResponse, string | void>({
    //   query: (search) => ({
    //     url: "/products",
    //     params: search ? { search } : {},
    //   }),
    //   providesTags: ["Products"],
    // }),
    // createProduct: build.mutation<Product, NewProductPayload>({
    //   query: (newProduct) => ({
    //     url: "/products",
    //     method: "POST",
    //     body: newProduct,
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
    // // Update a product
    // updateProduct: build.mutation <Product, Pick<Product, 'product_id'>>({
    //   query:({product_id, ...patch}) =>({
    //     url: `/products/${product_id}`,
    //     method: "PUT", // Using PUT to update the product
    //     body: patch, // The product data to be updated
    //   }),
    //   invalidatesTags: [{ type: "Products" }],
    // }),

    // // updateProducts: build.mutation<
    // //   Product,
    // //   { product_id: string; payload: Partial<Product> }
    // // >({

    // //   query: ({ product_id, payload }) => ({
    // //     url: `/products/${product_id}`,
    // //     method: "PUT", // Using PUT to update the product
    // //     body: payload, // The product data to be updated
    // //   }),
    // //   // Invalidating the cache so the product list is re-fetched after updating
    // //   invalidatesTags: [{ type: "Products" }],
    // // }),

    // // Delete a product
    // deleteProduct: build.mutation<void, { product_id: string }>({
    //   query: ({ product_id }) => {
    //     console.log('product id is ', product_id)
    //     return {
    //       url: `/products/${product_id}`,
    //       method: "DELETE", // Using DELETE to remove the product
    //     }
    //   },
    //   // Invalidates the cache after deleting a product
    //   invalidatesTags: [{ type: "Products" }],
    // }),

    // getUsers: build.query<User[], void>({
    //   query: () => "/users",
    //   providesTags: ["Users"],
    // }),
    // getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
    //   query: () => "/expenses",
    //   providesTags: ["Expenses"],
    // }),
    // getCategories: build.query<CategoryResponse, void>({
    //   query: () => "/categories", // Fetch categories from the 'categories' endpoint
    //   providesTags: ["categories"],
    // }),
    // getSubCategories: build.query<SubCategoryApiResponse, void>({
    //   query: () => "/subcategories", // API endpoint for fetching subcategories
    //   providesTags: ["SubCategory"], // Cache invalidation for this query
    // }),
    // getSubCategoryById: build.query<SubCategory, string>({
    //   query: (subcategoryId) => `/subcategories/${subcategoryId}`, // Fetch by ID

    //   // Optionally, set a `keepUnusedDataFor` time (default is 60 seconds)
    //   keepUnusedDataFor: 300000, // Keep unused data for 5 minutes before removal
    //   providesTags: (result, error, subcategoryId) => [
    //     { type: "SubCategory", id: subcategoryId },
    //   ],
    // }),
    // createSubCategory: build.mutation<SubCategory, Partial<SubCategory>>({
    //   query: (newSubCategory) => ({
    //     url: "/subcategories",
    //     method: "POST",
    //     body: newSubCategory,
    //   }),
    //   // Invalidates all queries related to subcategories (trigger refetch)
    //   invalidatesTags: [{ type: "SubCategory" }],
    // }),
    // updateSubCategory: build.mutation<SubCategory, SubCategory>({
    //   query: (updatedSubCategory) => ({
    //     url: `/subcategories/${updatedSubCategory.subcategory_id}`,
    //     method: "PUT",
    //     body: updatedSubCategory,
    //   }),
    //   invalidatesTags: (result, error, { subcategory_id }) => [
    //     { type: "SubCategory", id: subcategory_id },
    //   ],
    // }),
    // deleteSubCategory: build.mutation<void, string>({
    //   query: (subcategoryId) => ({
    //     url: `/subcategories/${subcategoryId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "SubCategory" }],
    // }),
  }),
});

const CategoryApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryResponse, void>({
      query: () => "/categories", // Fetch categories from the 'categories' endpoint
      providesTags: ["categories"],
      keepUnusedDataFor: 300000,
    }),
    createCategory: build.mutation<CategoryResponse, Category>({
      query: (Category) => ({
        url: "/categories",
        method: "POST",
        body: Category,
      }),
      // Invalidates all queries related to subcategories (trigger refetch)
      invalidatesTags: [{ type: "categories" }],
    }),
    deleteCategory: build.mutation<void, string>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "categories" }],
    }),

    getSubCategories: build.query<SubCategoryApiResponse, void>({
      query: () => "/subcategories", // API endpoint for fetching subcategories
      providesTags: ["SubCategory"], // Cache invalidation for this query
    }),
    getSubCategoryById: build.query<SubCategory, string>({
      query: (subcategoryId) => `/subcategories/${subcategoryId}`, // Fetch by ID

      // Optionally, set a `keepUnusedDataFor` time (default is 60 seconds)
      keepUnusedDataFor: 300000, // Keep unused data for 5 minutes before removal
      providesTags:["SubCategory"]
    }),
    createSubCategory: build.mutation<SubCategory, Partial<SubCategory>>({
      query: (newSubCategory) => ({
        url: "/subcategories",
        method: "POST",
        body: newSubCategory,
      }),
      // Invalidates all queries related to subcategories (trigger refetch)
      invalidatesTags: [{ type: "SubCategory" }],
    }),
    updateSubCategory: build.mutation<SubCategory, Pick<SubCategory, 'subcategory_id'>>({
      query: ({subcategory_id,...patch}) => ({
        url: `/subcategories/${subcategory_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["SubCategory"]
    }),
    deleteSubCategory: build.mutation<void, string>({
      query: (subcategoryId) => ({
        url: `/subcategories/${subcategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "SubCategory" }],
    }),
  }),
});

const ProductsApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductApiResponse, string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProductPayload>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    // Update a product
    updateProduct: build.mutation<Product, Pick<Product, "product_id">>({
      query: ({ product_id, ...patch }) => ({
        url: `/products/${product_id}`,
        method: "PUT", // Using PUT to update the product
        body: patch, // The product data to be updated
      }),
      invalidatesTags: [{ type: "Products" }],
    }),

    // updateProducts: build.mutation<
    //   Product,
    //   { product_id: string; payload: Partial<Product> }
    // >({

    //   query: ({ product_id, payload }) => ({
    //     url: `/products/${product_id}`,
    //     method: "PUT", // Using PUT to update the product
    //     body: payload, // The product data to be updated
    //   }),
    //   // Invalidating the cache so the product list is re-fetched after updating
    //   invalidatesTags: [{ type: "Products" }],
    // }),

    // Delete a product
    deleteProduct: build.mutation<void, { product_id: string }>({
      query: ({ product_id }) => {
        console.log("product id is ", product_id);
        return {
          url: `/products/${product_id}`,
          method: "DELETE", // Using DELETE to remove the product
        };
      },
      // Invalidates the cache after deleting a product
      invalidatesTags: [{ type: "Products" }],
    }),
  }),
  overrideExisting: true,
});

// unit api
const UnitApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch a list of units
    getUnits: build.query<UnitApiResponse, string | void>({
      query: (search) => ({
        url: "/units",
        params: search ? { search } : {},
      }),
      providesTags: ["Units"],
    }),

    // Create a new unit
    createUnit: build.mutation<UnitApiResponse, UnitBodyPayload>({
      query: (newUnit) => ({
        url: "/units",
        method: "POST",
        body: newUnit,
      }),
      invalidatesTags: ["Units",  "SupplierPricing"],
    }),

    // Update an existing unit
    updateUnit: build.mutation<Unit, Pick<Unit, "unit_id">>(
      {
        query: ({ unit_id, ...patch }) => ({
          url: `/units/${unit_id}`,
          method: "PUT",
          body: patch,
        }),
        invalidatesTags: ["Units",  "SupplierPricing"],
      }
    ),

    // Delete a unit
    deleteUnit: build.mutation<void, { unit_id: string }>({
      query: ({ unit_id }) => ({
        url: `/units/${unit_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Units"],
    }),
  }),
  overrideExisting: true, // Allow overriding any existing endpoints
});

// suppliers
const SupplierApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch suppliers
    getSuppliers: build.query<SuppplierApiResponse, string | void>({
      query: (search) => ({
        url: "/suppliers",
        params: search ? { search } : {},
      }),
      providesTags: ["Suppliers"],
    }),

    // Create a new supplier
    createSupplier: build.mutation<Supplier, Omit<Supplier, "supplier_id">>({
      query: (newSupplier) => ({
        url: "/suppliers",
        method: "POST",
        body: newSupplier,
      }),
      invalidatesTags: ["Suppliers"],
    }),

    // Update an existing supplier
    updateSupplier: build.mutation<
      Supplier, Pick<Supplier, 'supplier_id'>      
    >({
      query: ({ supplier_id, ...patch }) => ({
        url: `/suppliers/${supplier_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Suppliers","SupplierPricing"],
    }),

    // Delete a supplier
    deleteSupplier: build.mutation<void, { supplier_id: string }>({
      query: ({ supplier_id }) => ({
        url: `/suppliers/${supplier_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
  overrideExisting: true,
});

// Supplier Pricing.
const SupplierPricingApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch supplier pricing
    getSupplierPricing: build.query<SupplierPricingResponse, string | void>({
      query: (search) => ({
        url: "/supplier-pricing",
        params: search ? { search } : {},
      }),
      providesTags: ["SupplierPricing"],
    }),

    // Create supplier pricing
    createSupplierPricing: build.mutation<
      SupplierPricing,
      SupplierPricingPayload
    >({
      query: (newPricing) => ({
        url: "/supplier-pricing",
        method: "POST",
        body: newPricing,
      }),
      invalidatesTags: ["SupplierPricing"],
    }),

    // Update supplier pricing
    updateSupplierPricing: build.mutation<
      SupplierPricing, Pick< SupplierPricing,'supplier_pricing'>
     
    >({
      query: ({ supplier_pricing, ...patch }) => ({
        url: `/supplier-pricing/${supplier_pricing}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["SupplierPricing"],
    }),

    // Delete supplier pricing
    deleteSupplierPricing: build.mutation<void, { supplier_pricing: string }>({
      query: ({ supplier_pricing }) => ({
        url: `/supplier-pricing/${supplier_pricing}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupplierPricing"],
    }),
  }),
  overrideExisting: true,
});

// supplier product
const SupplierProductApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch supplier products
    getSupplierProducts: build.query<
      SupplierProductsApiResponse,
      string | void
    >({
      query: (search) => ({
        url: "/supplier-products",
        params: search ? { search } : {},
      }),
      providesTags: ["SupplierProducts"],
    }),

    // Create a new supplier product
    createSupplierProduct: build.mutation<
      SupplierProduct,
      NewSupplierProductPayload
    >({
      query: (newSupplierProduct) => ({
        url: "/supplier-products",
        method: "POST",
        body: newSupplierProduct,
      }),
      invalidatesTags: ["SupplierProducts", "Suppliers"],
    }),

    // Update an existing supplier product
    updateSupplierProduct: build.mutation<
      SupplierProduct,
      { supplier_products_id: string; patch: Partial<SupplierProduct> }
    >({
      query: ({ supplier_products_id, patch }) => ({
        url: `/supplier-products/${supplier_products_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["SupplierProducts"],
    }),

    // Delete a supplier product
    deleteSupplierProduct: build.mutation<
      void,
      { supplier_products_id: string }
    >({
      query: ({ supplier_products_id }) => ({
        url: `/supplier-products/${supplier_products_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupplierProducts"],
    }),
  }),
  overrideExisting: true,
});

// orders

const OrderApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Get a list of orders
    getOrders: build.query<OrderResponse, void>({
      query: () => "/orders", // Fetch orders from the 'orders' endpoint
      providesTags: ["orders"], // Cache tags for invalidation
      keepUnusedDataFor: 300000, // Keep unused data for 5 minutes
    }),

    // Create a new order
    createOrder: build.mutation<OrderResponse, Order>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order, // Send the order object in the body of the request
      }),
      // Invalidate queries related to orders to trigger a refetch
      invalidatesTags: [{ type: "orders" }],
    }),

    // Delete an order by its ID
    deleteOrder: build.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      // Invalidate all queries related to orders
      invalidatesTags: [{ type: "orders" }],
    }),

    // Get details of a specific order by its ID
    getOrderById: build.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`, // Fetch the order by ID
      providesTags: ["orders"], // Cache invalidation for this query
    }),

    // Update an existing order by its ID
    updateOrder: build.mutation<Order, Pick<Order, 'orderId'>>({
      query: ({orderId, ...patch}) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: patch, // Send the updates in the request body
      }),
      invalidatesTags: ["orders"], // Invalidate cache for orders after update
    }),
  }),
});

// order-products

const OrderProductApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all order-products  - there is no backend endpoint for this
    getOrderProducts: build.query<OrderProductResponse, void>({
      query: () => "/order-products", // Fetch all order-products from the 'order-products' endpoint
      providesTags: ["orderProducts"], // Cache tags for invalidation
      keepUnusedDataFor: 300000, // Keep unused data for 5 minutes
    }),

    // Get an order-product by ID  - no backend endpoint for this at the moment
    getOrderProductById: build.query< OrderProductResponse, Pick<Order,'orderId'>>({
      query: (orderProductId) => `/order-products/${orderProductId}`, // Fetch order-product by ID
      providesTags: ["orderProducts"], // Cache invalidation for this query
    }),

     // Get an order-product by orderID 
     getOrderProductByOrderId: build.query<OrderProductResponse, Pick<Order,'orderId'>>({
      query: (orderId) => `/order-products/${orderId}`, // Fetch order-product by ID
      providesTags: ["orderProducts"], // Cache invalidation for this query
    }),

    // Create a new order-product
    createOrderProduct: build.mutation<OrderProductResponse, OrderProducts>({
      query: (orderProduct) => ({
        url: "/order-products",
        method: "POST",
        body: orderProduct, // Send the order-product data in the body
      }),
      invalidatesTags: [{ type: "orderProducts" }], // Invalidate queries related to order-products to trigger a refetch
    }),

    // Update an existing order-product
    updateOrderProduct: build.mutation<OrderProducts, { orderProductId: string, patch: Partial<OrderProducts> }>({
      query: ({ orderProductId, patch }) => ({
        url: `/order-products/${orderProductId}`,
        method: "PUT",
        body: patch, // Send the updated order-product data
      }),
      invalidatesTags: ["orderProducts"], // Invalidate the cache after updating
    }),

    // Delete an order-product by its ID
    deleteOrderProduct: build.mutation<void, string>({
      query: (orderProductId) => ({
        url: `/order-products/${orderProductId}`,
        method: "DELETE", // Delete the order-product by ID
      }),
      invalidatesTags: [ "orderProducts","orders" ], // Invalidate queries related to order-products to trigger a refetch
    }),
  }),
});

const MiscellaneousApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all miscellaneous data
    getMiscellaneous: build.query<Miscellaneous[], string | void>({
      query: (search) => ({
        url: '/miscellaneous',
        params: search ? { search } : {}, // Optional search filter
      }),
      providesTags: ['Miscellaneous'],
    }),

    // Fetch miscellaneous data by order ID
    getMiscellaneousByOrderId: build.query<Miscellaneous, string>({
      query: (order_id) => `/miscellaneous/${order_id}`,
      providesTags: ['Miscellaneous'],
    }),

    // Create a new miscellaneous record
    createMiscellaneous: build.mutation<Miscellaneous, Omit<Miscellaneous, 'order_id'>>({
      query: (newMiscellaneous) => ({
        url: '/miscellaneous',
        method: 'POST',
        body: newMiscellaneous,
      }),
      invalidatesTags: ['Miscellaneous'],
    }),

    // Update an existing miscellaneous record
    updateMiscellaneous: build.mutation<Miscellaneous, Pick<Miscellaneous, 'order_id'> & Partial<Miscellaneous>>({
      query: ({ order_id, ...patch }) => ({
        url: `/miscellaneous/${order_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Miscellaneous'],
    }),

    // Delete a miscellaneous record
    deleteMiscellaneous: build.mutation<void, { order_id: string }>({
      query: ({ order_id }) => ({
        url: `/miscellaneous/${order_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Miscellaneous'],
    }),
  }),
  overrideExisting: true,
});

// inventory
const ProductsInventoryApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch inventory items
    getInventoryItems: build.query<
      InventoryItemsApiResponse,
      void
    >({
      query: () => ({
        url: "/inventory",
       
      }),
      providesTags: ["InventoryItems"],
    }),

    // Create a new inventory item
    createInventoryItem: build.mutation<
      InventoryItem,
      NewInventoryItemPayload
    >({
      query: (newInventoryItem) => ({
        url: "/inventory",
        method: "POST",
        body: newInventoryItem,
      }),
      invalidatesTags: ["InventoryItems"],
    }),

    // Update an existing inventory item
    updateInventoryItem: build.mutation<
      InventoryItem,
      { inventory_item_id: string; patch: Partial<InventoryItem> }
    >({
      query: ({ inventory_item_id, patch }) => ({
        url: `/inventory-items/${inventory_item_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["InventoryItems"],
    }),

    // Delete an inventory item
    deleteInventoryItem: build.mutation<
      void,
      { inventory_item_id: string }
    >({
      query: ({ inventory_item_id }) => ({
        url: `/inventory-items/${inventory_item_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InventoryItems"],
    }),
  }),
  overrideExisting: true,
});


const ProductPricingApi = InventoryApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch product pricing
    getProductPricing: build.query<ApiResponse<ProductPricing>, void>({
      query: () => ({
        url: '/product-pricing',
      }),
      providesTags: ['ProductPricing'],
    }),

    // Create a new product pricing
    createProductPricing: build.mutation<ProductPricing, NewProductPricingPayload>({
      query: (newProductPricing) => ({
        url: '/product-pricing',
        method: 'POST',
        body: newProductPricing,
      }),
      invalidatesTags: ['ProductPricing'],
    }),

    // Update an existing product pricing
    updateProductPricing: build.mutation<
      ProductPricing,
      { product_pricing_id: string; patch: Partial<ProductPricing> }
    >({
      query: ({ product_pricing_id, patch }) => ({
        url: `/product-pricing/${product_pricing_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['ProductPricing'],
    }),

    // Delete product pricing
    deleteProductPricing: build.mutation<void, { product_pricing_id: string }>({
      query: ({ product_pricing_id }) => ({
        url: `/product-pricing/${product_pricing_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProductPricing'],
    }),
  }),
  overrideExisting: true,
});

// Export hooks to be used in components
export const {
  useGetProductPricingQuery,
  useCreateProductPricingMutation,
  useUpdateProductPricingMutation,
  useDeleteProductPricingMutation,
} = ProductPricingApi;

export const {
  useGetInventoryItemsQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
} = ProductsInventoryApi;



export const {
  useGetMiscellaneousQuery,
  useGetMiscellaneousByOrderIdQuery,
  useCreateMiscellaneousMutation,
  useUpdateMiscellaneousMutation,
  useDeleteMiscellaneousMutation,
} = MiscellaneousApi;

export const {
  useGetOrderProductsQuery,
  useGetOrderProductByIdQuery,
  useCreateOrderProductMutation,
  useUpdateOrderProductMutation,
  useDeleteOrderProductMutation,
  useGetOrderProductByOrderIdQuery
} = OrderProductApi;



export const {
  // Generated hooks for supplier products
  useGetSupplierProductsQuery,
  useCreateSupplierProductMutation,
  useUpdateSupplierProductMutation,
  useDeleteSupplierProductMutation,
} = SupplierProductApi;

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = OrderApi;

export const {
  // Generated hooks for supplier pricing
  useGetSupplierPricingQuery,
  useCreateSupplierPricingMutation,
  useUpdateSupplierPricingMutation,
  useDeleteSupplierPricingMutation,
} = SupplierPricingApi;

export const {
  // Generated hooks for suppliers
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = SupplierApi;

export const {
  // Generated hooks for units
  useGetUnitsQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = UnitApi;

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} = ProductsApi;

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useDeleteCategoryMutation,
} = CategoryApi;
export const {
  useGetDashboardMetricsQuery,
  // useGetProductsQuery,
  // useCreateProductMutation,
  // useGetUsersQuery,
  // useGetExpensesByCategoryQuery,
  // useGetCategoriesQuery,
  // useGetSubCategoriesQuery,
  // useGetSubCategoryByIdQuery,
  // useCreateSubCategoryMutation,
  // useUpdateSubCategoryMutation,
  // useDeleteSubCategoryMutation,
  // useUpdateProductMutation,
  //  useDeleteProductMutation
} = InventoryApi;
