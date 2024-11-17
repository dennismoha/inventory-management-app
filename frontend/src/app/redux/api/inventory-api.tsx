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

export const {
  // Generated hooks for supplier products
  useGetSupplierProductsQuery,
  useCreateSupplierProductMutation,
  useUpdateSupplierProductMutation,
  useDeleteSupplierProductMutation,
} = SupplierProductApi;

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
