'use client';
import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Transaction, TransactionProduct } from '@/app/(seller)/pos/transactions/interfaces/transactions-interface'; // Import your Transaction type
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useGetTransactionsQuery } from '@/app/redux/api/inventory-api'; // Import the RTK hook for fetching transactions
// Define the type for the transaction data
// interface TransactionTableProps {
//   data: Transaction[];
// }

const TransactionTable = () => {
  const { data: TransactionData, isLoading, isError, error } = useGetTransactionsQuery();
  const transactionData = TransactionData?.data || [];
  // Define columns for the transaction table
  const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'transactionId', // Normal accessorKey
        header: 'Transaction ID',
        size: 200
      },
      {
        accessorKey: 'totalCost', // Total cost
        header: 'Total Cost',
        size: 150,
        Cell: ({ cell }) => <Typography>{(cell.getValue() as number).toFixed(2)} kes</Typography>
      },
      {
        accessorKey: 'paymentMethod', // Payment method
        header: 'Payment Method',
        size: 150
      },
      {
        accessorKey: 'subtotal', // Subtotal before VAT/Discount
        header: 'Subtotal',
        size: 150,
        Cell: ({ cell }) => <Typography>{(cell.getValue() as number).toFixed(2)} kes</Typography>
      },
      {
        accessorKey: 'customer.firstName', // Customer's first name (nested object)
        header: 'Customer First Name',
        size: 150
      },
      {
        accessorKey: 'customer.lastName', // Customer's last name (nested object)
        header: 'Customer Last Name',
        size: 150
      },
      // {
      //   accessorKey: 'TransactionProduct', // Transaction products (array of objects)
      //   header: 'Transaction Products',
      //   size: 250,
      //   // Cell: ({ cell }) => {
      //   //   const products = cell.getValue();
      //   //   return (
      //   //     <Box>
      //   //       {products?.map((product: any) => (
      //   //         <Typography key={product.TransactionProductId}>
      //   //           {product.productName} - Quantity: {product.quantity} - Price: {product.price}
      //   //         </Typography>
      //   //       ))}
      //   //     </Box>
      //   //   );
      //   // },
      // },
      {
        accessorKey: 'transactionDateCreated', // Transaction creation date
        header: 'Transaction Date',
        size: 200,
        Cell: ({ cell }) => new Date(cell.getValue() as string).toLocaleDateString()
      }
    ],
    []
  );

  // Create the Material React Table using the columns and data
  const table = useMaterialReactTable({
    columns,
    data: transactionData, // Use the data passed from the parent (Transaction)
    enableExpandAll: false, // Disable expand all button
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,210,244,0.1)' : 'rgba(0,0,0,0.1)'
      })
    }),
    // Custom expand button rotation
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), // Only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s'
      }
    }),
    // Conditionally render detail panel
    renderDetailPanel: ({ row }) => {
      const transaction = row.original;
      return transaction.TransactionProduct ? (
        <>
          <Typography variant="h6">Transaction Products:</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            {transaction.TransactionProduct.map((product: TransactionProduct) => (
              <div key={product.transactionId}>
                <Typography variant="body1">{product.productName}</Typography>
                <Typography variant="body1">Quantity: {product.quantity}</Typography>
                <Typography variant="body1">VAT: {product.VAT}</Typography>
                <Typography variant="body1">discount: {product.discount}</Typography>
                <Typography variant="body1">Price: {product.price}</Typography>
                <Typography variant="body1">subTotal cost: {product.productSubTotalCost}</Typography>
                <Typography variant="body1">Total cost: {product.productTotalCost}</Typography>
              </div>
            ))}
          </Box>
        </>
      ) : null;
    }
  });

  if (isError) {
    return <p>error fetching transactions. {JSON.stringify(error)}</p>;
  }

  if (isLoading) {
    <p> fetching transactions....</p>;
  }
  return <MaterialReactTable table={table} />;
};

export default TransactionTable;
