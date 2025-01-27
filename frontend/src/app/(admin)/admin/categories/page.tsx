'use client';
import { useEffect, useMemo, useState } from 'react';

import {
  LiteralUnion,
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';
//import { getDefaultMRTOptions } from '@/app/(components)/material-table/index'; //your default options
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Category } from '@/app/(admin)/admin/categories/interface/categories-interface';
import { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } from '@/app/redux/api/inventory-api';
import { toast } from 'react-toastify';

const CategoryProductTable = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory, { isLoading: categoryIsLoading, isError: categoryError }] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: deleting, isError: errorDeleting, isSuccess: deletedSuccessfully, error: deleteError }] =
    useDeleteCategoryMutation();
  useEffect(() => {
    if (isLoading) {
      toast.info('fetching categories ....');
    }

    if (isError) {
      toast.error('error fetching categoris');
    }

    if (categoryIsLoading) {
      toast.info('creating categoy....');
    }

    if (categoryError) {
      toast.info('error creating categories');
    }
  }, [isLoading, isError, categoryIsLoading, categoryError]);

  useEffect(() => {
    if (deleting) {
      toast.info('deleting category');
    }

    if (errorDeleting) {
      toast.error(`error deleting category ${JSON.stringify(deleteError)}`);
    }

    if (deletedSuccessfully) {
      toast.info('category successfully deleted');
    }
  }, [deleting, errorDeleting, deletedSuccessfully, deleteError]);

  const Categories: Category[] = categories ? categories.data : [];
  // Columns for category table
  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'categoryId', // Unique category identifier
        header: 'Category ID',
        enableEditing: false, // Disable editing for ID
        size: 160
      },
      {
        accessorKey: 'category_slug',
        header: 'Slug',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.category_slug,
          helperText: validationErrors?.category_slug,
          onFocus: () => setValidationErrors({ ...validationErrors, category_slug: undefined })
        }
      },
      {
        accessorKey: 'category_name',
        header: 'Category Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.category_name,
          helperText: validationErrors?.category_name,
          onFocus: () => setValidationErrors({ ...validationErrors, category_name: undefined })
        }
      },
      {
        accessorKey: 'description',
        header: 'Description',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () => setValidationErrors({ ...validationErrors, description: undefined })
        }
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        enableEditing: false, // Disable editing for created_at
        size: 180
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated At',
        enableEditing: false, // Disable editing for updated_at
        size: 180
      }
    ],
    [validationErrors]
  );

  // Handle creating a category (mock function, integrate your own API call here)
  const handleCreateCategory: MRT_TableOptions<Category>['onCreatingRowSave'] = async ({ values, table }) => {
    // Validation logic (similar to your user validation)
    const newValidationErrors = validateCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // call category create mutation
    values = { ...values };
    delete values.categoryId;
    delete values.created_at;
    delete values.updated_at;
    await createCategory(values);

    table.setCreatingRow(null); // Close row creation
  };

  // Handle updating a category (mock function, integrate your own API call here)
  const handleSaveCategory: MRT_TableOptions<Category>['onEditingRowSave'] = async ({ values, table }) => {
    // Validation logic (similar to your user validation)
    const newValidationErrors = validateCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // Integrate with your API to update the category (mock API call)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    table.setEditingRow(null); // Close row editing
  };

  // Handle deleting a category (mock function, integrate your own API call here)
  const openDeleteConfirmModal = (row: MRT_Row<Category>) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      // Integrate with your API to delete the category (mock API call)
      console.log('Deleting category:', row.original.categoryId);
      const categoryId = row.original.categoryId;
      deleteCategory(categoryId);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: Categories || [], // Pass your categories data
    createDisplayMode: 'row', // Open the row for creating a new category
    editDisplayMode: 'row', // Use row-level editing for category
    enableEditing: true,
    getRowId: (row) => row.categoryId, // Ensure row has a unique id
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateCategory,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveCategory,
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open the create row modal
        }}
      >
        Create New Category
      </Button>
    ),
    state: {
      isLoading: false, // Handle loading state (integrate with your state)
      isSaving: false, // Handle saving state (integrate with your state)
      showAlertBanner: false,
      showProgressBars: false
    }
  });

  return <MaterialReactTable table={table} />;
};

// Validation function for category
const validateCategory = (
  category: Record<
    LiteralUnion<
      | 'Products'
      | 'description'
      | 'created_at'
      | 'updated_at'
      | 'categoryId'
      | 'category_slug'
      | 'category_name'
      | 'Products.subcategory_id'
      | 'Products.description'
      | 'Products.created_at'
      | 'Products.updated_at'
      | 'Products.category'
      | 'Products.product_id'
      | 'Products.name'
      | 'Products.category_id'
      | 'Products.image_url'
      | 'Products.sku'
      | 'Products.subcategory'
      | 'Products.category.Products'
      | 'Products.category.description'
      | 'Products.category.created_at'
      | 'Products.category.updated_at'
      | 'Products.category.categoryId'
      | 'Products.category.category_slug'
      | 'Products.category.category_name'
      | 'Products.subcategory.Products'
      | 'Products.subcategory.subcategory_id'
      | 'Products.subcategory.subcategory_name'
      | 'Products.subcategory.description'
      | 'Products.subcategory.created_at'
      | 'Products.subcategory.updated_at'
      | 'Products.subcategory.category'
      | 'Products.subcategory.category.Products'
      | 'Products.subcategory.category.description'
      | 'Products.subcategory.category.created_at'
      | 'Products.subcategory.category.updated_at'
      | 'Products.subcategory.category.categoryId'
      | 'Products.subcategory.category.category_slug'
      | 'Products.subcategory.category.category_name',
      string
    >,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
) => {
  return {
    category_name: !category.category_name ? 'Category Name is Required' : '',
    category_slug: !category.category_slug ? 'Category Slug is Required' : '',
    description: !category.description ? 'Description is Required' : ''
  };
};

export default CategoryProductTable;
