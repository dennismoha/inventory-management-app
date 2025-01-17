// import React, { useState } from 'react';

// // Sample mock data (abstracted from the data you provided)
// const mockData = {
//   totalSales: 62123.2,
//   transactions: [
//     {
//       transactionId: "cd2cc0e6-6d7f-44de-adb7-1e835deb49a6",
//       transactionDateCreated: "2024-12-28T20:28:07.071Z",
//       totalCost: 404.8,
//       paymentMethod: "cash",
//       subtotal: 400,
//       TransactionProduct: []
//     },
//     {
//       transactionId: "f5222017-1531-4514-b2e0-3ae2cefacb47",
//       transactionDateCreated: "2024-12-28T20:52:46.268Z",
//       totalCost: 600,
//       paymentMethod: "cash",
//       subtotal: 600,
//       TransactionProduct: [
//         {
//           productName: "Mwonga-Goat & Sheep Feed",
//           price: 200,
//           quantity: 3,
//           productTotalCost: 600,
//         }
//       ]
//     },
//     {
//       transactionId: "148fa56d-0714-4b4e-964c-362805351e44",
//       transactionDateCreated: "2024-12-28T20:55:25.978Z",
//       totalCost: 703.4,
//       paymentMethod: "cash",
//       subtotal: 700,
//       TransactionProduct: [
//         {
//           productName: "Mwonga-Goat & Sheep Feed",
//           price: 200,
//           quantity: 5,
//           productTotalCost: 1000,
//         },
//         {
//           productName: "AnimalNutra Co.-Dog Food - Adult Formula",
//           price: 200,
//           quantity: 1,
//           productTotalCost: 202.4,
//         }
//       ]
//     }
//   ]
// };

// const CardComponent = () => {
//   const [startDate, setStartDate] = useState("2024-12-01");
//   const [endDate, setEndDate] = useState("2024-12-31");

//   // Handler functions for date inputs
//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const transactions = mockData.transactions;
//   const totalSales = mockData.totalSales;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       {/* Title Section */}
//       <h2 className="text-3xl font-bold text-gray-800">Sales Summary</h2>
//       {/* <p className="text-lg text-gray-600 mt-2">
//         View total sales and transactions within the selected date range.
//       </p> */}

//       {/* Date Range Picker */}
//       <div className="flex space-x-4 mt-6">
//         <div className="flex flex-col">
//           <label htmlFor="startDate" className="text-sm text-gray-600 mb-1">Start Date</label>
//           <input
//             id="startDate"
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             className="px-4 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="endDate" className="text-sm text-gray-600 mb-1">End Date</label>
//           <input
//             id="endDate"
//             type="date"
//             value={endDate}
//             onChange={handleEndDateChange}
//             className="px-4 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//       </div>

//       {/* Total Sales */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold text-gray-800">Total Sales</h3>
//         <p className="text-2xl text-green-600">${totalSales.toFixed(2)}</p>
//       </div>

//       {/* Transaction List */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
//         <div className="overflow-y-auto max-h-72">
//           {transactions.map((transaction) => (
//             <div
//               key={transaction.transactionId}
//               className="bg-gray-50 p-4 mb-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
//             >
//               <h4 className="text-md font-semibold text-gray-700">
//                 {transaction.transactionId}
//               </h4>
//               <p className="text-sm text-gray-500">
//                 Date: {new Date(transaction.transactionDateCreated).toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Subtotal: ${transaction.subtotal.toFixed(2)} | Payment Method: {transaction.paymentMethod}
//               </p>
              
//               {/* Display Transaction Products */}
//               {transaction.TransactionProduct.length > 0 && (
//                 <div className="mt-2 text-sm">
//                   <h5 className="font-semibold text-gray-700">Products:</h5>
//                   {transaction.TransactionProduct.map((product, index) => (
//                     <div key={index} className="text-gray-600">
//                       <p>{product.productName}</p>
//                       <p>Price: ${product.price} x {product.quantity} = ${product.productTotalCost}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Example Usage of the CardComponent
// const App = () => {
//   return (
//     <div className="container mx-auto p-6">
//       <CardComponent />
//     </div>
//   );
// };

// export default App;




import { TransactionProductsBetweenDates } from '@/app/global/interfaces/sales';
import { useGetSalesProductsBetweenDatesQuery } from '@/app/redux/api/inventory-api';
import { SetStateAction, useState } from 'react';

const CardComponent = () => {
  const [startDate, setStartDate] = useState("2024-12-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  // Fetching transactions from API using RTK Query
  const { data: response, error, isLoading } =  useGetSalesProductsBetweenDatesQuery({ startDate, endDate },{
    skip: !startDate || !endDate, // Skip the query if either date is not provided
  });

  const defaultData: TransactionProductsBetweenDates = {
    totalSales: 0,
    transactions: [],
  };
  
  const data: TransactionProductsBetweenDates = response?.data ?? defaultData;
  console.log('sales product data is', data.totalSales)


  const handleStartDateChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEndDate(e.target.value);
  };

  // Check if data is still loading or if there's an error
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Assuming the response contains totalSales and transactions
  const totalSales = data?.totalSales || 0;
  const transactions = data?.transactions|| defaultData.transactions;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-gray-800">Sales Summary</h2>

      {/* Date Range Picker */}
      <div className="flex space-x-4 mt-6">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-sm text-gray-600 mb-1">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-sm text-gray-600 mb-1">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Total Sales */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Total Sales</h3>
        <p className="text-2xl text-green-600">${totalSales.toFixed(2)}</p>
      </div>

      {/* Transaction List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
        <div className="overflow-y-auto max-h-72">
          {transactions.map((transaction) => (
            <div
              key={transaction.transactionId}
              className="bg-gray-50 p-4 mb-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
            >
              <h4 className="text-md font-semibold text-gray-700">
                {transaction.transactionId}
              </h4>
              <p className="text-sm text-gray-500">
                Date: {new Date(transaction.transactionDateCreated!).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Subtotal: ${transaction.subtotal.toFixed(2)} | Payment Method: {transaction.paymentMethod}
              </p>
              
              {/* Display Transaction Products */}
              {transaction.TransactionProduct!.length > 0 && (
                <div className="mt-2 text-sm">
                  <h5 className="font-semibold text-gray-700">Products:</h5>
                  {transaction.TransactionProduct!.map((product, index) => (
                    <div key={index} className="text-gray-600">
                      <p>{product.productName}</p>
                      <p>Price: ${product.price} x {product.quantity} = ${product.productTotalCost}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
