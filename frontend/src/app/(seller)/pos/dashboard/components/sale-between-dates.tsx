import { SalesResponse } from '@/app/global/interfaces/sales';
import { useGetSalesBetweenDatesQuery } from '@/app/redux/api/inventory-api';
import React, { useState } from 'react';


const SalesByDateRange = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Trigger the RTK query hook for fetching sales data
  const { data: response, error, isLoading } =  useGetSalesBetweenDatesQuery(
    { startDate, endDate },
    {
      skip: !startDate || !endDate, // Skip the query if either date is not provided
    }
  );

    const salesData: SalesResponse = response?.data ?? 0;


  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

//   const handleFetchSales = () => {
//     if (!startDate || !endDate) {
//       alert('Please provide both start and end dates.');
//     }
//   };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Dashboard Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Sales Between Dates</h1>
          
          {/* Date Range Inputs */}
          <div className="mt-4">
            <div className="flex space-x-4">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              {/* <button
                onClick={handleFetchSales}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Fetch Sales
              </button> */}
            </div>
          </div>

          {/* Sales Data */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Sales Data</h2>
            <div className="mt-2 text-lg text-gray-700">
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <p className="text-red-500">{(error as any)?.message}</p>
              ) : (
                <p>Total Sales:  
                  <span className="font-bold text-green-500">
                    {salesData ? `kes ${salesData.toLocaleString()}` : '0.00'}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesByDateRange;









// import React, { useState } from 'react';

// const SalesByDateRange = () => {
//   // State for the start and end date, and sales data
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [salesData, setSalesData] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Simulate sales data fetching
//   const fetchSalesData = async (start: string, end: string) => {
//     setIsLoading(true);
//     setError(null);

//     // Simulate a delay for fetching data (e.g., API call)
//     setTimeout(() => {
//       // Sample data: total sales for a given date range
//       if (start && end) {
//         setSalesData(Math.random() * 10000); // Random sales value for demonstration
//       } else {
//         setError('Please provide both start and end date.');
//       }

//       setIsLoading(false);
//     }, 1000); // 1-second delay to simulate loading
//   };

//   // Handle start date change
//   const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setStartDate(e.target.value);
//   };

//   // Handle end date change
//   const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEndDate(e.target.value);
//   };

//   // Handle the "Fetch Sales" button click
//   const handleFetchSales = () => {
//     if (startDate && endDate) {
//       fetchSalesData(startDate, endDate);
//     } else {
//       setError('Please provide both start and end date.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Dashboard Card */}
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="px-6 py-4">
//           <h1 className="text-2xl font-semibold text-gray-900">Sales Between Dates</h1>
          
//           {/* Date Range Inputs */}
//           <div className="mt-4">
//             <div className="flex space-x-4">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               />
//               <button
//                 onClick={handleFetchSales}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
//               >
//                 Fetch Sales
//               </button>
//             </div>
//           </div>

//           {/* Sales Data */}
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold text-gray-900">Sales Data</h2>
//             <div className="mt-2 text-lg text-gray-700">
//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : error ? (
//                 <p className="text-red-500">{error}</p>
//               ) : (
//                 <p>Total Sales: 
//                   <span className="font-bold text-green-500">
//                     {salesData ? `$${salesData.toFixed(2)}` : '0.00'}
//                   </span>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* <div className="px-6 py-3 bg-gray-50">
//           <div className="flex justify-between items-center">
//             <div className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default SalesByDateRange;
