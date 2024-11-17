"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  useCreateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "@/app/redux/api/inventory-api"; // Assuming you have these hooks set up
import { SubCategory } from  '@/app/categories/interface/categories-interface'; // Your interface for SubCategory
import { useAppSelector } from "@/app/redux/redux";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import { EditIcon, DeleteIcon } from "lucide-react";

export default function SubCategoryList() {
  // Fetch subcategories
  const { data: response, isLoading, isError } = useGetSubCategoriesQuery();
  console.log("response is ", response);

  const categories = useAppSelector((state) => state.categories.categories); // Assuming this is where categories are fetched

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [updateSubCategory] = useUpdateSubCategoryMutation()

  // Column definitions for the subcategory table
  const columns = useMemo<MRT_ColumnDef<SubCategory>[]>(
    () => [
      {
        accessorKey: "subcategory_id",
        header: "Subcategory ID",
        enableEditing: false,
        size: 30,
        enableHiding: true,
        enablePinning: true,
        visibleInShowHideMenu: true,
      },
      {
        accessorKey: "subcategory_name",
        header: "Subcategory Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.subcategory_name,
          helperText: validationErrors?.subcategory_name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              subcategory_name: undefined,
            }),
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        enableHiding: false,
      },
    
    ],
    [categories] // Recalculate the columns when categories change
  );

  const subcategories: SubCategory[] = response ? response.data : [];

  const [createSubCategory] = useCreateSubCategoryMutation();

  // CREATE action for SubCategory
  const handleCreateSubCategory: MRT_TableOptions<SubCategory>["onCreatingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateSubCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    values = {...values}
    delete values.subcategory_id;
    // Redux mutation to create a new subcategory
    await createSubCategory(values);
    table.setCreatingRow(null); // Exit creating mode
  };

    // Handle updating a category (
    const handleUpdateCategory:MRT_TableOptions<SubCategory>["onEditingRowSave"]  = async ({ values, table }) => {
      // Validation logic 
      const newValidationErrors = validateSubCategory(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      updateSubCategory(values)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      table.setEditingRow(null); // Close row editing
    };
  // DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<SubCategory>) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      // Call delete API mutation here if needed
      // deleteSubCategory(row.original.subcategory_id);
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
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row.subcategory_id,
    muiToolbarAlertBannerProps: isLoading
      ? {
          color: "error",
          children: "Error loading subcategories",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
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
  });

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }



  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch subcategories. {JSON.stringify(isError)}
      </div>
    );
  }

  return(
    <>
    {!subcategories || subcategories.length === 0 ? (<div>No subcategories available</div>): null}
      <MaterialReactTable table={table} />;
  </>
  )

  

}

// Validation function for required fields
const validateRequired = (value: string) => !!value.length;

function validateSubCategory(subcategory: SubCategory) {
  return {
    subcategory_name: !validateRequired(subcategory.subcategory_name)
      ? "Subcategory Name is required"
      : "",
  };
}
