'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button, IconButton, Tooltip, MenuItem } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef, MRT_TableOptions, useMaterialReactTable } from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useGetSupplierPricingQuery,
  useCreateSupplierPricingMutation,
  useUpdateSupplierPricingMutation,
  useDeleteSupplierPricingMutation,
  useGetSupplierProductsQuery,
  useGetUnitsQuery
} from '@/app/redux/api/inventory-api';
// import { Unit } from "@/app/units/interface/units-interface";
import { SupplierPricing } from '@/app/(admin)/admin/suppliers/interface/supplier-interface';
import { toast } from 'react-toastify';
// import { DatePicker } from '@mui/x-date-pickers';
// import dayjs, { Dayjs } from 'dayjs';

const SupplierProductPricing = () => {
  // const { data: SupplierPricingData, isLoading, isError } = useGetSupplierPricingQuery();
  // const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
  const [value, setValue] = useState<string>();

  // const { data: SupplierProductsData } = useGetSupplierProductsQuery();
  // const { data: UnitsData, isLoading: unitDataLoading } = useGetUnitsQuery(); // Fetch units data
  // Redux Mutation Hooks for Create, Update, Delete
  // const [createSupplierPricing, { isSuccess: successfullSupplierPriceCreated }] = useCreateSupplierPricingMutation();
  // const [updateSupplierPricing] = useUpdateSupplierPricingMutation();
  // const [deleteSupplierPricing] = useDeleteSupplierPricingMutation();

  const {
    data: SupplierPricingData,
    isLoading: isPricingLoading,
    isError: isPricingError,
    error: pricingError
  } = useGetSupplierPricingQuery();
  const {
    data: SupplierProductsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError
  } = useGetSupplierProductsQuery();
  const { data: UnitsData, isLoading: isUnitsLoading, isError: isUnitsError, error: unitsError } = useGetUnitsQuery();

  // Redux Mutation Hooks (for create, update, delete)
  const [
    createSupplierPricing,
    { isLoading: creatingPricing, isSuccess: successfulSupplierPriceCreated, isError: createPricingError, error: createPricingErrorData }
  ] = useCreateSupplierPricingMutation();
  const [
    updateSupplierPricing,
    { isLoading: updatingPricing, isSuccess: successfulSupplierPricingUpdated, isError: updatePricingError, error: updatePricingErrorData }
  ] = useUpdateSupplierPricingMutation();
  const [
    deleteSupplierPricing,
    { isLoading: deletingPricing, isSuccess: pricingDeletedSuccessfully, isError: errorDeletingPricing, error: deletePricingErrorData }
  ] = useDeleteSupplierPricingMutation();

  useEffect(() => {
    // Fetching supplier pricing
    toast.dismiss();

    if (isPricingLoading) {
      toast.info('Fetching supplier pricing...');
    }
    if (isPricingError) {
      toast.error(`Error fetching supplier pricing: ${JSON.stringify(pricingError)}`);
    }

    // Fetching products
    if (isProductsLoading) {
      toast.info('Fetching supplier products...');
    }
    if (isProductsError) {
      toast.error(`Error fetching supplier products: ${JSON.stringify(productsError)}`);
    }

    // Fetching units
    if (isUnitsLoading) {
      toast.info('Fetching units...');
    }
    if (isUnitsError) {
      toast.error(`Error fetching units: ${JSON.stringify(unitsError)}`);
    }

    // Creating supplier pricing
    if (creatingPricing) {
      toast.info('Creating supplier pricing...');
    }
    if (createPricingError) {
      toast.error(`Error creating supplier pricing: ${JSON.stringify(createPricingErrorData)}`);
    }
    if (successfulSupplierPriceCreated) {
      toast.success('Supplier pricing created successfully!');
    }

    // Updating supplier pricing
    if (updatingPricing) {
      toast.info('Updating supplier pricing...');
    }
    if (updatePricingError) {
      toast.error(`Error updating supplier pricing: ${JSON.stringify(updatePricingErrorData)}`);
    }
    if (successfulSupplierPricingUpdated) {
      toast.success('Supplier pricing updated successfully!');
    }

    // Deleting supplier pricing
    if (deletingPricing) {
      toast.info('Deleting supplier pricing...');
    }
    if (errorDeletingPricing) {
      toast.error(`Error deleting supplier pricing: ${JSON.stringify(deletePricingErrorData)}`);
    }
    if (pricingDeletedSuccessfully) {
      toast.success('Supplier pricing deleted successfully!');
    }
  }, [
    // Query and mutation states for effect triggering
    isPricingLoading,
    isPricingError,
    pricingError,
    isProductsLoading,
    isProductsError,
    productsError,
    isUnitsLoading,
    isUnitsError,
    unitsError,
    creatingPricing,
    createPricingError,
    createPricingErrorData,
    successfulSupplierPriceCreated,
    updatingPricing,
    updatePricingError,
    updatePricingErrorData,
    successfulSupplierPricingUpdated,
    deletingPricing,
    errorDeletingPricing,
    deletePricingErrorData,
    pricingDeletedSuccessfully
  ]);

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  let supplierPricingData = SupplierPricingData?.data || [];
  let supplierProductsData = SupplierProductsData?.data || [];
  const unitsData = UnitsData?.data || [];

  if (supplierPricingData === undefined) {
    console.log('supplier pricing is ', supplierPricingData);
    supplierPricingData = [];
  }

  if (supplierProductsData === undefined) {
    supplierProductsData = [];
  }

  // Format function using Dayjs format method

  useEffect(() => {
    console.log('The current value in state is: ', value); // This will log whenever the state is updated
  }, [value]);

  const dateHandler = (e: { target: { value: string } }) => {
    console.log('date value is ', e.target.value);

    const value = formatDateToYYYYMMDD(e.target.value);

    setValue(value.toString());
    console.log('the state value is ', value);
    // console.log('data handler is ', date);
    // date = formatDateToYYYYMMDD(date);
    // console.log('date after date is ', date);
  };

  const columns = useMemo<MRT_ColumnDef<SupplierPricing>[]>(
    () => [
      {
        accessorKey: 'supplier_pricing',
        header: 'Supplier Pricing ID',
        size: 150,
        enableEditing: false
      },
      {
        accessorFn: (row) => row.supplierProduct?.supplier?.name,
        header: 'Supplier',
        size: 150,
        enableEditing: false
      },
      {
        accessorKey: 'supplier_products_id',
        header: 'Supplier Products ID',
        enableHiding: true,
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          children: supplierProductsData?.map((supplierproduct) => (
            <MenuItem key={supplierproduct.supplier_products_id} value={supplierproduct.supplier_products_id}>
              {`${supplierproduct.supplier?.name} - ${supplierproduct.product?.name}`}
            </MenuItem>
          )),
          error: !!validationErrors?.supplier_products_id,
          helperText: validationErrors?.supplier_products_id,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              supplier_products_id: undefined
            })
        },
        Cell: ({ cell }) => {
          const suppliercellData = supplierProductsData.find((supplierCell) => supplierCell.supplier_products_id === cell.getValue());
          return (
            <div>
              {suppliercellData ? `${suppliercellData.supplier?.name} - ${suppliercellData.product?.name}` : 'No Supplier Product Found'}
            </div>
          );
        }
      },
      {
        accessorFn: (row) => row.supplierProduct?.product?.name,
        header: 'Product_Name',
        size: 200,
        enableHiding: true,
        enableEditing: false
      },
      {
        accessorKey: 'Quantity',
        header: 'Quantity',
        size: 100,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.Quantity,
          helperText: validationErrors?.Quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              Quantity: undefined
            })
        }
      },

      {
        accessorFn: (row) => row.unit?.unit_id, // For unit short_name
        header: 'unit_id',
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
              unit_id: undefined
            })
        },
        Cell: ({ cell }) => {
          const unit = unitsData.find((unit) => unit.unit_id === cell.getValue());
          return <div>{unit ? unit.short_name : 'no units'}</div>;
        }
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined
            })
        },
        Cell: ({ cell }) => `$${parseFloat(cell.getValue() as string).toFixed(2)}`
      },
      {
        // accessorKey: "shippingDate",
        accessorFn(originalRow) {
          return new Date(originalRow.effective_date);
        },
        id: 'effective_date',
        header: 'Effective Date',
        size: 150,
        // Custom editor for editing the date in the table
        Edit: () => {
          return (
            <input
              type="date"
              id="effectiveDates"
              // id={cell.getValue ? cell.getValue : Math.random()}
              value={value}
              onChange={dateHandler}
            />
          );
        },

        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString() // convert back to string for display
      }
      // {
      //   accessorKey: 'effective_date',
      //   header: 'Effective Date',
      //   size: 150,
      //   Cell: ({ cell }) => new Date(cell.getValue() as string).toLocaleDateString()
      // },
      // {
      //   // accessorKey: "shippingDate",
      //   accessorFn(originalRow) {
      //     return new Date(originalRow.effective_date);
      //   },
      //   id: 'effective_date',
      //   header: 'Effective Date',
      //   size: 150,
      //   // Custom editor for editing the date in the table
      //   Edit: ({ cell }) => {
      //     return <DatePicker label={JSON.stringify(cell.getValue())} value={value} onChange={(newValue) => dateHandler(newValue)} />;
      //   },

      //   Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString() // convert back to string for display
      // }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validationErrors, supplierProductsData, unitsData, value]
  );

  // function formatDateToYYYYMMDD(date: Dayjs | null): string {
  //   if (!date) return ''; // Return empty string if no date is provided
  //   return date.format('YYYY-MM-DD'); // Use the Dayjs format method
  // }
  function formatDateToYYYYMMDD(dateString: string | Date) {
    const date = new Date(dateString); // Create a Date object from the string
    const year = date.getFullYear(); // Get the full year (4 digits)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-based, so add 1) and pad with zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with zero if needed

    return `${year}-${month}-${day}`; // Format it as yyyy-mm-dd
  }

  // Handle creating a new row (Add New Pricing)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreatePricing: MRT_TableOptions<SupplierPricing>['onCreatingRowSave'] = async ({ values, table }: any) => {
    const newValidationErrors = validatePricing(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    values = { ...values };
    delete values.Product_Name;
    delete values.Supplier;
    delete values.supplier_pricing;
    const effective_date = value;
    // effective_date = formatDateToYYYYMMDD(value);
    values.effective_date = effective_date;

    console.log('values is ', values);
    console.log('the values is ', value);
    console.log('creating new products', values);

    await createSupplierPricing(values);
    table.setCreatingRow(null);
  };

  // Handle updating an existing row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSavePricing: MRT_TableOptions<SupplierPricing>['onEditingRowSave'] = async ({ values, table }: any) => {
    const newValidationErrors = validatePricing(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    values = { ...values };
    delete values.Product_Name;
    delete values.Supplier;
    const effective_date = value;
    // effective_date = formatDateToYYYYMMDD(value);
    values.effective_date = effective_date;
    // delete values.supplier_pricing;
    console.log('saving new products', values);
    await updateSupplierPricing(values);
    table.setEditingRow(null);
  };

  // Handle deleting a row
  const handleDelete = async (row: SupplierPricing) => {
    const confirmed = window.confirm('Are you sure you want to delete this pricing?');
    if (confirmed) {
      await deleteSupplierPricing({ supplier_pricing: row.supplier_pricing });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: supplierPricingData || [],
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreatePricing,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePricing,
    getRowId: (row) => row.supplier_pricing,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
        Add New Pricing
      </Button>
    ),
    state: {
      isLoading: isPricingLoading,
      showAlertBanner: isPricingError
    }
  });

  // Validation function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validatePricing = (values: any) => {
    const errors: Record<string, string | undefined> = {};

    if (!values.Quantity) errors.Quantity = 'Quantity is required';
    if (!values.price) errors.price = 'Price is required';
    if (!values.effective_date) errors.effective_date = 'Effective Date is required';
    if (!values.supplier_products_id) errors.supplier_products_id = 'Supplier Product is required';
    if (!values.unit_id) errors.unit_id = 'Unit is required';
    return errors;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default SupplierProductPricing;
