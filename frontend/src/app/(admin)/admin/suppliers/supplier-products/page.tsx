"use client";
import ProductForm from "./create-supplier-product-form";
import SupplierProductsTable from "./supplier-products-table";
import { useGetSuppliersQuery } from "@/app/redux/api/inventory-api";
import { Supplier } from "@/app/(admin)/admin/suppliers/interface/supplier-interface";

const SupplierProducts: React.FC = () => {
  const {
    data: SuppliersData,
    isLoading: getSuppliersLoading,
    isError: getSuppliersError,
  } = useGetSuppliersQuery();

  let suppliersData: Supplier[] = SuppliersData?.data || [];

  if (suppliersData === undefined) {
    console.log("supplier is undefined");
    suppliersData = [];
  }

  return (
    <div className="p-6 space-y-8">
      {/* Form Section */}
      <div className="p-6 space-y-8">
        <ProductForm />
      </div>

      {/* Table Section */}
      <div className="sm:w-100 p-0 space-y-0">
        <SupplierProductsTable data={suppliersData} />
      </div>
    </div>
  );
};

export default SupplierProducts;
