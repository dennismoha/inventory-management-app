import { Category,SubCategory,} from '@/app/categories/interface/categories-interface';
export interface Product {
    product_id: string;         // UUID
    name: string;               // Name of the product
    description: string;        // Description of the product
    category_id: string;        // UUID of the category
    subcategory_id: string;     // UUID of the subcategory
    image_url: string;          // URL to the product image
    sku: string;               // Optional SKU (Stock Keeping Unit)
    created_at: Date;         // ISO 8601 DateTime string
    updated_at: Date;         // ISO 8601 DateTime string
    category?: Category;         // Parent category of the product
    subcategory?: SubCategory;   // Parent subcategory of the product
    // ProductUnits?: ProductUnit[]; // Array of product units (not detailed in your schema)
    // SupplierPricing?: SupplierPricing[]; // Array of supplier pricing (not detailed in your schema)
    // SupplierProducts?: SupplierProduct[]; // Array of supplier products (not detailed in your schema)
  }
//   export interface Category {
//     categoryId: string;         // UUID
//     category_slug: string;      // Unique string for the slug
//     category_name: string;      // Unique name of the category
//     description: string;        // Description of the category
//     created_at: Date;         // ISO 8601 DateTime string
//     updated_at: Date;         // ISO 8601 DateTime string  

//     Products?: Product[];        // Array of products in the category
// }

// // Interface for SubCategories
// export interface SubCategory {
//     subcategory_id: string;     // UUID
//     subcategory_name: string;   // Unique name of the subcategory          
//     description: string;        // Description of the subcategory
//     created_at: Date;         // ISO 8601 DateTime string
//     updated_at: Date;         // ISO 8601 DateTime string
//     category?: Category;         // Parent category
//     Products?: Product[];        // Array of products in the subcategory
// }


export interface ProductApiResponse {
    statusCode: number;
    data: Product[];
    status: string;
    
}

export interface NewProductPayload {
    name: string;
    description: string;
    category_id: string;        // UUID of the category
    subcategory_id: string;     // UUID of the subcategory
    image_url: string;          // URL to the product image
    sku: string;               // Optional SKU (Stock Keeping Unit)

}