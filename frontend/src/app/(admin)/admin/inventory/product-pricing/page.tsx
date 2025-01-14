"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef, // If using TypeScript (optional, but recommended)
} from "material-react-table";
import {
  useCreateProductPricingMutation,
  useGetProductPricingQuery,
  useUpdateProductPricingMutation,
  useDeleteProductPricingMutation,
  useGetSupplierProductsQuery,
  useGetUnitsQuery,
} from "@/app/redux/api/inventory-api"; // Assuming API hooks for product pricing are defined similarly
import { ProductPricing } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface"; // Assuming correct path
import { Box, Button, IconButton, MenuItem, Tooltip, TextField } from "@mui/material";
import { EditIcon, DeleteIcon } from "lucide-react";
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

dayjs.extend(utc);
dayjs.extend(timezone);


export default function ProductPricingList() {
  // Fetch product pricing via the Redux API
  const { data: response, isLoading, isError } = useGetProductPricingQuery();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const { data: SupplierProductsData } = useGetSupplierProductsQuery();
  const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data

  const unitsData = UnitsData?.data || [];

  const supplierProductsData = SupplierProductsData?.data || [];

  // Column definitions for Material React Table (adjusted for product pricing)
  const columns = useMemo<MRT_ColumnDef<ProductPricing>[]>(
    () => [
        {
          accessorKey: "product_pricing_id",
          header: "Pricing ID",
          enableEditing: false,
          size: 30,
          enableHiding: true,
          enablePinning: true,
          visibleInShowHideMenu: false,
        },
      {
        accessorKey: "supplier_products_id",
        header: "product Name",
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
        accessorKey:"Quantity",
        header:'quantity',
        size: 100
      },
      {
        accessorKey: "unit_id",
        header: "Unit",
        size: 100,
        enableEditing:false,
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
          return <div>{unit ? unit.short_name : "No Unit"}</div>;
        },
      },
      
      {
        accessorKey: "price",
        header: "Price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, price: undefined }),
        },
      },
      {
        accessorKey: "VAT",
        header: "vat",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.VAT,
          helperText: validationErrors?.VAT,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, VAT: undefined }),
        },
      },
      {
        accessorKey: "discount",
        header: "discount",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount,
          helperText: validationErrors?.discount,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, discount: undefined }),
        },
      },
      {
        accessorKey: "effective_date",
        header: "Effective Date",
        enableEditing:false,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
        // muiEditTextFieldProps: {
        //   required: true,
        //   type:'datetime-local',
        //   error: !!validationErrors?.effective_date,
        //   helperText: validationErrors?.effective_date,
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       effective_date: undefined,
        //     }),
        // },
      },
      // {
      //   accessorKey: "effective_date",
      //   header: "Effective Date",
      //   muiEditTextFieldProps: {
      //     required: true,
      //     error: !!validationErrors?.effective_date,
      //     helperText: validationErrors?.effective_date,
      //     onFocus: () =>
      //       setValidationErrors({
      //         ...validationErrors,
      //         effective_date: undefined,
      //       }),
      //   },
      //   Cell: ({ cell, row, }) => {
      //     const effectiveDate = cell.getValue() as string;  // Type assertion
      //     return (
      //       <TextField
      //       type="date"
      //       value={dayjs.utc(effectiveDate).format('YYYY-MM-DD')} // Format the date in 'YYYY-MM-DD' for the input
      //       // onChange={(e) => {
      //       //   // const newData = [...data];
      //       //   // newData[row.index].effective_date = e.target.value;
      //       //   // setData(newData);
      //       // }}
      //     />
         
      //     );
      //   }
      // },
      
    ],
    [validationErrors, unitsData]
  );

  const productPricing: ProductPricing[] = response ? response.data : [];
  const [updateProductPricing] = useUpdateProductPricingMutation();
  const [createProductPricing] = useCreateProductPricingMutation();

  // Validation function
  const validateRequired = (value: string) => !!value.length;

  const validateProductPricing = (pricing: ProductPricing) => {
    return {
      price: !validateRequired(pricing.price.toString())
        ? "Price is required"
        : "",
      // effective_date: !validateRequired(pricing.effective_date)
      //   ? "Effective Date is required"
      //   : "",
    };
  };

  // Handle row creation
  const handleCreateProductPricing: MRT_TableOptions<ProductPricing>["onCreatingRowSave"] =
    async ({ values, table }) => {
      console.log('creating new prices')
      const newValidationErrors = validateProductPricing(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      values = { ...values };
      delete values.effective_date
      delete values.product_pricing_id; // Assuming the API generates a new ID on creation
      await createProductPricing(values);
      table.setCreatingRow(null); // Exit creating mode
    };

  // Handle row update
  const handleUpdateProductPricing: MRT_TableOptions<ProductPricing>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateProductPricing(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      values = { ...values };
      delete values.effective_date
      console.log('----------------------updating product pricing')
      await updateProductPricing(values);
      table.setEditingRow(null); // Exit editing mode
    };

  const [deleteProductPricing] = useDeleteProductPricingMutation();

  // Delete action handler
  const openDeleteConfirmModal = (row: MRT_Row<ProductPricing>) => {
    if (
      window.confirm(
        `Are you sure you want to delete this pricing? ${JSON.stringify({
          product_pricing_id: row.id,
        })}`
      )
    ) {
      deleteProductPricing({ product_pricing_id: row.id });
    }
  };

  // Pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: productPricing || [],
    displayColumnDefOptions: {
      "mrt-row-actions": {
        visibleInShowHideMenu: false, // Hide the built-in row actions column from the show hide menu
      },
    },
    createDisplayMode: "row", // Use row mode for creating rows
    editDisplayMode: "row", // Use row mode for editing rows
    enableEditing: true,
    getRowId: (row) => row.product_pricing_id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProductPricing,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateProductPricing,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open create row mode
        }}
      >
        Create Product Pricing
      </Button>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading,
      showAlertBanner: isError,
    },
  });

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !productPricing) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch product pricing
      </div>
    );
  }

  // Rendering the MaterialReactTable component
  return (
    <>
      {!productPricing || productPricing.length === 0 ? (
        <div>No product pricing available</div>
      ) : null}
      <MaterialReactTable table={table} />
    </>
  );
}
