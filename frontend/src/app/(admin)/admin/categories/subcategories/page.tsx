'use client';
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_Row, MRT_TableOptions, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import {
  useCreateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation
} from '@/app/redux/api/inventory-api'; // Assuming you have these hooks set up
import { SubCategory } from '@/app/(admin)/admin/categories/interface/categories-interface'; // Your interface for SubCategory
// import { useAppSelector } from '@/app/redux/redux';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { EditIcon, DeleteIcon } from 'lucide-react';
import { toast } from 'react-toastify';

export default function SubCategoryList() {
  const { data: response, isLoading: isLoadingQuery, isError: isErrorQuery, error: queryError } = useGetSubCategoriesQuery();
  const [createSubCategory, { isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorCreate }] =
    useCreateSubCategoryMutation();
  const [updateSubCategory, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] =
    useUpdateSubCategoryMutation();
  const [deleteSubCategory, { isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete }] =
    useDeleteSubCategoryMutation();

  // Toast for the query (getting subcategories)
  useEffect(() => {
    toast.dismiss();

    if (isLoadingQuery) {
      toast.info('Loading subcategories...');
    }

    if (isErrorQuery) {
      toast.error(`Error fetching subcategories: ${JSON.stringify(queryError) || 'Something went wrong'}`);
    }

    if (response) {
      toast.success('Subcategories loaded successfully!');
    }

    // Toast for the create mutation (creating subcategory)
    if (isLoadingCreate) {
      toast.info('Creating subcategory...');
    }

    if (isSuccessCreate) {
      toast.success('Subcategory created successfully!');
    }

    if (isErrorCreate) {
      toast.error(`Error creating subcategory: ${JSON.stringify(errorCreate)} Something went wrong`);
    }

    // Toast for the update mutation (updating subcategory)
    if (isLoadingUpdate) {
      toast.info('Updating subcategory...');
    }

    if (isSuccessUpdate) {
      toast.success('Subcategory updated successfully!');
    }

    if (isErrorUpdate) {
      toast.error(`Error updating subcategory: ${JSON.stringify(errorUpdate)} Something went wrong`);
    }

    // Toast for the delete mutation (deleting subcategory)
    if (isLoadingDelete) {
      toast.info('Deleting subcategory...');
    }

    if (isSuccessDelete) {
      toast.success('Subcategory deleted successfully!');
    }

    if (isErrorDelete) {
      toast.error(`Error deleting subcategory: ${JSON.stringify(errorDelete)}`);
    }
  }, [
    isLoadingQuery,
    isErrorQuery,
    response,
    queryError,
    isLoadingCreate,
    isSuccessCreate,
    isErrorCreate,
    errorCreate,
    isLoadingUpdate,
    isSuccessUpdate,
    isErrorUpdate,
    errorUpdate,
    isLoadingDelete,
    isSuccessDelete,
    isErrorDelete,
    errorDelete
  ]);

  console.log('response is ', response);

  //const categories = useAppSelector((state) => state.categories.categories); // Assuming this is where categories are fetched

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  // Column definitions for the subcategory table
  const columns = useMemo<MRT_ColumnDef<SubCategory>[]>(
    () => [
      {
        accessorKey: 'subcategory_id',
        header: 'Subcategory ID',
        enableEditing: false,
        size: 30,
        enableHiding: true,
        enablePinning: true,
        visibleInShowHideMenu: true
      },
      {
        accessorKey: 'subcategory_name',
        header: 'Subcategory Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.subcategory_name,
          helperText: validationErrors?.subcategory_name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              subcategory_name: undefined
            })
        }
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableHiding: false
      }
    ],
    [validationErrors] // Recalculate the columns when categories change
  );

  const subcategories: SubCategory[] = response ? response.data : [];

  // CREATE action for SubCategory
  const handleCreateSubCategory: MRT_TableOptions<SubCategory>['onCreatingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateSubCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
    delete values.subcategory_id;

    await createSubCategory(values);
    table.setCreatingRow(null);
  };

  // Handle updating a category (
  const handleUpdateCategory: MRT_TableOptions<SubCategory>['onEditingRowSave'] = async ({ values, table }) => {
    // Validation logic
    const newValidationErrors = validateSubCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    updateSubCategory(values);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    table.setEditingRow(null);
  };
  // DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<SubCategory>) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      deleteSubCategory(row.original.subcategory_id);
    }
  };

  // Table setup using useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: subcategories || [],
    enableRowSelection: false,
    enableBottomToolbar: true,
    enableClickToCopy: true,
    enableColumnActions: true,
    enableColumnDragging: true,
    enableColumnPinning: true,
    enablePagination: true,
    enableRowActions: true,
    enableRowDragging: false,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.subcategory_id,
    muiToolbarAlertBannerProps: isLoadingQuery
      ? {
          color: 'error',
          children: 'Error loading subcategories'
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px'
      }
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateSubCategory,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateCategory,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open the create row modal
        }}
      >
        Create Subcategory
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
    )
  });

  return (
    <>
      {!subcategories || subcategories.length === 0 ? <div>No subcategories available</div> : null}
      <MaterialReactTable table={table} />;
    </>
  );
}

// Validation function for required fields
const validateRequired = (value: string) => !!value.length;

function validateSubCategory(subcategory: SubCategory) {
  return {
    subcategory_name: !validateRequired(subcategory.subcategory_name) ? 'Subcategory Name is required' : ''
  };
}
