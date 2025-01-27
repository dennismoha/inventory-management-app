'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useGetInventoryItemsInsightQuery } from '@/app/redux/api/inventory-api';
import { InventoryItem, InventoryRestock, InventorySalesTracking } from '../interfaces/inventory-interface';
import { TransactionProduct } from '@/app/(seller)/pos/transactions/interfaces/transactions-interface';

// Registering the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface InventoryItemProps {
  item: InventoryItem; // Expecting an `item` prop of type `InventoryItem`
}

const InventoryDetails = () => {
  const itemsPerPage = 5; // Number of items per page
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: response, isLoading, isError } = useGetInventoryItemsInsightQuery();

  console.log('_____response for the inventory list i s', response);

  const data = response?.data ?? [];

  // Filter the data based on search query
  const filteredData = data.filter(
    (item) =>
      item.supplierProduct?.product!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierProduct?.product!.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get items for the current page
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search is changed
  };

  const handleToggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (isLoading) return <div>loading....</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Product Name or Description..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-600">Found {filteredData.length} items</p>
        </div>
      </div>

      {/* Inventory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((item, index) => (
          <div
            key={index}
            className={`p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-all ease-in-out duration-300 ${
              expandedIndex === index ? 'col-span-4' : ''
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Information</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <strong>Inventory ID:</strong> {item.inventoryId}
              </div>
              <div>
                <strong>Product Name:</strong> {item.supplierProduct?.product!.name}
              </div>
              <div>
                <strong>Description:</strong> {item.supplierProduct.product.description}
              </div>
              <div>
                <strong>Category:</strong> {item.supplierProduct.product.category_id}
              </div>
              <div>
                <strong>Supplier:</strong> {item.supplierProduct.supplier.name}
              </div>
              <div>
                <strong>Unit:</strong> {item.unit.unit}
              </div>
              <div>
                <strong>Stock Quantity:</strong> {item.stock_quantity}
              </div>
            </div>

            {/* Show/Hide Details Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => handleToggleDetails(index)}
            >
              {expandedIndex === index ? 'Hide Details' : 'Show Details'}
            </button>

            {/* If the card is expanded, show extra details */}
            {expandedIndex === index && (
              <div className="mt-6 space-y-4">
                <Tabs>
                  <Tab label="Product Info">
                    <ProductInfo item={item} />
                  </Tab>

                  <Tab label="Supplier Product Details">
                    <SupplierProductDetails item={item} />
                  </Tab>

                  <Tab label="Inventory Sales Tracking">
                    <InventorySalesTrackings item={item} />
                    <InventorySalesTrackingGraphSection
                      data={item.InventorySalesTracking ? item.InventorySalesTracking : []}
                      label="Sales Tracking"
                    />
                  </Tab>

                  <Tab label="Inventory Restock">
                    <InventoryRestocks item={item} />
                    <InventoryRestockGraphSection data={item.InventoryRestock ? item.InventoryRestock : []} label="Restock Tracking" />
                  </Tab>

                  <Tab label="Transaction Products">
                    <TransactionProducts item={item} />
                    <TransactionProductGraphSection
                      data={item.TransactionProduct ? item.TransactionProduct : []}
                      label="Transaction Data"
                    />
                  </Tab>
                </Tabs>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Graph Section Component
// const GraphSection = ({ data, label }: { data: InventorySalesTracking[] | InventoryRestock[] | TransactionProduct[] ; label: string }) => {
//   const chartData = {
//     labels: data.map((item) => new Date(item.restock_date).toLocaleDateString()), // Using createdAt as time dimension
//     datasets: [
//       {
//         label: label,
//         data: data.map((item) => item.new_stock_quantity || item.old_stock_quantity), // Quantity to be graphed
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true
//       }
//     ]
//   };

//   return (
//     <div className="mt-6">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">{label} Graph</h3>
//       <Line data={chartData} />
//     </div>
//   );
// };

// Graph Section Component
const TransactionProductGraphSection = ({ data, label }: { data: TransactionProduct[]; label: string }) => {
  const chartData = {
    labels: data.map((item) => new Date(item.createdAt).toLocaleDateString()), // Using createdAt as time dimension
    datasets: [
      {
        label: label,
        data: data.map((item) => item.productTotalCost), // Quantity to be graphed
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{label} Graph</h3>
      <Line data={chartData} />
    </div>
  );
};

const InventorySalesTrackingGraphSection = ({ data, label }: { data: InventorySalesTracking[]; label: string }) => {
  const chartData = {
    labels: data.map((item) => new Date(item.restock_date).toLocaleDateString()), // Using createdAt as time dimension
    datasets: [
      {
        label: label,
        data: data.map((item) => item.new_stock_quantity || item.old_stock_quantity), // Quantity to be graphed
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{label} Graph</h3>
      <Line data={chartData} />
    </div>
  );
};

const InventoryRestockGraphSection = ({ data, label }: { data: InventoryRestock[]; label: string }) => {
  const chartData = {
    labels: data.map((item) => new Date(item.restock_date).toLocaleDateString()), // Using createdAt as time dimension
    datasets: [
      {
        label: label,
        data: data.map((item) => item.new_stock_quantity), // Quantity to be graphed
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{label} Graph</h3>
      <Line data={chartData} />
    </div>
  );
};

interface TabsProps {
  children: React.ReactElement[]; // This ensures `children` is an array of React elements (Tabs)
}
// Tab Container Component
const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 border-b border-gray-300 pb-2">
        {children.map((child) => (
          <button
            key={child.props.label}
            onClick={() => setActiveTab(child.props.label)}
            className={`text-lg font-medium px-4 py-2 ${activeTab === child.props.label ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {children.map((child) => (activeTab === child.props.label ? <div key={child.props.label}>{child.props.children}</div> : null))}
      </div>
    </div>
  );
};

// Tab Component
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const Tab = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return <>{children}</>;
};

// Product Info Component (unchanged)
const ProductInfo: React.FC<InventoryItemProps> = ({ item }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div>
      <strong>Inventory ID:</strong> {item.inventoryId}
    </div>
    <div>
      <strong>Product Name:</strong> {item.supplierProduct.product.name}
    </div>
    <div>
      <strong>Description:</strong> {item.supplierProduct.product.description}
    </div>
    <div>
      <strong>Category:</strong> {item.supplierProduct.product.category_id}
    </div>
    <div>
      <strong>Supplier:</strong> {item.supplierProduct.supplier.name}
    </div>
    <div>
      <strong>Unit:</strong> {item.unit.unit}
    </div>
    <div>
      <strong>Stock Quantity:</strong> {item.stock_quantity}
    </div>
  </div>
);

// Supplier Product Details Component
const SupplierProductDetails: React.FC<InventoryItemProps> = ({ item }) => (
  <div className="space-y-4">
    <div className="text-lg font-semibold">Supplier Product Details</div>
    <div>
      <strong>Supplier Product ID:</strong> {item.supplierProduct.supplier_products_id}
    </div>
    <div>
      <strong>Supplier ID:</strong> {item.supplierProduct.supplier_id}
    </div>
    <div>
      <strong>Product ID:</strong> {item.supplierProduct.product_id}
    </div>
    <div>
      <strong>Product Name:</strong> {item.supplierProduct.product.name}
    </div>
    <div>
      <strong>Description:</strong> {item.supplierProduct.product.description}
    </div>
    <div>
      <strong>SKU:</strong> {item.supplierProduct.product.sku}
    </div>
    <div>
      <strong>Price:</strong> {item.supplierProduct?.ProductPricing!.price}
    </div>
    <div>
      <strong>VAT:</strong> {item.supplierProduct?.ProductPricing!.VAT}
    </div>
    <div>
      <strong>Discount:</strong> {item.supplierProduct?.ProductPricing!.discount}
    </div>
    <div>
      <strong>Effective Date:</strong> {new Date(item.supplierProduct?.ProductPricing!.effective_date).toLocaleDateString()}
    </div>
    <div>
      <strong>Supplier Name:</strong> {item.supplierProduct.supplier.name}
    </div>
    <div>
      <strong>Supplier Address:</strong> {item.supplierProduct.supplier.address}
    </div>
    <div>
      <strong>Supplier Contact:</strong> {item.supplierProduct.supplier.contact}
    </div>
  </div>
);

// Inventory Sales Tracking Component (unchanged)
const InventorySalesTrackings: React.FC<InventoryItemProps> = ({ item }) => (
  <div className="space-y-4">
    {item.InventorySalesTracking?.map((tracking, trackingIndex) => (
      <div key={trackingIndex} className="p-4 border rounded-lg bg-gray-50 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Tracking ID:</strong> {tracking.inventorysalesTrackingId}
          </div>
          <div>
            <strong>Restock Date:</strong> {new Date(tracking.restock_date).toLocaleString()}
          </div>
          <div>
            <strong>New Stock Quantity:</strong> {tracking.new_stock_quantity}
          </div>
          <div>
            <strong>Old Stock Quantity:</strong> {tracking.old_stock_quantity}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Inventory Restock Component (unchanged)
const InventoryRestocks: React.FC<InventoryItemProps> = ({ item }) => (
  <div className="space-y-4">
    {item.InventoryRestock?.map((restock, restockIndex) => (
      <div key={restockIndex} className="p-4 border rounded-lg bg-gray-50 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Restock ID:</strong> {restock.inventoryRestockId}
          </div>
          <div>
            <strong>Restock Date:</strong> {new Date(restock.restock_date).toLocaleString()}
          </div>
          <div>
            <strong>New Stock Quantity:</strong> {restock.new_stock_quantity}
          </div>
          <div>
            <strong>Old Stock Quantity:</strong> {restock.old_stock_quantity}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Transaction Products Component (unchanged)
const TransactionProducts: React.FC<InventoryItemProps> = ({ item }) => (
  <div className="space-y-4">
    {item.TransactionProduct.map((transaction, transactionIndex) => (
      <div key={transactionIndex} className="p-4 border rounded-lg bg-gray-50 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Product Name:</strong> {transaction.productName}
          </div>
          <div>
            <strong>Transaction ID:</strong> {transaction.transactionId}
          </div>
          <div>
            <strong>Quantity:</strong> {transaction.quantity}
          </div>
          <div>
            <strong>Total Cost:</strong> {transaction.productTotalCost}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default InventoryDetails;
