// "use client";

// import CartItem from "@/app/(seller)/pos/product/components/cartItem";
// import { clearCart, toggleStatusTab } from "@/app/redux/state/cart";
// import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
// import CustomersList from "@/app/(seller)/pos/product/components/customers";
// import { useCallback } from "react";
// import { useCreateTransactionMutation } from "@/app/redux/api/inventory-api";
// import { useGetInventoryItemsQuery } from "@/app/redux/api/inventory-api";

// import ProductList from "@/app/(seller)/pos/products/product-card";

// const SellersProducts = () => {
//   const [
//     createTransaction,
//     {
//       reset,
//       isLoading: transactionLoading,
//       isError: transactionError,
//       isSuccess: transactionSuccess,
//       // error: transactionErrorMessage,
//     },
//   ] = useCreateTransactionMutation();
//   const cartProducts = useAppSelector((state) => state.cart);

//   const {
//     data: InventoryItemsData,
//     // isLoading,
//     // isError,
//   } = useGetInventoryItemsQuery();

//   const handleCheckoutHandler = () => {
//     console.log("here we are", cartProducts);
//     if (cartProducts.cartProducts.length === 0) {
//       alert("no items added");
//       return;
//     }
//     createTransaction(cartProducts);
//   };

//   const carts = useAppSelector((state) => state.cart.cartProducts);
//   // const statusTab = useAppSelector((state) => state.cart.statusTab);
//   const totalcost = useAppSelector((state) => state.cart.totalCost);
//   const dispatch = useAppDispatch();

//   const handleCloseTabCart = useCallback(() => {
//     dispatch(toggleStatusTab());
//   }, [dispatch]);

//   const inventoryItemsData = InventoryItemsData?.data || [];

//   if (inventoryItemsData.length === 0) {
//     return <div> No items in the inventory </div>;
//   }

//   if (transactionSuccess) {
//     console.log("clear cart");
//     dispatch(clearCart());
//     reset();
//   }

//   return (
//     <>
//       <div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3   gap-4`}>
//         {/* Products Section */}
//         <div
//           className={`col-span-1 sm:col-span-1 lg:col-span-2 bg-gray-100  overflow-y-auto`}
//         >
//           <h2 className="text-xl sm:text-1xl font-semibold mt-4 text-center">
//             Products
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3   lg:grid-cols-4 gap-4">
//             {/* Mapping through inventory items and displaying each product */}
//             {inventoryItemsData.map((product, key) => (
//               <ProductList key={key} data={product} />
//             ))}
//           </div>
//         </div>

//         {/* Cart Section */}
//         {cartProducts.cartProducts.length === 0 ? null : (
//           <div className="bg-gray-200 h-full p-6 overflow-y-scroll shadow-2xl grid grid-rows-[60px_1fr_60px_60px_60px_60px_60px] transform transition-transform duration-500 max-h-[677px] col-span-1 sm:col-span-2 lg:col-span-1">
//             <h2 className="text-xl sm:text-2xl font-semibold mb-2">Cart</h2>
//             <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//               <div className="flex flex-row justify-between mb-2 border-b-2">
//                 <div>Item 1</div>
//                 <div>Item 2</div>
//               </div>
//               <div className="overflow-y-scroll max-h-[280px]">
//                 {carts.map((item, key) => (
//                   <div
//                     key={key}
//                     className="bg-white-100 p-4 mb-4 rounded-lg shadow-md"
//                   >
//                     <CartItem key={key} data={item} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-green-600 rounded-lg text-white p-1 mb-1 text-xl sm:text-2xl flex items-center justify-start">
//               <CustomersList />
//             </div>

//             {transactionError ? (
//               <div className="bg-green-600 text-white p-1 mb-1 text-xl sm:text-2xl">
//                 {"transaction error"}
//               </div>
//             ) : (
//               <>
//                 {transactionSuccess ? (
//                   <div className="bg-green-600 text-white p-1 mb-1 text-xl sm:text-2xl">
//                     Success
//                   </div>
//                 ) : null}
//               </>
//             )}

//             <div className="bg-green-600 text-white p-1 mb-1 text-xl sm:text-2xl">
//               Total cost is: {totalcost.total}
//             </div>

//             <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//               Payment Type
//             </div>

//             {transactionLoading ? (
//               <div>Loading...</div>
//             ) : (
//               <div className="grid grid-cols-2 bg-white mb-4 rounded-lg shadow-md">
//                 <button
//                   className="bg-black text-white"
//                   onClick={handleCloseTabCart}
//                 >
//                   CLOSE
//                 </button>
//                 <button
//                   onClick={handleCheckoutHandler}
//                   className="bg-green-600 text-white"
//                 >
//                   CHECKOUT
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SellersProducts;
'use client'

'use client'

import CartItem from "@/app/(seller)/pos/product/components/cartItem";
import { clearCart, toggleStatusTab } from "@/app/redux/state/cart";
import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
import CustomersList from "@/app/(seller)/pos/product/components/customers";
import { useCallback } from "react";
import { useCreateTransactionMutation } from "@/app/redux/api/inventory-api";
import { useGetInventoryItemsQuery } from "@/app/redux/api/inventory-api";
import ProductList from "@/app/(seller)/pos/products/product-card";

const SellersProducts = () => {
  const [
    createTransaction,
    {
      reset,
      isLoading: transactionLoading,
      isError: transactionError,
      isSuccess: transactionSuccess,
    },
  ] = useCreateTransactionMutation();

  const cartProducts = useAppSelector((state) => state.cart);
  const {
    data: InventoryItemsData,
  } = useGetInventoryItemsQuery();

  const handleCheckoutHandler = () => {
    console.log("here we are", cartProducts);
    if (cartProducts.cartProducts.length === 0) {
      alert("no items added");
      return;
    }
    createTransaction(cartProducts);
  };

  const carts = useAppSelector((state) => state.cart.cartProducts);
  const totalcost = useAppSelector((state) => state.cart.totalCost);
  const dispatch = useAppDispatch();

  const handleCloseTabCart = useCallback(() => {
    dispatch(toggleStatusTab());
  }, [dispatch]);

  const inventoryItemsData = InventoryItemsData?.data || [];

  if (inventoryItemsData.length === 0) {
    return <div> No items in the inventory </div>;
  }

  if (transactionSuccess) {
    console.log("clear cart");
    dispatch(clearCart());
    reset();
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500 ${
          cartProducts.cartProducts.length === 0 ? "lg:grid-cols-1" : "lg:grid-cols-3"
        }`}
      >
        {/* Products Section */}
        <div
          className={`col-span-1 sm:col-span-1 lg:col-span-${cartProducts.cartProducts.length === 0 ? "3" : "2"} bg-gray-100 overflow-y-auto transform transition-all duration-500 ${
            cartProducts.cartProducts.length === 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-100'
          }`}
        >
          <h2 className="text-xl sm:text-1xl font-semibold mt-4 text-center">
            Products
          </h2>

          {/* <div className={`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${ cartProducts.cartProducts.length === 0 ? 'xl:grid-cols-8': 'xl:grid-cols-4'}`}> */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${ cartProducts.cartProducts.length === 0  ? ' md:grid-cols-2 xl:grid-cols-8' : ' md:grid-cols-3 xl:grid-cols-4'}`}>
            {inventoryItemsData.map((product, key) => (
              <ProductList key={key} data={product} />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div
          className={`bg-gray-200 p-6 overflow-y-scroll shadow-2xl grid grid-rows-[60px_1fr_60px_60px_60px_60px_60px] transform transition-all ease-in-out duration-500 ${
            cartProducts.cartProducts.length === 0
              ? "opacity-0 h-0 overflow-hidden col-span-0 scale-0"
              : "opacity-100 h-auto col-span-1 sm:col-span-1 lg:col-span-1 scale-100"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Cart</h2>
          <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <div className="flex flex-row justify-between mb-2 border-b-2">
              <div>Item 1</div>
              <div>clear cart</div>
            </div>
            <div className="overflow-y-scroll max-h-[280px]">
              {carts.map((item, key) => (
                <div
                  key={key}
                  className="bg-white-100 p-4 mb-4 rounded-lg shadow-md"
                >
                  <CartItem key={key} data={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-600 rounded-lg text-white p-1 mb-1 text-xl sm:text-2xl flex items-center justify-start">
            <CustomersList />
          </div>

          {transactionError ? (
            <div className="bg-green-600 text-white p-1 mb-1 text-xl sm:text-2xl">
              {"transaction error"}
            </div>
          ) : (
            <>
              {transactionSuccess ? (
                <div className="bg-green-600 text-white p-1 mb-1 text-xl sm:text-2xl">
                  Success
                </div>
              ) : null}
            </>
          )}

          <div className="bg-green-600 text-white p-1 mb-1 text-xl sm:text-2xl">
            Total cost is: {totalcost.total}
          </div>

          <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
            Payment Type
          </div>

          {transactionLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-2 bg-white mb-4 rounded-lg shadow-md">
              <button
                className="bg-black text-white"
                onClick={handleCloseTabCart}
              >
                CLOSE
              </button>
              <button
                onClick={handleCheckoutHandler}
                className="bg-green-600 text-white"
              >
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellersProducts;
