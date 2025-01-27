'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef // If using TypeScript (optional, but recommended)
} from 'material-react-table';
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSubCategoriesQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} from '@/app/redux/api/inventory-api';
import { Product } from '@/app/(admin)/admin/products/interface/products-Interface';
import { SubCategory, Category } from '@/app/(admin)/admin/categories/interface/categories-interface';
// import { useAppSelector } from '@/app/redux/redux';
import { Box, Button, IconButton, MenuItem, Tooltip } from '@mui/material';
import { EditIcon, DeleteIcon } from 'lucide-react';
import { useGetCategoriesQuery } from '@/app/redux/api/inventory-api';
import { toast } from 'react-toastify';

export default function ProductList() {
  // Fetch products and subcategories via the Redux API
  // const { data: response, isLoading, isError } = useGetProductsQuery('');
  // const { data: subCategoriesResponse } = useGetSubCategoriesQuery();

  // const categories = useAppSelector((state) => state.categories.categories);
  // const { data: Categories, isLoading: IsCategoryLoading, isError: IsCategoryError } = useGetCategoriesQuery();

  // const subcategories: SubCategory[] = subCategoriesResponse ? subCategoriesResponse.data : [];
  const { data: response, isLoading, isError: isProductsError, error: productsError } = useGetProductsQuery('');

  // Fetch subcategories data
  const { data: subCategoriesResponse, isLoading: isSubCategoriesLoading, error: subCategoriesError } = useGetSubCategoriesQuery();

  // Fetch categories data
  const { data: Categories, isLoading: IsCategoryLoading, isError: IsCategoryError, error: categoriesError } = useGetCategoriesQuery();

  // Mutation hook for updating product
  const [updateProduct, { isError: updatingIsProductError, error: updatingProductError, isSuccess: updatedProductSuccess }] =
    useUpdateProductMutation();

  // Mutation hook for creating product
  const [createProduct, { isError: creatingIsProductError, error: creatingProductError, isSuccess: createdProductSuccess }] =
    useCreateProductMutation();
  // Mutation hook for deleting product
  const [deleteProduct, { isError: deletingIsProductError, error: deletingProductError, isSuccess: deletedProductSuccess }] =
    useDeleteProductMutation();
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories: Category[] = Categories ? Categories.data : [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subcategories: SubCategory[] = subCategoriesResponse ? subCategoriesResponse.data : [];
  useEffect(() => {
    toast.dismiss();
    // Handling Products Query state
    if (isLoading) {
      toast.info('Fetching products...');
    }

    if (isProductsError && productsError) {
      if ('message' in productsError) {
        toast.error(`Error fetching products: ${productsError.message || ''}`);
      }
    }

    // Handling SubCategories Query state
    if (isSubCategoriesLoading) {
      toast.info('Fetching subcategories...');
    }

    if (subCategoriesError) {
      if ('message' in subCategoriesError) {
        toast.error(`Error fetching subcategories: ${subCategoriesError.message || ''}`);
      }
    }

    // Handling Categories Query state
    if (IsCategoryLoading) {
      toast.info('Fetching categories...');
    }

    if (IsCategoryError && categoriesError) {
      if ('message' in categoriesError) {
        toast.error(`Error fetching categories: ${categoriesError.message || ''}`);
      }
    }

    // Handling Update Product Mutation state
    if (updatingIsProductError && updatingProductError) {
      if ('message' in updatingProductError) {
        toast.error(`Error updating product: ${updatingProductError.message || ''}`);
      }
    }

    if (updatedProductSuccess) {
      toast.success('Product updated successfully!');
    }

    if (deletingIsProductError && deletingProductError) {
      if ('message' in deletingProductError) {
        toast.error(`Error deleting product: ${deletingProductError.message || ''}`);
      }
    }

    if (deletedProductSuccess) {
      toast.success('Product deleted successfully!');
    }

    // Handling Create Product Mutation state
    if (creatingIsProductError && creatingProductError) {
      console.log('creating product error ', creatingProductError, 'is error ', creatingIsProductError);
      if ('data' in creatingProductError) {
        //@ts-expect-error error ;
        toast.error(`Error ${creatingProductError.data.message || ''}`);
      }
    }

    if (createdProductSuccess) {
      toast.success('Product created successfully!');
    }
  }, [
    isLoading,
    isProductsError,
    productsError,
    isSubCategoriesLoading,
    subCategoriesError,
    IsCategoryLoading,
    IsCategoryError,
    categoriesError,
    updatingIsProductError,
    updatingProductError,
    updatedProductSuccess,
    creatingIsProductError,
    creatingProductError,
    createdProductSuccess,
    deletingIsProductError,
    deletingProductError,
    deletedProductSuccess
  ]);

  // Column definitions for Material React Table
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'product_id',
        header: 'Product ID',
        enableEditing: false,
        size: 30,
        enableHiding: true,
        enablePinning: true,
        visibleInShowHideMenu: false
      },
      {
        accessorKey: 'name',
        header: 'Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () => setValidationErrors({ ...validationErrors, name: undefined })
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
        accessorKey: 'category_id', // The key that stores the category ID
        header: 'Category',
        editVariant: 'select',
        muiEditTextFieldProps: {
          select: true,
          children: categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.category_name}
            </MenuItem>
          ))
        },
        Cell: ({ cell }) => {
          const category = categories.find((cat) => cat.categoryId === cell.getValue());
          return <div>{category ? category.category_name : 'Select a Category'}</div>;
        }
      },
      {
        accessorKey: 'subcategory_id',
        header: 'Subcategory',
        editVariant: 'select',
        muiEditTextFieldProps: {
          select: true,
          children: subcategories.map((subcategory) => (
            <MenuItem key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
              {subcategory.subcategory_name}
            </MenuItem>
          ))
        },
        Cell: ({ cell }) => {
          const subcategory = subcategories.find((subcat) => subcat.subcategory_id === cell.getValue());
          return <div>{subcategory ? subcategory.subcategory_name : 'Select a Subcategory'}</div>;
        }
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        muiTableHeadCellProps: { style: { color: 'green' } }
      },
      {
        accessorKey: 'image_url',
        header: 'Image url',
        muiTableHeadCellProps: { style: { color: 'green' } }
      }
    ],
    [categories, subcategories, validationErrors]
  );

  const products: Product[] = response ? response.data : [];

  // Validation function
  const validateRequired = (value: string) => !!value.length;

  const validateProduct = (product: Product) => {
    return {
      name: !validateRequired(product.name) ? 'Name is required' : '',
      description: !validateRequired(product.description) ? 'Description is required' : ''
    };
  };

  // Handle row creation
  const handleCreateProduct: MRT_TableOptions<Product>['onCreatingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateProduct(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
    delete values.product_id;
    await createProduct(values);
    table.setCreatingRow(null); // Exit creating mode
  };

  // Handle row creation
  const handleUpdateProduct: MRT_TableOptions<Product>['onEditingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateProduct(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = { ...values };
    console.log('values are ', values);
    await updateProduct(values);
    table.setCreatingRow(null); // Exit creating mode
  };

  // const [deleteProduct] = useDeleteProductMutation();
  // Delete action handler
  const openDeleteConfirmModal = (row: MRT_Row<Product>) => {
    if (window.confirm(`Are you sure you want to delete this product?${JSON.stringify({ product_id: row.id })}`)) {
      // Assuming a deleteProduct mutation action here (add implementation as needed)
      deleteProduct({ product_id: row.id });
      // dispatch(deleteProduct(row.original.product_id));
    }
  };

  // Pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: products || [], // Ensure data is memoized or stable
    displayColumnDefOptions: {
      'mrt-row-actions': {
        visibleInShowHideMenu: false //hide the built-in row actions column from the show hide menu
      }
    },
    // initialState: { columnVisibility: { product_id: false } }, //hide product_id column by default
    createDisplayMode: 'row', // Use row mode for creating rows
    editDisplayMode: 'row', // Use row mode for editing rows
    enableEditing: true,
    getRowId: (row) => row.product_id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProduct,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateProduct,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); // Open create row modal
        }}
      >
        Create Product
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
      showAlertBanner: isProductsError
    }
  });

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  // Rendering the MaterialReactTable component
  return (
    <>
      {!products || products.length === 0 ? <div>no products available</div> : null}
      <MaterialReactTable table={table} />
    </>
  );
}
