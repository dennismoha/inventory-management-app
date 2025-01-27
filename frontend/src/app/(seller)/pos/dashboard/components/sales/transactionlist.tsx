import { TransactionProductsBetweenDates } from '@/app/global/interfaces/sales';
import React from 'react';

interface ChildComponentProps {
  data: TransactionProductsBetweenDates;
  startDate: string;
  endDate: string;
  // eslint-disable-next-line no-unused-vars
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionList: React.FC<ChildComponentProps> = ({ data, startDate, endDate, handleStartDateChange, handleEndDateChange }) => {
  const transactions = data.transactions;
  const totalSales = data.totalSales;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-gray-800">Sales Summary</h2>

      {/* Date Range Picker */}
      <div className="flex space-x-4 mt-6">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-sm text-gray-600 mb-1">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-sm text-gray-600 mb-1">
            End Date
          </label>
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
              <h4 className="text-md font-semibold text-gray-700">{transaction.transactionId}</h4>
              <p className="text-sm text-gray-500">Date: {new Date(transaction.transactionDateCreated!).toLocaleString()}</p>
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
                      <p>
                        Price: ${product.price} x {product.quantity} = ${product.productTotalCost}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* {data.transactions.length  >0 ? <SalesProductsBetweenDatesChart TransactionProductsBetweenDates={data} />: <p>no data</p>} */}
        {/* {isLoading ? <p>loading....</p>:  <SalesProductsBetweenDatesChart data={data} /> } */}
      </div>
    </div>
  );
};

export default TransactionList;
