'use client'
import { useGetCustomersQuery } from "@/app/redux/api/inventory-api";
import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
import { changeCustomerId } from "@/app/redux/state/cart";
import React, {  ChangeEvent, useCallback } from "react";


const CustomersList: React.FC = () => {
  
  //  the type of the selected option state

  const selectedCustomer = useAppSelector((state) => state.cart.customerId);
  console.log('selected option is ', selectedCustomer);
  const dispatch = useAppDispatch()
 
  const { isLoading, isError, data } = useGetCustomersQuery();
  console.log('data for customers is ', data)
  // Handle changes in the dropdown selection
  // const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    
  //   dispatch(changeCustomerId({customerId: event.target.value }))
  // };
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeCustomerId({ customerId: event.target.value }));
    },
    [dispatch]  // Dependencies: only re-create if 'dispatch' changes
  );

  return (
    <div className="relative inline-block w-64">
      {isError ? 'error fetching customers': null}  
      <label
        htmlFor="options"
        className="block text-sm font-medium text-gray-700"
      >
        Choose an option
      </label>
      <select
        id="customerId"
        name="customerId"
        value={selectedCustomer}
        onChange={handleChange}
        className="mt-1 block  rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {isLoading ? (
          "loading"
        ) : (
          <>
            <option value="" disabled>
              Select an option
            </option>
            {data?.data.map((data) =>  <option key={data.customerId} value={data.customerId}>{data.firstName}  {data.lastName} - {data.phoneNumber}</option> )}
           
            {/* <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option> */}
          </>
        )}
      </select>
    </div>
  );
};

export default React.memo(CustomersList);
