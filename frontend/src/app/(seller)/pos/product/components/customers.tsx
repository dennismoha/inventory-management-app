'use client'
import { useGetCustomersQuery } from "@/app/redux/api/inventory-api";
import { useAppDispatch } from "@/app/redux/redux";
import { changeCustomerId } from "@/app/redux/state/cart";
import React, { useState, ChangeEvent } from "react";


const CustomersList: React.FC = () => {
  
  //  the type of the selected option state
  const [selectedOption, setSelectedOption] = useState<string>("");
  console.log('selected option is ', selectedOption);
  const dispatch = useAppDispatch()
 
  const { isLoading, isError, data } = useGetCustomersQuery();
  console.log('data for customers is ', data)
  // Handle changes in the dropdown selection
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(event.target.value);
    dispatch(changeCustomerId({customerId: event.target.value }))
  };

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
        value={selectedOption}
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

export default CustomersList;
