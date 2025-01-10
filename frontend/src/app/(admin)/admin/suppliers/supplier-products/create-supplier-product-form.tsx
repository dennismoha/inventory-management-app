import React, { useState,  } from 'react';

import { useCreateSupplierProductMutation, useGetProductsQuery,useGetSuppliersQuery } from '@/app/redux/api/inventory-api'; // Import RTK query hook
import { Supplier } from '../interface/supplier-interface';
import { Product } from '../../products/interface/products-Interface';

// interface Product {
//   product_id: string;
//   name: string;
//   description: string;
//   category_id: string;
//   subcategory_id: string;
//   image_url: string;
//   sku: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Supplier {
//   supplier_products_id: string;
//   supplier_id: string;
//   product_id: string;
//   created_at: string;
//   updated_at: string;
//   name: string;
// }


const SupplierProductDropdown: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // RTK Query Mutation Hook to create a new supplier-product
  const [createSupplierProduct, { isLoading, isSuccess, isError, error }] = useCreateSupplierProductMutation();
  // Destructuring the values from the hook with correct aliasing:
  const { data: ProductsData, isLoading: getProductsLoading, isError: getProductsError } = useGetProductsQuery();
  const { data: SuppliersData, isLoading: getSuppliersLoading, isError: getSuppliersError } = useGetSuppliersQuery();


  // let suppliersdata : Supplier[] | undefined = []
  const suppliersData : Supplier[] = SuppliersData?.data ?? [];
  console.log('supplier products are ', suppliersData)
  const productsData: Product[] = ProductsData?.data ?? []


  console.log('suppliers data is ', suppliersData)





  // Handle supplier change
  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const supplierId = e.target.value;
    setSelectedSupplier(supplierId);
  };

  // Handle product change
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
  };

  // Handle form submit (submit button)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSupplier && selectedProduct) {
      const newSupplierProduct = {
        supplier_id: selectedSupplier,
        product_id: selectedProduct,
      };

      console.log('new supplier is ', newSupplierProduct)
      createSupplierProduct(newSupplierProduct)
      // Call the createSupplierProduct mutation to submit the data
      // createSupplierProduct(newSupplierProduct);
    }
  };

  return (
    <div className="space-y-6">
      {/* Supplier Dropdown */}
      <div>
        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
          Select Supplier
        </label>
        <select
          id="supplier"
          name="supplier"
          value={selectedSupplier || ''}
          onChange={handleSupplierChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select Supplier
          </option>
          {suppliersData.map((supplier) => (
            <option key={supplier.supplier_id} value={supplier.supplier_id}>
              Supplier {supplier.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Dropdown */}
     
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">
            Select Product
          </label>
          <select
            id="product"
            name="product"
            value={selectedProduct || ''}
            onChange={handleProductChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Product
            </option>
            {productsData.map((product) => (
              <option key={product?.product_id} value={product?.product_id}>
                {product?.name}
              </option>
            ))}
          </select>
        </div>
  
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-4 w-full ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>

      {/* Show selected supplier and product */}
      {isSuccess && !isLoading && (
        <div className="mt-4 text-green-500">
          Successfully created supplier-product association!
        </div>
      )}

      {/* Error Handling */}
      {isError && !isLoading && (
        <div className="mt-4 text-red-500">
          {/* Error: {error?.message || 'Something went wrong!'} */}
        </div>
      )}

      {getSuppliersLoading ? <p>fetching suppliers....</p>: null}
      {getProductsLoading ? <p>getting products.....</p>: null}
      {getProductsError ? <p> error getting products</p>: null}
      {getSuppliersError? <p> error getting suppliers</p>: null}
      {error ? <p> error creating supplier products</p>: null}

      <div>
        {selectedSupplier && selectedProduct && (
          <p className="mt-4">
            Selected Supplier ID: {selectedSupplier}, Selected Product ID: {selectedProduct}
          </p>
        )}
      </div>
    </div>
  );
};

export default SupplierProductDropdown;
