'use client';

import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef // If using TypeScript (optional, but recommended)
} from 'material-react-table';
import { useCreateUnitMutation, useGetUnitsQuery, useUpdateUnitMutation, useDeleteUnitMutation } from '@/app/redux/api/inventory-api'; // Assuming you have these API hooks set up
import { Unit } from '@/app/(admin)/admin/units/interface/units-interface'; // The Unit interface

import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { EditIcon, DeleteIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function UnitList() {
  // Fetch units from the API via Redux
  const { data: response, isLoading, isError } = useGetUnitsQuery('');

  const units: Unit[] = response ? response.data : [];
  const [createUnit] = useCreateUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  // Column definitions for Material React Table
  const columns = useMemo<MRT_ColumnDef<Unit>[]>(
    () => [
      {
        accessorKey: 'unit_id', // Unique unit identifier
        header: 'Unit ID',
        enableEditing: false,
        size: 30,
        enableHiding: true,
        enablePinning: true,
        visibleInShowHideMenu: false
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.unit,
          helperText: validationErrors?.unit,
          onFocus: () => setValidationErrors({ ...validationErrors, unit: undefined })
        }
      },
      {
        accessorKey: 'short_name',
        header: 'Short Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.short_name,
          helperText: validationErrors?.short_name,
          onFocus: () => setValidationErrors({ ...validationErrors, short_name: undefined })
        }
      },
      {
        accessorKey: 'no_of_products',
        header: 'No of Products',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.no_of_products,
          helperText: validationErrors?.no_of_products,
          onFocus: () => setValidationErrors({ ...validationErrors, no_of_products: undefined })
        }
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        enableEditing: false,
        size: 180
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated At',
        enableEditing: false,
        size: 180
      }
    ],
    [validationErrors]
  );
  const { data: session } = useSession();
  console.log('Session data: ', session); // Log session to inspect user data

  // Validation function for the Unit
  const validateUnit = (unit: Unit) => {
    return {
      unit: !unit.unit ? 'Unit is required' : '',
      short_name: !unit.short_name ? 'Short Name is required' : '',
      no_of_products: !unit.no_of_products ? 'No of Products is required' : ''
    };
  };

  // Handle row creation

  const handleCreateUnit: MRT_TableOptions<Unit>['onCreatingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUnit(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
    delete values.unit_id; // Ensure no unit_id is sent during creation
    delete values.created_at;
    delete values.updated_at;
    const no_of_products = Number(values.no_of_products);
    values = { ...values, no_of_products };
    await createUnit(values);
    table.setCreatingRow(null); // Exit creating mode
  };

  // Handle row update

  const handleUpdateUnit: MRT_TableOptions<Unit>['onEditingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUnit(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
    delete values.created_at;
    delete values.updated_at;
    await updateUnit(values);
    table.setEditingRow(null); // Exit editing mode
  };

  // Handle delete

  const openDeleteConfirmModal = (row: MRT_Row<Unit>) => {
    if (window.confirm(`Are you sure you want to delete this unit? ${JSON.stringify({ unit_id: row.id })}`)) {
      deleteUnit({ unit_id: row.id });
    }
  };

  // Pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: units || [], // Ensure data is memoized or stable
    displayColumnDefOptions: {
      'mrt-row-actions': {
        visibleInShowHideMenu: false // Hide the built-in row actions column from the show/hide menu
      }
    },
    createDisplayMode: 'row', // Use row mode for creating rows
    editDisplayMode: 'row', // Use row mode for editing rows
    enableEditing: true,
    getRowId: (row) => row.unit_id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUnit,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateUnit,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open create row modal
        }}
      >
        Create Unit
      </Button>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
      showAlertBanner: isError
    }
  });

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-4">Failed to fetch units</div>;
  }
  if (!session) {
    return <div>Loading...</div>;
  }

  // Rendering the MaterialReactTable component
  return (
    <>
      {!units || units.length === 0 ? <div>No units available</div> : null}
      <MaterialReactTable table={table} />
    </>
  );
}
