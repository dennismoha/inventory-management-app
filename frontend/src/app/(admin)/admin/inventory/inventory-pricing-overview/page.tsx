'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef // If using TypeScript (optional, but recommended)
} from 'material-react-table';
// import {
//   MaterialReactTable,
//   MRT_Row,
//   MRT_TableOptions,
//   useMaterialReactTable,
//   type MRT_ColumnDef // If using TypeScript (optional, but recommended)
// } from 'material-react-table';
// import { Box, Button, IconButton, MenuItem, Tooltip } from '@mui/material';
import { MenuItem } from '@mui/material';
// import { EditIcon, DeleteIcon } from 'lucide-react';
import { useGetSupplierProductsQuery, useGetUnitsQuery } from '@/app/redux/api/inventory-api'; // Assuming the hook is already defined
import { SupplierProduct } from '@/app/(admin)/admin/suppliers/interface/supplier-interface';
import { toast } from 'react-toastify';

export default function InventoryPricingOverview() {
  // const { data: SupplierProductsData } = useGetSupplierProductsQuery();
  // Fetch supplier products data
  const {
    data: SupplierProductsData,
    isLoading: isSupplierProductsLoading,
    isError: isSupplierProductsError,
    error: supplierProductsError
  } = useGetSupplierProductsQuery();

  // Fetch units data
  const { data: UnitsData, isLoading: unitDataLoading, isError: unitDataError, error: unitsError } = useGetUnitsQuery();
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const supplierProductsData = SupplierProductsData?.data || [];

  // const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data

  useEffect(() => {
    // Handling supplier products query state
    if (isSupplierProductsLoading) {
      toast.info('Fetching supplier products...');
    }

    if (isSupplierProductsError) {
      toast.error(`Error fetching supplier products: ${JSON.stringify(supplierProductsError)}`);
    }

    // Handling units data query state
    if (unitDataLoading) {
      toast.info('Fetching units data...');
    }

    if (unitDataError) {
      toast.error(`Error fetching units: ${JSON.stringify(unitsError)}`);
    }
  }, [isSupplierProductsLoading, isSupplierProductsError, supplierProductsError, unitDataLoading, unitDataError, unitsError]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unitsData = UnitsData?.data || [];

  // Column definitions for Material React Table
  const columns = useMemo<MRT_ColumnDef<SupplierProduct>[]>(
    () => [
      {
        accessorKey: 'supplier_products_id',
        header: 'Product Name',
        enableHiding: true,
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          children: supplierProductsData?.map((supplierproduct) => (
            <MenuItem key={supplierproduct.supplier_products_id} value={supplierproduct.supplier_products_id}>
              {`${supplierproduct.supplier?.name} - ${supplierproduct.product?.name}`}
            </MenuItem>
          )),
          error: !!validationErrors?.supplier_products_id,
          helperText: validationErrors?.supplier_products_id,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              supplier_products_id: undefined
            })
        },
        Cell: ({ cell }) => {
          const suppliercellData = supplierProductsData.find((supplierCell) => supplierCell.supplier_products_id === cell.getValue());
          return (
            <div>
              {suppliercellData ? `${suppliercellData.supplier?.name} - ${suppliercellData.product?.name}` : 'No Supplier Product Found'}
            </div>
          );
        }
      },
      {
        accessorFn: (row) => row.Inventory?.stock_quantity,
        header: 'inventory Quantity',
        size: 100,
        Cell: ({ cell }) => {
          if (cell.getValue() === null || cell.getValue === undefined) {
            return <div>product not in the inventory</div>;
          } else {
            return <div>{(cell.getValue() as unknown as number) || null}</div>;
          }
        }
      },
      //   {
      //     // accessorKey: "inventory.sku",
      //     accessorFn:(row) => row.Inventory?.unit_id,
      //     header: "Unit",
      //     size: 100,

      //   },
      {
        accessorFn: (row) => row.Inventory?.unit_id,
        header: 'Unit',
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
              unit_id: undefined
            })
        },
        Cell: ({ cell }) => {
          const unit = unitsData.find((unit) => unit.unit_id === cell.getValue());
          return <div>{unit ? unit.short_name : 'product not in the inventory'}</div>;
        }
      },
      {
        // accessorKey: "price",
        accessorFn: (row) => row.ProductPricing?.price,
        header: 'product Priced at',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () => setValidationErrors({ ...validationErrors, price: undefined })
        }
      },
      {
        accessorFn: (row) => row.ProductPricing?.effective_date,
        header: 'priced from:',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.effective_date,
          helperText: validationErrors?.effective_date,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              effective_date: undefined
            })
        }
      }
    ],
    [supplierProductsData, validationErrors, unitsData]
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

    getRowId: (row) => row.supplier_products_id
  });

  if (!supplierProductsData || supplierProductsData.length === 0) {
    return <div>No Supplier Products available</div>;
  }

  return <MaterialReactTable table={table} />;
}
