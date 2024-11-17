'use client';

import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef, // If using TypeScript (optional, but recommended)
} from "material-react-table";
import {
  useCreateSupplierMutation,
  useGetSuppliersQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} from "@/app/redux/api/inventory-api"; // Assuming you have these API hooks set up
import { Supplier } from "@/app/suppliers/interface/supplier-interface"; // The Supplier interface

import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { EditIcon, DeleteIcon } from "lucide-react";

export default function SupplierList() {
  // Fetch suppliers from the API via Redux
  const { data: response, isLoading, isError } = useGetSuppliersQuery("");
  
  const suppliers: Supplier[] = response ? response.data : [];

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  // Column definitions for Material React Table
  const columns = useMemo<MRT_ColumnDef<Supplier>[]>(
    () => [
      {
        accessorKey: "supplier_id", // Unique supplier identifier
        header: "Supplier ID",
        enableEditing: false,
        size: 30,
        enableHiding: true,
        enablePinning: true,
        visibleInShowHideMenu: false, 
      },
      {
        accessorKey: "name",
        header: "Supplier Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () => setValidationErrors({ ...validationErrors, name: undefined }),
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.address,
          helperText: validationErrors?.address,
          onFocus: () => setValidationErrors({ ...validationErrors, address: undefined }),
        },
      },
      {
        accessorKey: "contact",
        header: "Contact Information",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.contact,
          helperText: validationErrors?.contact,
          onFocus: () => setValidationErrors({ ...validationErrors, contact: undefined }),
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 180,
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
        size: 180,
      },
    ],
    [validationErrors]
  );

  // Validation function for the Supplier
  const validateSupplier = (supplier: Supplier) => {
    return {
      name: !supplier.name ? "Supplier Name is required" : "",
      address: !supplier.address ? "Address is required" : "",
      contact: !supplier.contact ? "Contact Information is required" : "",
    };
  };

  // Handle row creation
  const [createSupplier] = useCreateSupplierMutation();
  const handleCreateSupplier: MRT_TableOptions<Supplier>["onCreatingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateSupplier(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
    delete values.supplier_id; // Ensure no supplier_id is sent during creation
    delete values.updated_at;
    delete values.created_at;
    await createSupplier(values);
    table.setCreatingRow(null); // Exit creating mode
  };

  // Handle row update
  const [updateSupplier] = useUpdateSupplierMutation();
  const handleUpdateSupplier: MRT_TableOptions<Supplier>["onEditingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateSupplier(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
  
    delete values.updated_at;
    delete values.created_at;
    await updateSupplier(values);
    table.setEditingRow(null); // Exit editing mode
  };

  // Handle delete
  const [deleteSupplier] = useDeleteSupplierMutation();
  const openDeleteConfirmModal = (row: MRT_Row<Supplier>) => {
    if (window.confirm(`Are you sure you want to delete this supplier? ${JSON.stringify({ supplier_id: row.id })}`)) {
      deleteSupplier({ supplier_id: row.id });
    }
  };

  // Pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: suppliers || [], // Ensure data is memoized or stable
    displayColumnDefOptions: {
      "mrt-row-actions": {
        visibleInShowHideMenu: false, // Hide the built-in row actions column from the show/hide menu
      },
    },
    createDisplayMode: "row", // Use row mode for creating rows
    editDisplayMode: "row", // Use row mode for editing rows
    enableEditing: true,
    getRowId: (row) => row.supplier_id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateSupplier,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateSupplier,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open create row modal
        }}
      >
        Create Supplier
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

  if (!suppliers || suppliers.length === 0) {
    return <div>No suppliers available</div>;
  }

  if (isError || !suppliers) {
    return <div className="text-center text-red-500 py-4">Failed to fetch suppliers</div>;
  }

  // Rendering the MaterialReactTable component
  return <MaterialReactTable table={table} />;
}
