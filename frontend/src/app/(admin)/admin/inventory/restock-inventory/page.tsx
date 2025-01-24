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

import {
  useGetSupplierProductsQuery,
  useGetInventoryItemsQuery,

  useGetUnitsQuery,
  useRestockInventoryItemMutation,
} from "@/app/redux/api/inventory-api";

import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestockInventory = () => {
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
  ] =   useRestockInventoryItemMutation();




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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[InventoryItemsSuccessMessage , updatingIsInventoryError, updatedInventorySuccessMessage])

//   useEffect(()=>{
//       if(inventoryCreationMutationError) {
//         toast.error(JSON.stringify(inventoryCreationMutationErrorMessage))
//       }
//   },[inventoryCreationMutationError])


  const inventoryItemsData = InventoryItemsData?.data || [];
  const unitsData = UnitsData?.data || [];

  const supplierProductsData = SupplierProductsData?.data || [];



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
        enableEditing: false,
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
        accessorKey: "last_restocked",
        header: "Last Restocked",
        enableEditing: false,
        size: 200,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
      },

      
     
     
    ],
    [validationErrors, unitsData]
  );



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
      const newvalue: {stock_quantity: number, inventoryId:string} = {stock_quantity: values.stock_quantity,inventoryId: values.inventoryId}
      await updateInventoryItem(newvalue);
      table.setEditingRow(null);
    };


  const table = useMaterialReactTable({
    columns,
    data: inventoryItemsData || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
  
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
    values: {stock_quantity: number}
  ) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.stock_quantity) errors.stock_quantity = "Quantity is required";
   
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

export default RestockInventory;
