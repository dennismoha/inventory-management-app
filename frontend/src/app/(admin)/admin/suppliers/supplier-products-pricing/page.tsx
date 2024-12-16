'use client'
import React, { useState, useMemo } from "react";
import { Box, Button, IconButton, Tooltip, MenuItem } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef, MRT_TableOptions, useMaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetSupplierPricingQuery,  useCreateSupplierPricingMutation, useUpdateSupplierPricingMutation,  useDeleteSupplierPricingMutation, useGetSupplierProductsQuery, useGetUnitsQuery } from "@/app/redux/api/inventory-api";
// import { Unit } from "@/app/units/interface/units-interface";
import { SupplierPricing } from "@/app/(admin)/admin/suppliers/interface/supplier-interface";

const SupplierProductPricing = () => {
  const {
    data: SupplierPricingData,
    isLoading,
    isError,
  } = useGetSupplierPricingQuery();

  const { data: SupplierProductsData } = useGetSupplierProductsQuery();
  const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  
  let supplierPricingData = SupplierPricingData?.data || [];
  let supplierProductsData = SupplierProductsData?.data || [];
  const unitsData = UnitsData?.data || [];

  if(supplierPricingData === undefined) {
    console.log('supplier pricing is ', supplierPricingData)
    supplierPricingData = []
  }

  if(supplierProductsData === undefined) { 
    supplierProductsData = []
  }

 

  // Redux Mutation Hooks for Create, Update, Delete
  const [createSupplierPricing] =  useCreateSupplierPricingMutation();
  const [updateSupplierPricing] = useUpdateSupplierPricingMutation();
  const [deleteSupplierPricing] = useDeleteSupplierPricingMutation();

  const columns = useMemo<MRT_ColumnDef<SupplierPricing>[]>(
    () => [
      {
        accessorKey: "supplier_pricing",
        header: "Supplier Pricing ID",
        size: 150,
        enableEditing: false,
      },
      {
        accessorFn: (row) => row.supplierProduct?.supplier?.name ,
        header: "Supplier",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "supplier_products_id",
        header: "Supplier Products ID",
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
            (supplierCell) => supplierCell.supplier_products_id === cell.getValue()
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
        accessorFn: (row) => row.supplierProduct?.product?.name ,
        header: "Product_Name",
        size: 200,
        enableHiding: true,
        enableEditing: false
      },
      {
        accessorKey: "Quantity",
        header: "Quantity",
        size: 100,
        muiEditTextFieldProps: {
          required: true,         
          error: !!validationErrors?.Quantity,
          helperText: validationErrors?.Quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              Quantity: undefined,
            }),
        },
      },
      
      {
        accessorFn: (row) => row.unit?.unit_id,// For unit short_name
        header: 'unit_id',
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
          const unit = unitsData.find((unit) => unit.unit_id === cell.getValue());
          return <div>{unit ? unit.short_name : 'no units'}</div>;
        }
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
        muiEditTextFieldProps: {
          required: true,         
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
        Cell: ({ cell }) => `$${parseFloat(cell.getValue() as string).toFixed(2)}`,
      },
      {
        accessorKey: "effective_date",
        header: "Effective Date",
        size: 150,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
      },
    ],
    [validationErrors, supplierProductsData, unitsData]
  );

    // Handle creating a new row (Add New Pricing)
    const handleCreatePricing: MRT_TableOptions<SupplierPricing>["onCreatingRowSave"]  = async ({ values, table }: any) => {
      const newValidationErrors = validatePricing(values);
      
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
  
      setValidationErrors({});
      values = {...values}
      delete values.Product_Name;
      delete values.Supplier
      delete values.supplier_pricing;
      console.log('creating new products', values)
      
      await createSupplierPricing(values);
      table.setCreatingRow(null);
    };
  
    // Handle updating an existing row
    const handleSavePricing: MRT_TableOptions<SupplierPricing>["onEditingRowSave"] = async ({ values, table }: any) => {
      const newValidationErrors = validatePricing(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
  
      setValidationErrors({});
      values = {...values}
      delete values.Product_Name;
      delete values.Supplier
      // delete values.supplier_pricing;
      console.log('saving new products', values)
      await updateSupplierPricing(values);
      table.setEditingRow(null);
    };
  
    // Handle deleting a row
    const handleDelete = async (row: SupplierPricing) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this pricing?"
      );
      if (confirmed) {
        await deleteSupplierPricing({supplier_pricing:row.supplier_pricing});
      }
    };

  const table = useMaterialReactTable({
    columns,
    data: supplierPricingData || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreatePricing,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePricing,
    getRowId: (row) => row.supplier_pricing,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open the create row form
        }}
      >
        Add New Pricing
      </Button>
    ),
    state: {
      isLoading,
      showAlertBanner: isError,
    },
  });



  // Validation function
  const validatePricing = (values: any) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.Quantity) errors.Quantity = "Quantity is required";
    if (!values.price) errors.price = "Price is required";
    if (!values.effective_date) errors.effective_date = "Effective Date is required";
    if (!values.supplier_products_id) errors.supplier_products_id = "Supplier Product is required";
    if (!values.unit_id) errors.unit_id = "Unit is required";
    return errors;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default SupplierProductPricing;
