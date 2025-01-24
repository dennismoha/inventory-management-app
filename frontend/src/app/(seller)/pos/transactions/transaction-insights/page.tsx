'use client'
import React, { useMemo, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    // ChartEvent
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement  // Registering the ArcElement for Pie charts
  );

  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';

  // Register chart.js elements
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );


import 'react-datepicker/dist/react-datepicker.css';
import { useGetTransactionsInsightsQuery } from '@/app/redux/api/inventory-api';
import { Transaction } from '../interfaces/transactions-interface';


// Helper Functions
const groupByDate = (transactions: Transaction[]) => {
    return transactions.reduce((acc: {[key:string]: number}, transaction) => {
      const date = new Date(transaction.transactionDateCreated).toLocaleDateString();
      acc[date] = acc[date] ? acc[date] + transaction.totalCost : transaction.totalCost;
      return acc;
    }, {});
  };
  
  const getSupplierSalesData = (transactions: Transaction[]) => {
    const supplierSales: {[key:string]: number} = {};
    transactions.forEach((transaction) => {
      transaction.TransactionProduct.forEach((product) => {
        const supplier = product.supplierProduct!.supplier!.name;
        if (supplierSales[supplier]) {
          supplierSales[supplier] += product.productTotalCost!;
        } else {
          supplierSales[supplier] = product.productTotalCost!;
        }
      });
    });
    return supplierSales;
  };
  
  const getPaymentMethodData = (transactions: Transaction[]) => {
    const paymentMethods = transactions.reduce((acc: {[key:string]: number}, transaction) => {
      const paymentMethod = transaction.paymentMethod;
      acc[paymentMethod] = acc[paymentMethod] ? acc[paymentMethod] + transaction.totalCost : transaction.totalCost;
      return acc;
    }, {});
    return paymentMethods;
  };
  
//   const getProductSalesData = (transactions) => {
//     const productSales = {};
//     transactions.forEach((transaction) => {
//       transaction.TransactionProduct.forEach((product) => {
//         const productName = product.productName;
//         if (productSales[productName]) {
//           productSales[productName] += product.productTotalCost;
//         } else {
//           productSales[productName] = product.productTotalCost;
//         }
//       });
//     });
//     return productSales;
//   };
  



// Function to filter transactions based on date range
const filterTransactionsByDate = (transactions: Transaction[], startDate: Date, endDate: Date) => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.transactionDateCreated);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

const getSupplierSalesByCustomer = (transactions: Transaction[]) => {
    const customerSupplierSales: {[key:string]: {[key : string]: number}} = {};
  
    transactions.forEach((transaction) => {
      const customerId = `${transaction.customer!.firstName} ${transaction.customer!.lastName}`;
      
      transaction.TransactionProduct.forEach((product) => {
        const supplierName = product.supplierProduct!.supplier!.name;
  
        if (!customerSupplierSales[customerId]) {
          customerSupplierSales[customerId] = {};
        }
        
        if (customerSupplierSales[customerId][supplierName]) {
          customerSupplierSales[customerId][supplierName] += product.productTotalCost!;
        } else {
          customerSupplierSales[customerId][supplierName] = product.productTotalCost!;
        }
      });
    });
  
    return customerSupplierSales;
  };

// Function to calculate customer spending data
const getCustomerSpendingData = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    customerName: `${transaction.customer!.firstName} ${transaction.customer!.lastName}`,
    totalSpent: transaction.totalCost,
  }));
};

// Function to calculate product sales data
const getProductSalesData = (transactions: Transaction[]) => {
  const productSales:{[key:string]: number} = {};
  transactions.forEach((transaction) => {
    transaction.TransactionProduct.forEach((product) => {
      if (productSales[product.productName]) {
        productSales[product.productName] += product.quantity;
      } else {
        productSales[product.productName] = product.quantity;
      }
    });
  });
  return Object.keys(productSales).map((productName) => ({
    productName,
    totalSales: productSales[productName],
  }));
};

// Function to get sorted transactions (from highest to lowest)
const getSortedTransactions = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => b.totalCost - a.totalCost);
};

// Function to sum transactions per day
const sumTransactionsPerDay = (transactions: Transaction[]) => {
    const dailyTotal = transactions.reduce((acc: {[key:string]: number}, transaction) => {
      const date = new Date(transaction.transactionDateCreated).toLocaleDateString(); // Get date only (ignore time)
      if (acc[date]) {
        acc[date] += transaction.totalCost;
      } else {
        acc[date] = transaction.totalCost;
      }
      return acc;
    }, {});
  
    return Object.keys(dailyTotal).map(date => ({
      date,
      total: dailyTotal[date],
    }));
  };

  // Function to count the number of transactions per day
const countTransactionsPerDay = (transactions: Transaction[]) => {
    const dailyCount = transactions.reduce((acc:{[key:string]: number}, transaction) => {
      const date = new Date(transaction.transactionDateCreated).toLocaleDateString(); // Get date only (ignore time)
      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {});
  
    return Object.keys(dailyCount).map(date => ({
      date,
      count: dailyCount[date],
    }));
  };
  
  // Function to count supplier appearances in transactions
const countSupplierAppearances = (transactions: Transaction[]) => {
    const supplierCount = transactions.reduce((acc:{[key:string]: number}, transaction) => {
      transaction.TransactionProduct.forEach((product) => {
        const supplierName = product?.supplierProduct!.supplier!.name;
        if (acc[supplierName]) {
          acc[supplierName] += 1;
        } else {
          acc[supplierName] = 1;
        }
      });
      return acc;
    }, {});
  
    return Object.keys(supplierCount).map(supplier => ({
      supplier,
      count: supplierCount[supplier],
    }));
  };

// Function to count supplier products and summarize their sales
const countSupplierProductSales = (transactions: Transaction[]) => {

    const supplierSales = transactions.reduce((acc: { [key: string]: { supplierName: string, totalQuantity: number } }, transaction) => {
      transaction.TransactionProduct!.forEach((product) => {
        const supplierId = product?.supplierProduct!.supplier!.supplier_id;
        // const productName = product.productName;
        const quantity = product.quantity;
  
        if (!acc[supplierId]) {
          acc[supplierId] = { supplierName: product.supplierProduct!.supplier!.name, totalQuantity: 0 };
        }
  
        acc[supplierId].totalQuantity += quantity;
      });
      return acc;
    }, {});
  
    return Object.keys(supplierSales).map((supplierId) => ({
      supplierName: supplierSales[supplierId].supplierName,
      totalQuantity: supplierSales[supplierId].totalQuantity,
    }));
  };


// Helper Function to get the Customer who bought the most products from a Supplier
const getTopCustomerPerSupplier = (transactions: Transaction[]) => {
    const supplierCustomerQuantity:  { [key: string]: { [key: string]: number } }  = {};
    
    transactions.forEach((transaction) => {

      transaction.TransactionProduct?.forEach((product) => {
        const supplierName:  string  = product.supplierProduct!.supplier!.name;
        const customerName = `${transaction.customer!.firstName} ${transaction.customer!.lastName}`;
        const productQuantity = product.quantity;
  
        // Initialize supplier if not already in the object
        if (!supplierCustomerQuantity[supplierName]) {
          supplierCustomerQuantity[supplierName] = {};
        }
  
        // Add product quantity for the customer
        if (supplierCustomerQuantity[supplierName][customerName]) {
          supplierCustomerQuantity[supplierName][customerName] += productQuantity;
        } else {
          supplierCustomerQuantity[supplierName][customerName] = productQuantity;
        }
      });
    });
  
    // Find the customer with the most quantity per supplier
    const topCustomerPerSupplier: {[key:string]: {customer: string, quantity: number}} = {};
    for (const supplier in supplierCustomerQuantity) {
      let maxQuantity = 0;
      let topCustomer = '';
      
      for (const customer in supplierCustomerQuantity[supplier]) {
        if (supplierCustomerQuantity[supplier][customer] > maxQuantity) {
          maxQuantity = supplierCustomerQuantity[supplier][customer];
          topCustomer = customer;
        }
      }
      
      topCustomerPerSupplier[supplier] = {
        customer: topCustomer,
        quantity: maxQuantity
      };
    }
  
    return topCustomerPerSupplier;
  };



type prods = {
  productName: string,
  quantity: number, 
 
}


  const getSupplierWithMostProductsForCustomer = (transactions: Transaction[]) => {
    const customerSupplierQuantity: {[key:string]: {[key: string]:{totalQuantity: number, products:prods[] }}} = {};
  
    transactions.forEach((transaction) => {
      const customerName = `${transaction.customer!.firstName} ${transaction.customer!.lastName}`;
      transaction.TransactionProduct.forEach((product) => {
        const supplierName = product.supplierProduct!.supplier!.name;
        const quantity = product.quantity;
  
        // Initialize the customer in the object if not already present
        if (!customerSupplierQuantity[customerName]) {
          customerSupplierQuantity[customerName] = {};
        }
  
        // Initialize the supplier for that customer
        if (!customerSupplierQuantity[customerName][supplierName]) {
          customerSupplierQuantity[customerName][supplierName] = {
            totalQuantity: 0,
            products: []
          };
        }
  
        // Add the product quantity to the supplier
        customerSupplierQuantity[customerName][supplierName].totalQuantity += quantity;
  
        // Add the product details to the supplier's products list for that customer
        customerSupplierQuantity[customerName][supplierName].products.push({
          productName: product.productName,
          quantity,
        });
      });
    });

    type topSupplierPerCustomerProducts = prods
  
    // Find the supplier with the most products for each customer. supplier whose products were bought by many customers
    const topSupplierPerCustomer:   {[key: string]:  {supplier: string, totalQuantity: number,productsSold:topSupplierPerCustomerProducts[]}} = {};
  
    for (const customerName in customerSupplierQuantity) {
      let maxQuantity = 0;
      let topSupplier = '';
    
      let productsSold :topSupplierPerCustomerProducts[] = []
  
      for (const supplierName in customerSupplierQuantity[customerName]) {
        const supplierData = customerSupplierQuantity[customerName][supplierName];
        if (supplierData.totalQuantity > maxQuantity) {
          maxQuantity = supplierData.totalQuantity;
          topSupplier = supplierName;
          
          productsSold = supplierData.products;
        }
      }
  
      topSupplierPerCustomer[customerName] = {
        supplier: topSupplier,
        totalQuantity: maxQuantity,
        productsSold,
      };
    }
  
    return topSupplierPerCustomer;
  };
  

  

const Dashboard = () => {
  // State for date range filter
  const [startDate, setStartDate] = useState<Date>(new Date('2025-01-21')); // default start date
  const [endDate, setEndDate] = useState<Date>(new Date('2025-01-22')); // default end date

  const {data:response, isLoading, isError} = useGetTransactionsInsightsQuery({ startDate: formatDate(startDate), endDate: formatDate(endDate) },
    {
      skip: !startDate || !endDate, // Skip the query if either date is not provided
    })
  const transactionData = response?.data.transactions ?? [];
  const totalSales = response?.data.totalSales?? 0

  console.log('transaction data is ', response?.data)

  function formatDate(inputDateStr: Date) {
    const inputDate = new Date(inputDateStr);
  
    // Get the year, month, and day
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(inputDate.getDate()).padStart(2, '0');
  
    // Return the formatted date
    return `${year}-${month}-${day}`;
  }
  
  

  // State for selected transaction details
  // const [selectedTransaction, setSelectedTransaction] = useState(null);

  // console.log('____=====______ selectedTransaction ', selectedTransaction)

  const filteredTransactionss: Transaction[] = useMemo(() => 
    transactionData.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDateCreated!);
      return transactionDate >= startDate && transactionDate <= endDate;
    }), [startDate, endDate]
  );


  if(isLoading) {
    return <p>transactions loadding ....</p>
}

if(isError) {
    return <p>Error fetching transactions </p>
}

  // Get the top customer for each supplier
  const topCustomerPerSupplier = getTopCustomerPerSupplier(filteredTransactionss);

  // Prepare chart data
  const supplierNames = Object.keys(topCustomerPerSupplier);
  const customerNames = supplierNames.map(supplier => topCustomerPerSupplier[supplier].customer);
  const quantitiess = supplierNames.map(supplier => topCustomerPerSupplier[supplier].quantity);

  const topCustomerChartData = {
    labels: supplierNames,
    datasets: [{
      label: 'Top Customer by Supplier',
      data: quantitiess,
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
      borderWidth: 1,
    }],
  };

  const topSupplierPerCustomer = getSupplierWithMostProductsForCustomer(filteredTransactionss);

  // Prepare chart data for top supplier per customer
  const customerNamess = Object.keys(topSupplierPerCustomer);
 // const suppliers = customerNamess.map(name => topSupplierPerCustomer[name].supplier);
  const quantities = customerNamess.map(name => topSupplierPerCustomer[name].totalQuantity);

  const supplierCustomerChartData = {
    labels: customerNames,
    datasets: [{
      label: 'Top Supplier per Customer',
      data: quantities,
      backgroundColor: '#FFCE56',
      borderColor: '#FFCE56',
      borderWidth: 1,
    }],
  };

  // Filtered transactions
  const filteredTransactions = filterTransactionsByDate(transactionData, startDate, endDate);

  // Sorted transactions based on total cost (highest to lowest)
  const sortedTransactions = getSortedTransactions(filteredTransactions);

  // Calculate customer spending data
  const customerSpendingData = getCustomerSpendingData(filteredTransactions);

  // Calculate product sales data
  const productSalesData = getProductSalesData(filteredTransactions);

  // Bar Chart Data for Customer Spending
  const customerSpendingChartData = {
    labels: customerSpendingData.map((data) => data.customerName),
    datasets: [{
      label: 'Total Spending ($)',
      data: customerSpendingData.map((data) => data.totalSpent),
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };

  // Bar Chart Data for Product Sales
  const productSalesChartData = {
    labels: productSalesData.map((data) => data.productName),
    datasets: [{
      label: 'Sales Quantity',
      data: productSalesData.map((data) => data.totalSales),
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
      hoverBackgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
    }],
  };

  // Sorted Transactions Bar Chart Data
  const sortedTransactionsChartData = {
    labels: sortedTransactions.map((transaction) => transaction.transactionId),
    datasets: [{
      label: 'Transaction Total Cost ($)',
      data: sortedTransactions.map((transaction) => transaction.totalCost),
      backgroundColor: ['#FF5733', '#36A2EB', '#FF9F40', '#FF6384'],
      hoverBackgroundColor: ['#FF5733', '#36A2EB', '#FF9F40', '#FF6384'],
    }],
  };

  // Handle click on a transaction in the sorted transactions chart
  // const handleTransactionClick = (e: ChartEvent | { index: never; }[]) => {
  //   const clickedIndex = e[0]?.index;
  //   if (clickedIndex !== undefined) {
  //     setSelectedTransaction(sortedTransactions[clickedIndex]);
  //   }
  // };

   // Summed transactions per day
   const dailyTransactions = sumTransactionsPerDay(filteredTransactions);

   // Bar Chart Data for Daily Transactions
   const dailyTransactionsChartData = {
     labels: dailyTransactions.map((data) => data.date),
     datasets: [{
       label: 'Total Transactions ($)',
       data: dailyTransactions.map((data) => data.total),
       backgroundColor: '#FF5733',
       hoverBackgroundColor: '#FF9F40',
     }],
   };

     // Count transactions per day
  const dailyTransactionCount = countTransactionsPerDay(filteredTransactions);

    // Bar Chart Data for Daily Transaction Counts
  const dailyTransactionCountChartData = {
    labels: dailyTransactionCount.map((data) => data.date),
    datasets: [{
      label: 'Transaction Count',
      data: dailyTransactionCount.map((data) => data.count),
      backgroundColor: '#4BC0C0',
      hoverBackgroundColor: '#36A2EB',
    }],
  };

   // Count supplier appearances
   const supplierAppearances = countSupplierAppearances(filteredTransactions);

   // Bar Chart Data for Supplier Appearances
   const supplierAppearanceChartData = {
     labels: supplierAppearances.map((data) => data.supplier),
     datasets: [{
       label: 'Supplier Appearances in Transactions',
       data: supplierAppearances.map((data) => data.count),
       backgroundColor: '#FF6384',
       hoverBackgroundColor: '#FFCE56',
     }],
   };

     // Summarize supplier product sales
  const supplierProductSales = countSupplierProductSales(filteredTransactions);

  // Bar Chart Data for Supplier Product Sales
  const supplierProductSalesChartData = {
    labels: supplierProductSales.map((data) => data.supplierName),
    datasets: [{
      label: 'Total Products Sold',
      data: supplierProductSales.map((data) => data.totalQuantity),
      backgroundColor: '#FF6384',
      hoverBackgroundColor: '#FFCE56',
    }],
  }

//   const filteredTransactions = useMemo(() => 
//     transactionData.filter((transaction) => {
//       const transactionDate = new Date(transaction.transactionDateCreated);
//       return transactionDate >= startDate && transactionDate <= endDate;
//     }), [startDate, endDate]
//   );

  // Product Sales Data
//   const productSalesData = getProductSalesData(filteredTransactions);
//   const productSalesChartData = {
//     labels: Object.keys(productSalesData),
//     datasets: [{
//       label: 'Total Sales per Product',
//       data: Object.values(productSalesData),
//       backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
//     }]
//   };

  // Payment Method Breakdown
  const paymentMethodData = getPaymentMethodData(filteredTransactions);
  const paymentMethodChartData = {
    labels: Object.keys(paymentMethodData),
    datasets: [{
      data: Object.values(paymentMethodData),
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
    }]
  };

  // Supplier Sales Data
  const supplierSalesData = getSupplierSalesData(filteredTransactions);
  const supplierSalesChartData = {
    labels: Object.keys(supplierSalesData),
    datasets: [{
      label: 'Sales per Supplier',
      data: Object.values(supplierSalesData),
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
    }]
  };

  // Date-based Sales Data (per day)
  const salesPerDay = groupByDate(filteredTransactions);
  const dateSalesChartData = {
    labels: Object.keys(salesPerDay),
    datasets: [{
      label: 'Total Sales per Day',
      data: Object.values(salesPerDay),
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
    }]
  };

  // Region-Based Breakdown (example)
  const regionData = filteredTransactions.reduce((acc: {[key: string]: number}, transaction) => {
    const region = transaction.customer!.country!; // Assuming country is used for region
    acc[region] = acc[region] ? acc[region] + transaction.totalCost : transaction.totalCost;
    return acc;
  }, {});
  const regionChartData = {
    labels: Object.keys(regionData),
    datasets: [{
      label: 'Sales per Region',
      data: Object.values(regionData),
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
    }]
  };

      // Supplier Sales by Customer Data
const customerSupplierSalesData = getSupplierSalesByCustomer(filteredTransactions);

const customerSupplierChartData = {
      labels: Object.keys(customerSupplierSalesData),
      datasets: Object.entries(customerSupplierSalesData).map(([customer, suppliers]) => ({
        label: customer,
        data: Object.values(suppliers),
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
        hoverBackgroundColor: '#FF6384',
      })),
    };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Date Range Picker */}
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-semibold mr-4">Filter by Date</h3>
        <DatePicker
          selected={startDate}
         //onChange={(date) => setStartDate(date)}
          onChange={(date: Date | null) => {
            if (date !== null) {
              setStartDate(date);  // Only update if date is valid (not null)
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="p-2 border rounded"
          dateFormat="yyyy/MM/dd"
        />
        <span className="mx-4">to</span>
        <DatePicker
          selected={endDate}
          //onChange={(date) => setEndDate(date)}
          onChange={(date: Date | null) => {
            if (date !== null) {
              setEndDate(date);  // Only update if date is valid (not null)
            }
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="p-2 border rounded"
          dateFormat="yyyy/MM/dd"
        />
          <span className="mx-4">total-sales</span>
       <p> {totalSales}</p>
      </div>

      {/* Dashboard Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Customer Spending</h3>
          <Bar data={customerSpendingChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Top Product Sales</h3>
          <Bar data={productSalesChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Sorted Transactions (Highest to Lowest)</h3>
          {/* <Bar data={sortedTransactionsChartData} options={{ onClick: (e) => handleTransactionClick(e) }} /> */}
          <Bar data={sortedTransactionsChartData} />
        </div>
      </div>

      {/* Detailed Transaction Table */}
      {/* Detailed Transaction Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold">Transaction Details</h3>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total Cost</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">Suppliers</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transactionId} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{transaction.transactionId}</td>
                  <td className="px-4 py-2">
                    {transaction.customer!.firstName} {transaction.customer!.lastName}
                    <div>{transaction.customer!.email}</div>
                    <div>{transaction.customer!.phoneNumber}</div>
                  </td>
                  <td className="px-4 py-2">${transaction.totalCost}</td>
                  <td className="px-4 py-2">{transaction.paymentMethod}</td>
                  <td className="px-4 py-2">
                    {transaction.TransactionProduct.map((product, idx) => (
                      <div key={idx}>
                        {product.quantity} x {product.productName} - ${product.productTotalCost}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    {transaction.TransactionProduct.map((product, idx) => (
                      <div key={idx}>
                        Supplier: {product.supplierProduct?.supplier!.name}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Dashboard Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Transactions per Day</h3>
          <Bar data={dailyTransactionsChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Transactions per Day (Count)</h3>
          <Bar data={dailyTransactionCountChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Supplier Appearances in Transactions</h3>
          <Bar data={supplierAppearanceChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Supplier Product Sales</h3>
          <Bar data={supplierProductSalesChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Product Sales</h3>
          <Bar data={productSalesChartData} />
        </div> */}

         {/* Payment Method Chart */}
         <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Payment Method Breakdown</h3>
          <Pie data={paymentMethodChartData} />
        </div>

        {/* Supplier Sales Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Supplier Sales</h3>
          <Bar data={supplierSalesChartData} />
        </div>
         {/* Date-Based Sales Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold">Sales per Day</h3>
        <Bar data={dateSalesChartData} />
      </div>

      {/* Region-Based Breakdown Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold">Sales per Region</h3>
        <Pie data={regionChartData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Supplier Breakdown per Customer</h3>
          <Bar data={customerSupplierChartData} />
        </div>
      
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">top Customer chart data</h3>
          <Bar data={topCustomerChartData} />
        </div>
      </div>
      

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Transactions per Day (Count)</h3>
          <Bar data={dailyTransactionCountChartData} />
        </div>
      </div> */}
        {/* Display Customer and Product Data */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold">Top Customers and Their Purchased Quantities</h3>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Top Customer</th>
              <th className="px-4 py-2">Total Quantity Purchased</th>
            </tr>
          </thead>
          <tbody>
            {supplierNames.map((supplier, index) => (
              <tr key={supplier} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{supplier}</td>
                <td className="px-4 py-2">{customerNames[index]}</td>
                <td className="px-4 py-2">{quantities[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Dashboard Overview Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Top Supplier per Customer */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Top Supplier per Customer</h3>
          <Bar data={supplierCustomerChartData} />
        </div>
      </div>
        {/* Display Customer, Supplier, and Product Data */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold">Top Supplier and Products Sold</h3>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Total Quantity</th>
              <th className="px-4 py-2">Products Sold</th>
            </tr>
          </thead>
          <tbody>
            {customerNames.map((customerName) => {
              const { supplier, totalQuantity, productsSold } = topSupplierPerCustomer[customerName];
              return (
                <tr key={customerName} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{customerName}</td>
                  <td className="px-4 py-2">{supplier}</td>
                  <td className="px-4 py-2">{totalQuantity}</td>
                  <td className="px-4 py-2">
                    {productsSold.map((product, index) => (
                      <div key={index}>{`${product.quantity} x ${product.productName}`}</div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
