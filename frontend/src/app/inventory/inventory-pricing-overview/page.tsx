"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef, // If using TypeScript (optional, but recommended)
} from "material-react-table";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import { EditIcon, DeleteIcon } from "lucide-react";
import { useGetSupplierProductsQuery, useGetUnitsQuery } from "@/app/redux/api/inventory-api"; // Assuming the hook is already defined
import { SupplierProduct } from "@/app/suppliers/interface/supplier-interface";

export default function InventoryPricingOverview() {
  const { data: SupplierProductsData } = useGetSupplierProductsQuery();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const supplierProductsData = SupplierProductsData?.data || [];
  
  const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data

 
  const unitsData = UnitsData?.data || [];

  // Column definitions for Material React Table
  const columns = useMemo<MRT_ColumnDef<SupplierProduct>[]>(
    () => [
      {
        accessorKey: "supplier_products_id",
        header: "Product Name",
        enableHiding: true,
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          children: supplierProductsData?.map((supplierproduct) => (
            <MenuItem
              key={supplierproduct.supplier_products_id}
              value={supplierproduct.supplier_products_id}
            >
              {`${supplierproduct.supplier?.name} - ${supplierproduct.product?.name}`}
            </MenuItem>
          )),
          error: !!validationErrors?.supplier_products_id,
          helperText: validationErrors?.supplier_products_id,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              supplier_products_id: undefined,
            }),
        },
        Cell: ({ cell }) => {
          const suppliercellData = supplierProductsData.find(
            (supplierCell) =>
              supplierCell.supplier_products_id === cell.getValue()
          );
          return (
            <div>
              {suppliercellData
                ? `${suppliercellData.supplier?.name} - ${suppliercellData.product?.name}`
                : "No Supplier Product Found"}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.Inventory?.stock_quantity,
        header: "inventory Quantity",
        size: 100,
        Cell: ({ cell }) => {
           if(cell.getValue() === null || cell.getValue===undefined || cell.getValue === ''){
            return <div>product not in the inventory</div>;
           }else {
            return <div>{cell.getValue()}</div>
           }
           
          },
      },
    //   {
    //     // accessorKey: "inventory.sku",
    //     accessorFn:(row) => row.Inventory?.unit_id,
    //     header: "Unit",
    //     size: 100,
       
    //   },
      {
        accessorFn:(row) => row.Inventory?.unit_id,
        header: "Unit",
        size: 100,
        muiEditTextFieldProps: {
          select: true,
          children: unitsData.map((unit) => (
            <MenuItem key={unit.unit_id} value={unit.unit_id}>
              {unit.short_name}
            </MenuItem>
          )),
          error: !!validationErrors?.unit_id,
          helperText: validationErrors?.unit_id,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              unit_id: undefined,
            }),
        },
        Cell: ({ cell }) => {
          const unit = unitsData.find(
            (unit) => unit.unit_id === cell.getValue()
          );
          return <div>{unit ? unit.short_name : "product not in the inventory"}</div>;
        },
      },
      {
        // accessorKey: "price",
        accessorFn: (row) => row.ProductPricing?.price,
        header: "product Priced at",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, price: undefined }),
        },
      },
      {
        accessorFn: (row) => row.ProductPricing?.effective_date,
        header: "priced from:",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.effective_date,
          helperText: validationErrors?.effective_date,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              effective_date: undefined,
            }),
        },
      },
    ],
    [validationErrors, supplierProductsData]
  );

  // Pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: supplierProductsData || [],
    // displayColumnDefOptions: {
    //   "mrt-row-actions": {
    //     visibleInShowHideMenu: false, // Hide the built-in row actions column from the show hide menu
    //   },
    // },
  
    getRowId: (row) => row.supplier_products_id,
  
   

  });

  if (!supplierProductsData || supplierProductsData.length === 0) {
    return <div>No Supplier Products available</div>;
  }

  return <MaterialReactTable table={table} />;
}
