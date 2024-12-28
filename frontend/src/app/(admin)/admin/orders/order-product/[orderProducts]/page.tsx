'use client'

import React, { useMemo, useState } from "react";
import { useParams } from 'next/navigation';
import {
  LiteralUnion,
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ViewList } from "@mui/icons-material";
import Link from "next/link";

import { OrderProducts } from "@/app/(admin)/admin/orders/interfaces/orders-interface"; // Adjusted to OrderProducts type
import {
  useGetOrderProductByOrderIdQuery,
  useCreateOrderProductMutation,
  useUpdateOrderProductMutation,
  useDeleteOrderProductMutation,
} from "@/app/redux/api/inventory-api"; // Adjusted API hooks

const OrderProductssTable = () => { 
  const params = useParams()
  const { data: orderProductsData, isLoading, isError } = useGetOrderProductByOrderIdQuery(params.orderProducts); // Adjusted to fetch order products
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const orderProducts = orderProductsData?.data || [];

  // Redux Mutation Hooks for Create, Update, Delete
  const [createOrderProduct] = useCreateOrderProductMutation();
  const [updateOrderProduct] = useUpdateOrderProductMutation();
  const [deleteOrderProduct] = useDeleteOrderProductMutation();

  // Columns for the order products table
  const columns = useMemo<MRT_ColumnDef<OrderProducts>[]>(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "productName",
        header: "Product Name",
        size: 200,
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.productName,
          helperText: validationErrors?.productName,
          onFocus: () => setValidationErrors({ ...validationErrors, productName: undefined }),
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 150,
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          onFocus: () => setValidationErrors({ ...validationErrors, quantity: undefined }),
        },
      },
      {
        accessorKey: "order_quantity",
        header: "Order Quantity",
        size: 150,
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.order_quantity,
          helperText: validationErrors?.order_quantity,
          onFocus: () => setValidationErrors({ ...validationErrors, order_quantity: undefined }),
        },
      },
      {
        accessorKey: "price_per_unit",
        header: "Price per Unit",
        size: 150,
        Cell: ({ cell }) => `$${parseFloat(cell.getValue() as string).toFixed(2)}`,
        enableEditing: true,
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount",
        size: 150,
        Cell: ({ cell }) => `$${parseFloat(cell.getValue() as string).toFixed(2)}`,
        enableEditing: true,
      },
    ],
    [validationErrors]
  );

  // Handle creating a new order product
  const handleCreateOrderProduct: MRT_TableOptions<OrderProducts>["onCreatingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateOrderProduct(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    values = { ...values };
    await createOrderProduct(values);
    table.setCreatingRow(null); // Close the row creation
  };

  // Handle updating an existing order product
  const handleSaveOrderProduct: MRT_TableOptions<OrderProducts>["onEditingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateOrderProduct(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    values = { ...values };
    await updateOrderProduct(values);
    table.setEditingRow(null); // Close the row editing
  };

  // Handle deleting an order product
  const handleDeleteOrderProduct = async (row: OrderProducts) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      await deleteOrderProduct({ orderProductsId: row.orderProductsId });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: orderProducts || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateOrderProduct,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveOrderProduct,
    getRowId: (row) => row.orderProductsId,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteOrderProduct(row.original)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Product">
          <IconButton color="primary">
            <Link href={`/orders/order-product/${row.original.orderId}`}>
              <ViewList />
            </Link>
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Create New Product
      </Button>
    ),
    state: {
      isLoading,
      showAlertBanner: isError,
    },
  });

  // Validation function for order products
  const validateOrderProduct = (values: any) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.productName) errors.productName = "Product Name is required";
    if (!values.quantity) errors.quantity = "Quantity is required";
    if (!values.price_per_unit) errors.price_per_unit = "Price per Unit is required";
    if (!values.order_quantity) errors.order_quantity = "Order Quantity is required";
    if (!values.totalAmount) errors.totalAmount = "Total Amount is required";
    return errors;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OrderProductssTable;



// const OrderProductss: React.FC = () => {
//   const router = useParams();

//   const {data: data, isLoading} = useGetOrderProductByOrderIdQuery(router.orderProducts)

//   const orderProductData = data?.data || [];
//   console.log('order Product data is ', orderProductData)
//   if(orderProductData.length === 0) {
//     return <div> no products for this order</div>
//   }
// console.log('router is ', router)
//   return (
//     <div>
//       {/* //OrderProducts {JSON.stringify(orderId)} */}
//       {
//         data.data.map((data, index)=>{
//           return <div key={index}> {data.orderId}- {data.productName} {data.totalAmount}</div>
//         })
//       }
//      data {JSON.stringify(data)}
    
//       <div>query is  {JSON.stringify(router.orderProducts)}</div>
//     </div>
//   )
// }

// export default OrderProductss