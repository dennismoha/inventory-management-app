'use client'
import React from "react";
// import { products } from "./products";
import ProductCart from "./components/productCart";
import {
 
  useGetInventoryItemsQuery,


} from "@/app/redux/api/inventory-api";

const Home = () => {
  
    const {
      data: InventoryItemsData,
      isLoading,
      isError,
    } = useGetInventoryItemsQuery();

    if(isLoading) {
      return '..loading'
    }
    const inventoryItemsData = InventoryItemsData?.data || [];
    if(inventoryItemsData.length === 0) {
      return <div> no items in the inventory</div>
    }
    console.log('inventory data is ', inventoryItemsData)
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {isError ? 'Error fetching inventory items': null}
      {inventoryItemsData.map((product, key) => (
        <ProductCart key={key} data={product} />
      ))}
     
    </div>
  );
};

export default Home;
