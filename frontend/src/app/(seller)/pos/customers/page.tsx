"use client";
import React, { useState, useMemo } from "react";
import { Box, Button, IconButton, Tooltip, MenuItem, Alert } from "@mui/material";
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
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "@/app/redux/api/inventory-api";
import { Customer } from "./interface/customer-interface";

const CustomersManagement = () => {
  const {
    data: CustomersData,
    isLoading,
    isError: getCustomersError,
  } = useGetCustomersQuery();

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const customersData = CustomersData?.data || [];

  // Redux Mutation Hooks for Create, Update, Delete
  const [createCustomer,{isError: cusomerError, error: customerErrorCreating}] = useCreateCustomerMutation();
  
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "customerId",
        header: "Customer ID",
        size: 150,
        enableEditing: false,
        muiTableHeadCellProps: { style: { color: "green" } }, // Custom props
        visibleInShowHideMenu: true,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
        },
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
        muiEditTextFieldProps: {
          required: true,
          type: "email",
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          type: "tel",
          error: !!validationErrors?.phoneNumber,
          helperText: validationErrors?.phoneNumber,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber: undefined,
            }),
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 250,
        enableEditing: true,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 150,
        muiEditTextFieldProps: {
          error: !!validationErrors?.country,
          helperText: validationErrors?.country,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              country: undefined,
            }),
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          children: [
            <MenuItem key="active" value="active">
              Active
            </MenuItem>,
            <MenuItem key="inactive" value="inactive">
              Inactive
            </MenuItem>,
          ],
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              status: undefined,
            }),
        },
      },
      {
        accessorKey: "loyaltyPoints",
        header: "Loyalty Points",
        size: 150,
        enableEditing: true,
      },
  
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 200,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
        enableEditing: false,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        size: 200,
        Cell: ({ cell }) =>
          new Date(cell.getValue() as string).toLocaleDateString(),
        enableEditing: false,
      },
      
      {
        accessorKey: "notes",
        header: "Notes",
        size: 250,
        enableEditing: true,
      },
      {
        accessorKey: "preferredPaymentMethod",
        header: "Preferred Payment Method",
        size: 200,
        enableEditing: true,
      },
    ],
    [validationErrors]
  );

  // Handle creating a new customer
  const handleCreateCustomer: MRT_TableOptions<Customer>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateCustomer(values);

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setValidationErrors({});
      values = { ...values };
      delete values.customerId;
      delete values.createdAt;
      delete values.updatedAt;     
      values.loyaltyPoints = Number(values.loyaltyPoints)
      await createCustomer(values);
      table.setCreatingRow(null);
    };

  // Handle updating an existing customer
  const handleSaveCustomer: MRT_TableOptions<Customer>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateCustomer(values);

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setValidationErrors({});
      values = { ...values };

      delete values.createdAt;
      delete values.updatedAt;

      await updateCustomer(values);
      table.setEditingRow(null);
    };

  // Handle deleting a customer
  const handleDelete = async (row: Customer) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmed) {
      await deleteCustomer({ customerId: row.customerId });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: customersData || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateCustomer,
    onEditingRowCancel: () => setValidationErrors({}),
    muiToolbarAlertBannerProps: cusomerError || getCustomersError
      ? {
          color: 'error',
          children: cusomerError ? 'error creating customer': 'error',
        }
      : undefined,
    onEditingRowSave: handleSaveCustomer,
    getRowId: (row) => row.customerId,
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
        Add New Customer
      </Button>
    ),
    state: {
      isLoading, 
      showAlertBanner: cusomerError || getCustomersError,     
    },
  });

     // Validation function
  const validateCustomer = (values: Record<LiteralUnion<"status" | "email" | "customerId" | "address" | "notes" | "firstName" | "lastName" | "phoneNumber" | "country" | "createdAt" | "updatedAt" | "loyaltyPoints" | "totalSpent" | "preferredPaymentMethod", string>, any>) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!values.status) errors.status = "Status is required";

    return errors;
  };

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && <div>Loading customers...</div>}
      {/* {cusomerError? JSON.stringify(customerErrorCreating?.data.message): null} */}
      
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default CustomersManagement;
