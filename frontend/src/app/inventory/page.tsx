"use client";
import React, { useState, useMemo } from "react";
import { Box, Button, IconButton, Tooltip, MenuItem } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetSupplierProductsQuery,
  useGetInventoryItemsQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
  useGetUnitsQuery,
} from "@/app/redux/api/inventory-api";
// import { Unit } from "@/app/units/interface/units-interface";
import { InventoryItem } from "@/app/inventory/interfaces/inventory-interface";

const InventoryManagement = () => {
  const {
    data: InventoryItemsData,
    isLoading,
    isError,
  } = useGetInventoryItemsQuery();

  const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const { data: SupplierProductsData } = useGetSupplierProductsQuery();

  const inventoryItemsData = InventoryItemsData?.data || [];
  const unitsData = UnitsData?.data || [];

  const supplierProductsData = SupplierProductsData?.data || [];
 

  // Redux Mutation Hooks for Create, Update, Delete
  const [createInventoryItem, {isError: inventoryMutationError}] = useCreateInventoryItemMutation();
  const [updateInventoryItem] = useUpdateInventoryItemMutation();
  const [deleteInventoryItem] = useDeleteInventoryItemMutation();

  const columns = useMemo<MRT_ColumnDef<InventoryItem>[]>(
    () => [
      {
        accessorKey: "inventoryId",
        header: "Inventory Item ID",
        size: 150,
        enableEditing: false,
        muiTableHeadCellProps: { style: { color: "green" } }, //custom props
        visibleInShowHideMenu: true,
      },
      // {
      //   accessorKey: "supplier_products_id",
      //   header: "Supplier Product ID",
      //   size: 200,
      //   enableEditing: false,
      // },
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
   
      // {
      //   accessorKey: "productName",
      //   header: "Product Name",
      //   size: 200,
      //   enableEditing: false,
      // },
      {
        // accessorKey: "supplierProduct?.product_id",
        accessorFn: (row) => row.supplierProduct?.product?.sku,
        header: "SKU",
        size: 150,
        enableEditing: false,
      },
 
      {
        accessorKey: "stock_quantity",
        header: "Stock Quantity",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.stock_quantity,
          helperText: validationErrors?.stock_quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              stock_quantity: undefined,
            }),
        },
      },
      {
        accessorKey: 'product_weight',
        header:'product weight',
        enableEditing: false
      },
      {
        accessorKey: "unit_id",
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
          return <div>{unit ? unit.short_name : "No Unit"}</div>;
        },
      },
      {
        accessorKey: "reorder_level",
        header: "Reorder Level",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.reorder_level,
          helperText: validationErrors?.reorder_level,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              reorder_level: undefined,
            }),
        },
      },
      {
        accessorKey: "last_restocked",
        header: "Last Restocked",
        enableEditing: false,
        size: 200,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
      },
     
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        size: 200,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
        enableEditing: false,
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        size: 200,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
        enableEditing: false,
      },
    ],
    [validationErrors, unitsData]
  );

  // Handle creating a new row (Add New Inventory Item)
  const handleCreateInventoryItem: MRT_TableOptions<InventoryItem>["onCreatingRowSave"] =
    async ({ values, table }) => {
      console.log('here')
      const newValidationErrors = validateInventoryItem(values);

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        console.log('validation errors ', newValidationErrors)
        return;
      }

      setValidationErrors({});
      values = { ...values };
      console.log('here again')
      delete values.inventory_item_id;
      delete values.created_at;
      delete values.inventoryId;
      delete values.last_restocked;
      delete values.product_weight;
      delete values.status;
      delete values.updated_at;
    
      await createInventoryItem(values);
      table.setCreatingRow(null);
    };

  // Handle updating an existing row
  const handleSaveInventoryItem: MRT_TableOptions<InventoryItem>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateInventoryItem(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setValidationErrors({});
      values = { ...values };
      delete values.product_name;

      await updateInventoryItem(values);
      table.setEditingRow(null);
    };

  // Handle deleting a row
  const handleDelete = async (row: InventoryItem) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );
    if (confirmed) {
      await deleteInventoryItem({ inventory_item_id: row.inventory_item_id });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: inventoryItemsData || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateInventoryItem,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveInventoryItem,
    getRowId: (row) => row.inventoryId,
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
        Add New Inventory Item
      </Button>
    ),
    state: {
      isLoading,
      // showAlertBanner: isError,
    },
  });

  // Validation function
  const validateInventoryItem = (values) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.stock_quantity) errors.stock_quantity = "Quantity is required";
    if (!values.supplier_products_id) errors.supplier_products_id = "Product name is required";
    if (!values.unit_id) errors.unit_id = "Unit is required";
    if (!values.reorder_level) errors.reorder_level = "re-order is required";
    return errors;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <div>
        {unitDataLoading ? <div> units loading... </div>: null}
      </div>
    {/* {inventoryMutationError ?  <div>{inventoryMutationError.message}</div>:  <div>heyy</div>} */}
   
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default InventoryManagement;
