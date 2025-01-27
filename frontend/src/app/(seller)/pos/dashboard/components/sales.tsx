// import { SalesResponse } from '@/app/global/interfaces/sales';
// import { useGetTotalSalesQuery } from '@/app/redux/api/inventory-api';
// import React from 'react';
//  // Adjust path accordingly

// const TotalSales = () => {
//   const { data: response, error, isLoading } = useGetTotalSalesQuery();
//   const salesData: SalesResponse = response?.data ?? 0
// console.log('data is ', salesData)
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {JSON.stringify(error)}</div>;

//   return (
//     <div>
//       <h1>Total Sales:{salesData}</h1>
//     </div>
//   );
// };

// export default TotalSales;

import { SalesResponse } from '@/app/global/interfaces/sales';
import { useGetTotalSalesQuery } from '@/app/redux/api/inventory-api';
import React from 'react';

const TotalSales = () => {
  const { data: response, error, isLoading } = useGetTotalSalesQuery();
  const salesData: SalesResponse = response?.data ?? 0;

  console.log('data is ', salesData);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold text-red-500">Error: {JSON.stringify(error)}</div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Dashboard Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Total Sales</h1>
          <p className="mt-2 text-xl text-gray-700">
            <span className="font-bold text-green-500">${salesData.toLocaleString()}</span>
          </p>
        </div>
        {/* <div className="px-6 py-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Refresh
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TotalSales;
