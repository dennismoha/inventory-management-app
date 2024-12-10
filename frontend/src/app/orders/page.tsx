"use client";
import React, { useMemo, useState } from "react";

import {
  LiteralUnion,
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ViewList } from "@mui/icons-material";

import { Order } from "@/app/orders/interfaces/orders-interface";
import {
  useGetOrdersQuery,
  useGetSuppliersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "@/app/redux/api/inventory-api"; // Adjust the path to match your project structure
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";

const OrdersTable = () => {
  const { data: ordersData, isLoading, isError } = useGetOrdersQuery();
  const { data: suppliersData } = useGetSuppliersQuery(); // Fetch suppliers
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

  const orders = ordersData?.data || [];
  const suppliers = suppliersData?.data || [];

  // Redux Mutation Hooks for Create, Update, Delete
  const [createOrder] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // Columns for the orders table
  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "orderName",
        header: "Order Name",
        size: 200,
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.orderName,
          helperText: validationErrors?.orderName,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, orderName: undefined }),
        },
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount",
        size: 150,
        Cell: ({ cell }) =>
          `$${parseFloat(cell.getValue() as string).toFixed(2)}`,
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.totalAmount,
          helperText: validationErrors?.totalAmount,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              totalAmount: undefined,
            }),
        },
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          children: ["paid", "unpaid", "partially_paid"].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          )),
          error: !!validationErrors?.paymentStatus,
          helperText: validationErrors?.paymentStatus,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              paymentStatus: undefined,
            }),
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          children: ["cash", "bank", "credit"].map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          )),
          error: !!validationErrors?.paymentMethod,
          helperText: validationErrors?.paymentMethod,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              paymentMethod: undefined,
            }),
        },
      },
      // {
      //   accessorKey: "orderDate",
      //   header: "order Date",
      //   size: 150,
      //   type:'date',
      //   Cell: ({ cell }) =>
      //     new Date(cell.getValue() as string).toLocaleDateString(),
      // },
      {
        // accessorKey: "orderDate",
        id: "orderDate",
        accessorFn: (originalRow) => new Date(originalRow.orderDate),
        header: "order Date",
        filterVariant: "datetime",
        size: 150,
        type: "date",
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`,
      },
      // {
      //   accessorKey: "shippingDate",
      //   header: "Shipping Date",
      //   size: 150,
      //   dateSetting: {
      //     format: 'dd/MM/yyyy'
      //   },
      //   Cell: ({ cell }) =>
      //     new Date(cell.getValue() as string).toLocaleDateString(),
      // },
      {
        // accessorKey: "shippingDate",
        accessorFn(originalRow) {
          return new Date(originalRow.shippingDate);
        },
        id: "shippingDate",
        header: "Shipping Date",
        size: 150,
        // Custom editor for editing the date in the table
        Edit: ({ cell }) => {
          return (
            <DatePicker
              label={JSON.stringify(cell.getValue())}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          );
        },

        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
      },
      {
        accessorKey: "orderDeliveryDate",
        header: "Order Delivery Date",
        size: 150,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "orderStatus",
        header: "Order Status",
        size: 150,
        enableEditing: false,
        muiEditTextFieldProps: {
          select: true,
          children: [
            "pending",
            "empty",
            "failed",
            "fulfilled",
            "extended",
            "order_default",
          ].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          )),
          error: !!validationErrors?.orderStatus,
          helperText: validationErrors?.orderStatus,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              orderStatus: undefined,
            }),
        },
      },
      // Supplier Column - Shows the supplier name
      {
        accessorKey: "supplier_id", // We're mapping the supplier_id here
        header: "Supplier",
        size: 200,
        enableEditing: true,
        muiEditTextFieldProps: {
          select: true,
          // Render a select dropdown of all suppliers
          children: suppliers.map((supplier) => (
            <MenuItem key={supplier.supplier_id} value={supplier.supplier_id}>
              {supplier.name} {/* Display the supplier name */}
            </MenuItem>
          )),
          error: !!validationErrors?.supplier_id,
          helperText: validationErrors?.supplier_id,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              supplier_id: undefined,
            }),
        },
        // The Cell to display the supplier name in a read-only state
        Cell: ({ cell }) => {
          const supplier = suppliers.find(
            (s) => s.supplier_id === cell.getValue()
          );
          return <div>{supplier ? supplier.name : "No Supplier"}</div>;
        },
      },
    ],
    [validationErrors, suppliers]
  );

  // Handle creating a new order
  const handleCreateOrder: MRT_TableOptions<Order>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateOrder(values);

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setValidationErrors({});
      values = { ...values };
      await createOrder(values);
      table.setCreatingRow(null); // Close the row creation
    };

  // Handle updating an existing order
  const handleSaveOrder: MRT_TableOptions<Order>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateOrder(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    values = { ...values };
    await updateOrder(values);
    table.setEditingRow(null); // Close the row editing
  };

  // Handle deleting an order
  const handleDeleteOrder = async (row: Order) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      await deleteOrder({ orderId: row.orderId });
    }
  };

  // const viewOrderProducts = async(row: Order) =>{

  // }

  const table = useMaterialReactTable({
    columns,
    data: orders || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    enableColumnPinning: true,
    enableRowActions: true,
    // layoutMode: 'grid-no-grow', //constant column widths
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateOrder,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveOrder,
    getRowId: (row) => row.orderId,
    // renderRowActions: ({ row, table }) => (
    //   <Box sx={{ display: "flex", gap: "1rem" }}>
    //     <Tooltip title="Edit">
    //       <IconButton onClick={() => table.setEditingRow(row)}>
    //         <EditIcon />
    //       </IconButton>
    //     </Tooltip>
    //     <Tooltip title="Delete">
    //       <IconButton
    //         color="error"
    //         onClick={() => handleDeleteOrder(row.original)}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //     </Tooltip>
    //     <Tooltip title="view-order-products">
    //       <IconButton
    //         color="primary"
    //         // onClick={() => handleDeleteOrder(row.original)}
    //       >
    //         <Link  href={`/orders/order-product/${row.original.supplier.supplier_id}`}>
    //         <ViewList />
    //         </Link>

    //       </IconButton>
    //     </Tooltip>
    //     <Tooltip title="view-order-products">
    //       <IconButton
    //         color="primary"
    //       >
    //         <Link  href={{
    //           pathname:`/orders/order-product/${row.original.orderId}`,
    //           // query: { orderProducts: JSON.stringify(row.original.OrderProducts)}
    //           }}>
    //         <ViewList />
    //         </Link>

    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    // ),
     renderRowActionMenuItems :({ row, table, closeMenu }) => [
    
    
      // // Delete Action
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu(); // Close the action menu
        }}
        sx={{ m: 0 }}
      >
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => handleDeleteOrder(row.original)} // Call delete handler
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        Delete
      </MenuItem>,
    
      // // View Order Products (Link to another page)
      // <MenuItem
      //   key={2}
      //   onClick={() => closeMenu()} // Close the action menu
      //   sx={{ m: 0 }}
      // >
      //   <Tooltip title="View Order Products">
      //     <IconButton color="primary">
      //       <Link
      //         href={`/orders/order-product/${row.original.orderId}`} // Link to the order's product page
      //       >
      //         <ViewList />
      //       </Link>
      //     </IconButton>
      //   </Tooltip>
      //   View Order Products
      // </MenuItem>,
      //  // view miscelnnaeous
      // <MenuItem
      //   key={0}
      //   onClick={() => {          
      //     closeMenu(); // Close the action menu
      //   }}
      //   sx={{ m: 0 }}
      // >
      //   <Tooltip title="view order-misc">
      //   <IconButton color="primary">
      //       <Link
      //         href={`/orders/order-product/${row.original.orderId}`} // Link to the order's product page
      //       >
      //         <ViewList />
      //       </Link>
      //     </IconButton>
      //   </Tooltip>
      //   view order-misc
      // </MenuItem>,
    ],
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open the create row form
        }}
      >
        Create New Order
      </Button>
    ),
    state: {
      isLoading,
      showAlertBanner: isError,
    },
    initialState: {
      columnPinning: {
        left: ["mrt-row-actions", "state"],
        right: ["orderStatus"],
      },
    },
  });

  // Validation function
  const validateOrder = (values: any) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.orderName) errors.orderName = "Order Name is required";
    if (!values.totalAmount) errors.totalAmount = "Total Amount is required";
    if (!values.paymentStatus)
      errors.paymentStatus = "Payment Status is required";
    if (!values.paymentMethod)
      errors.paymentMethod = "Payment Method is required";
    if (!values.shippingDate) errors.shippingDate = "Shipping Date is required";
    if (!values.orderDeliveryDate)
      errors.orderDeliveryDate = "Order Delivery Date is required";
    if (!values.orderStatus) errors.orderStatus = "Order Status is required";
    if (!values.supplier_id) errors.supplier_id = "Supplier is required";
    return errors;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OrdersTable;
