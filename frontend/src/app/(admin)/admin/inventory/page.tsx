"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, IconButton, Tooltip, MenuItem } from "@mui/material";
import {
  LiteralUnion,
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

import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InventoryManagement = () => {
  const {
    data: InventoryItemsData,
    isLoading,
    isSuccess: InventoryItemsSuccessMessage
    // isError,
  } = useGetInventoryItemsQuery();

  // const isFetchBaseQueryError = (
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   error: any
  // ): error is FetchBaseQueryError => {
  //   return error?.status !== undefined && error?.data !== undefined;
  // };

  const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const { data: SupplierProductsData } = useGetSupplierProductsQuery();
  const [
    updateInventoryItem,
    { isError: updatingIsInventoryError, error: updatingInventoryError, isSuccess: updatedInventorySuccessMessage },
  ] = useUpdateInventoryItemMutation();

  useEffect(()=>{

    if(InventoryItemsSuccessMessage) {
      toast.success(" inventory fetched successfully!")
    }

    if(updatingIsInventoryError){
      toast.error(JSON.stringify(updatingInventoryError))
    }

    if(updatedInventorySuccessMessage) {
      toast.success(updatedInventorySuccessMessage)
    }

  },[InventoryItemsSuccessMessage , updatingIsInventoryError, updatedInventorySuccessMessage])


  const inventoryItemsData = InventoryItemsData?.data || [];
  const unitsData = UnitsData?.data || [];

  const supplierProductsData = SupplierProductsData?.data || [];

  // Redux Mutation Hooks for Create, Update, Delete
  const [createInventoryItem, { isError: inventoryMutationError }] =
    useCreateInventoryItemMutation();

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
        accessorKey: "product_weight",
        header: "product weight",
        enableEditing: false,
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
      console.log("here");
      const newValidationErrors = validateInventoryItem(values);

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        console.log("validation errors ", newValidationErrors);
        return;
      }

      setValidationErrors({});
      values = { ...values };
      console.log("here again");
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
      delete values.SKU;
      delete values.product_name;
      delete values.product_weight;
      delete values.last_restocked;
      delete values.status;
      delete values.created_at;
      delete values.updated_at;
      // delete values.updated_at

      await updateInventoryItem(values);
      table.setEditingRow(null);
    };

  // Handle deleting a row
  const handleDelete = async (row: InventoryItem) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );
    if (confirmed) {
      await deleteInventoryItem({ inventory_item_id: row.inventoryId });
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
  const validateInventoryItem = (
    values: Record<
      LiteralUnion<
        | "status"
        | "inventoryId"
        | "stock_quantity"
        | "supplier_products_id"
        | "unit_id"
        | "unit"
        | "created_at"
        | "updated_at"
        | "supplierProduct"
        | "unit.unit_id"
        | "unit.unit"
        | "unit.short_name"
        | "unit.no_of_products"
        | "unit.created_at"
        | "unit.updated_at"
        | "supplierProduct.ProductPricing"
        | "supplierProduct.supplier_products_id"
        | "supplierProduct.created_at"
        | "supplierProduct.updated_at"
        | "supplierProduct.supplier_id"
        | "supplierProduct.product_id"
        | "supplierProduct.supplier"
        | "supplierProduct.product"
        | "supplierProduct.Inventory"
        | "product_weight"
        | "reorder_level"
        | "last_restocked"
        | "softDelete"
        | "supplierProduct.ProductPricing.price"
        | "supplierProduct.ProductPricing.supplier_products_id"
        | "supplierProduct.ProductPricing.VAT"
        | "supplierProduct.ProductPricing.discount"
        | "supplierProduct.ProductPricing.unit_id"
        | "supplierProduct.ProductPricing.unit"
        | "supplierProduct.ProductPricing.created_at"
        | "supplierProduct.ProductPricing.updated_at"
        | "supplierProduct.ProductPricing.product_pricing_id"
        | "supplierProduct.ProductPricing.Quantity"
        | "supplierProduct.ProductPricing.effective_date"
        | "supplierProduct.ProductPricing.supplierProduct"
        | "supplierProduct.ProductPricing.unit.unit_id"
        | "supplierProduct.ProductPricing.unit.unit"
        | "supplierProduct.ProductPricing.unit.short_name"
        | "supplierProduct.ProductPricing.unit.no_of_products"
        | "supplierProduct.ProductPricing.unit.created_at"
        | "supplierProduct.ProductPricing.unit.updated_at"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing"
        | "supplierProduct.ProductPricing.supplierProduct.supplier_products_id"
        | "supplierProduct.ProductPricing.supplierProduct.created_at"
        | "supplierProduct.ProductPricing.supplierProduct.updated_at"
        | "supplierProduct.ProductPricing.supplierProduct.supplier_id"
        | "supplierProduct.ProductPricing.supplierProduct.product_id"
        | "supplierProduct.ProductPricing.supplierProduct.supplier"
        | "supplierProduct.ProductPricing.supplierProduct.product"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory"
        | "supplierProduct.supplier.name"
        | "supplierProduct.supplier.SupplierPricing"
        | "supplierProduct.supplier.SupplierProducts"
        | "supplierProduct.supplier.address"
        | "supplierProduct.supplier.created_at"
        | "supplierProduct.supplier.updated_at"
        | "supplierProduct.supplier.supplier_id"
        | "supplierProduct.supplier.contact"
        | "supplierProduct.product.name"
        | "supplierProduct.product.category"
        | "supplierProduct.product.created_at"
        | "supplierProduct.product.updated_at"
        | "supplierProduct.product.product_id"
        | "supplierProduct.product.description"
        | "supplierProduct.product.category_id"
        | "supplierProduct.product.subcategory_id"
        | "supplierProduct.product.image_url"
        | "supplierProduct.product.sku"
        | "supplierProduct.product.subcategory"
        | "supplierProduct.product.category.Products"
        | "supplierProduct.product.category.created_at"
        | "supplierProduct.product.category.updated_at"
        | "supplierProduct.product.category.description"
        | "supplierProduct.product.category.categoryId"
        | "supplierProduct.product.category.category_slug"
        | "supplierProduct.product.category.category_name"
        | "supplierProduct.product.subcategory.Products"
        | "supplierProduct.product.subcategory.category"
        | "supplierProduct.product.subcategory.created_at"
        | "supplierProduct.product.subcategory.updated_at"
        | "supplierProduct.product.subcategory.description"
        | "supplierProduct.product.subcategory.subcategory_id"
        | "supplierProduct.product.subcategory.subcategory_name"
        | "supplierProduct.Inventory.status"
        | "supplierProduct.Inventory.inventoryId"
        | "supplierProduct.Inventory.stock_quantity"
        | "supplierProduct.Inventory.supplier_products_id"
        | "supplierProduct.Inventory.unit_id"
        | "supplierProduct.Inventory.unit"
        | "supplierProduct.Inventory.created_at"
        | "supplierProduct.Inventory.updated_at"
        | "supplierProduct.Inventory.supplierProduct"
        | "supplierProduct.Inventory.unit.unit_id"
        | "supplierProduct.Inventory.unit.unit"
        | "supplierProduct.Inventory.unit.short_name"
        | "supplierProduct.Inventory.unit.no_of_products"
        | "supplierProduct.Inventory.unit.created_at"
        | "supplierProduct.Inventory.unit.updated_at"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing"
        | "supplierProduct.Inventory.supplierProduct.supplier_products_id"
        | "supplierProduct.Inventory.supplierProduct.created_at"
        | "supplierProduct.Inventory.supplierProduct.updated_at"
        | "supplierProduct.Inventory.supplierProduct.supplier_id"
        | "supplierProduct.Inventory.supplierProduct.product_id"
        | "supplierProduct.Inventory.supplierProduct.supplier"
        | "supplierProduct.Inventory.supplierProduct.product"
        | "supplierProduct.Inventory.supplierProduct.Inventory"
        | "supplierProduct.Inventory.product_weight"
        | "supplierProduct.Inventory.reorder_level"
        | "supplierProduct.Inventory.last_restocked"
        | "supplierProduct.Inventory.softDelete"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.price"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.supplier_products_id"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.VAT"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.discount"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.unit_id"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.unit"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.created_at"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.updated_at"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.product_pricing_id"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.Quantity"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.effective_date"
        | "supplierProduct.ProductPricing.supplierProduct.ProductPricing.supplierProduct"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.name"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.SupplierPricing"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.SupplierProducts"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.address"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.created_at"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.updated_at"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.supplier_id"
        | "supplierProduct.ProductPricing.supplierProduct.supplier.contact"
        | "supplierProduct.ProductPricing.supplierProduct.product.name"
        | "supplierProduct.ProductPricing.supplierProduct.product.category"
        | "supplierProduct.ProductPricing.supplierProduct.product.created_at"
        | "supplierProduct.ProductPricing.supplierProduct.product.updated_at"
        | "supplierProduct.ProductPricing.supplierProduct.product.product_id"
        | "supplierProduct.ProductPricing.supplierProduct.product.description"
        | "supplierProduct.ProductPricing.supplierProduct.product.category_id"
        | "supplierProduct.ProductPricing.supplierProduct.product.subcategory_id"
        | "supplierProduct.ProductPricing.supplierProduct.product.image_url"
        | "supplierProduct.ProductPricing.supplierProduct.product.sku"
        | "supplierProduct.ProductPricing.supplierProduct.product.subcategory"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.status"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.inventoryId"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.stock_quantity"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.supplier_products_id"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.unit_id"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.unit"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.created_at"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.updated_at"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.supplierProduct"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.product_weight"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.reorder_level"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.last_restocked"
        | "supplierProduct.ProductPricing.supplierProduct.Inventory.softDelete"
        | "supplierProduct.supplier.SupplierPricing.price"
        | "supplierProduct.supplier.SupplierPricing.unit_id"
        | "supplierProduct.supplier.SupplierPricing.unit"
        | "supplierProduct.supplier.SupplierPricing.created_at"
        | "supplierProduct.supplier.SupplierPricing.updated_at"
        | "supplierProduct.supplier.SupplierPricing.supplier_id"
        | "supplierProduct.supplier.SupplierPricing.product_id"
        | "supplierProduct.supplier.SupplierPricing.supplier"
        | "supplierProduct.supplier.SupplierPricing.product"
        | "supplierProduct.supplier.SupplierPricing.effective_date"
        | "supplierProduct.supplier.SupplierPricing.supplierProduct"
        | "supplierProduct.supplier.SupplierPricing.supplier_pricing"
        | "supplierProduct.supplier.SupplierProducts.ProductPricing"
        | "supplierProduct.supplier.SupplierProducts.supplier_products_id"
        | "supplierProduct.supplier.SupplierProducts.created_at"
        | "supplierProduct.supplier.SupplierProducts.updated_at"
        | "supplierProduct.supplier.SupplierProducts.supplier_id"
        | "supplierProduct.supplier.SupplierProducts.product_id"
        | "supplierProduct.supplier.SupplierProducts.supplier"
        | "supplierProduct.supplier.SupplierProducts.product"
        | "supplierProduct.supplier.SupplierProducts.Inventory"
        | "supplierProduct.product.subcategory.category.Products"
        | "supplierProduct.product.subcategory.category.created_at"
        | "supplierProduct.product.subcategory.category.updated_at"
        | "supplierProduct.product.subcategory.category.description"
        | "supplierProduct.product.subcategory.category.categoryId"
        | "supplierProduct.product.subcategory.category.category_slug"
        | "supplierProduct.product.subcategory.category.category_name"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.price"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.supplier_products_id"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.VAT"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.discount"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.unit_id"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.unit"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.created_at"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.updated_at"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.product_pricing_id"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.Quantity"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.effective_date"
        | "supplierProduct.Inventory.supplierProduct.ProductPricing.supplierProduct"
        | "supplierProduct.Inventory.supplierProduct.supplier.name"
        | "supplierProduct.Inventory.supplierProduct.supplier.SupplierPricing"
        | "supplierProduct.Inventory.supplierProduct.supplier.SupplierProducts"
        | "supplierProduct.Inventory.supplierProduct.supplier.address"
        | "supplierProduct.Inventory.supplierProduct.supplier.created_at"
        | "supplierProduct.Inventory.supplierProduct.supplier.updated_at"
        | "supplierProduct.Inventory.supplierProduct.supplier.supplier_id"
        | "supplierProduct.Inventory.supplierProduct.supplier.contact"
        | "supplierProduct.Inventory.supplierProduct.product.name"
        | "supplierProduct.Inventory.supplierProduct.product.category"
        | "supplierProduct.Inventory.supplierProduct.product.created_at"
        | "supplierProduct.Inventory.supplierProduct.product.updated_at"
        | "supplierProduct.Inventory.supplierProduct.product.product_id"
        | "supplierProduct.Inventory.supplierProduct.product.description"
        | "supplierProduct.Inventory.supplierProduct.product.category_id"
        | "supplierProduct.Inventory.supplierProduct.product.subcategory_id"
        | "supplierProduct.Inventory.supplierProduct.product.image_url"
        | "supplierProduct.Inventory.supplierProduct.product.sku"
        | "supplierProduct.Inventory.supplierProduct.product.subcategory"
        | "supplierProduct.Inventory.supplierProduct.Inventory.status"
        | "supplierProduct.Inventory.supplierProduct.Inventory.inventoryId"
        | "supplierProduct.Inventory.supplierProduct.Inventory.stock_quantity"
        | "supplierProduct.Inventory.supplierProduct.Inventory.supplier_products_id"
        | "supplierProduct.Inventory.supplierProduct.Inventory.unit_id"
        | "supplierProduct.Inventory.supplierProduct.Inventory.unit"
        | "supplierProduct.Inventory.supplierProduct.Inventory.created_at"
        | "supplierProduct.Inventory.supplierProduct.Inventory.updated_at"
        | "supplierProduct.Inventory.supplierProduct.Inventory.supplierProduct"
        | "supplierProduct.Inventory.supplierProduct.Inventory.product_weight"
        | "supplierProduct.Inventory.supplierProduct.Inventory.reorder_level"
        | "supplierProduct.Inventory.supplierProduct.Inventory.last_restocked"
        | "supplierProduct.Inventory.supplierProduct.Inventory.softDelete",
        string
      >,
      any
    >
  ) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.stock_quantity) errors.stock_quantity = "Quantity is required";
    if (!values.supplier_products_id)
      errors.supplier_products_id = "Product name is required";
    if (!values.unit_id) errors.unit_id = "Unit is required";
    if (!values.reorder_level) errors.reorder_level = "re-order is required";
    return errors;
  };

  let errorMessage = null;

  // Handle error cases based on the error type
  if (updatingInventoryError) {
    if ("status" in updatingInventoryError) {
      // If it's a FetchBaseQueryError, you can access all its properties
      const errorData = updatingInventoryError.data as { message: string };
      errorMessage =
        "error" in updatingInventoryError ? (
          updatingInventoryError.error
        ) : (
          <div>{errorData.message as unknown as string}</div>
        );
    } else {
      // If it's a SerializedError, handle it separately
      errorMessage = updatingInventoryError.message;
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <div>{unitDataLoading ? <div> units loading... </div> : null}</div>
      {/* {inventoryMutationError ?  <div>{inventoryMutationError.message}</div>:  <div>heyy</div>} */}
      {/* {: null} */}
      {updatingIsInventoryError && errorMessage ? (
        <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>
      ) : null}

      <MaterialReactTable table={table} />
    </Box>
  );
};

export default InventoryManagement;
