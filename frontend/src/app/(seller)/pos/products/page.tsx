// "use client";

// import CartItem from "@/app/(seller)/pos/product/components/cartItem";
// import { toggleStatusTab } from "@/app/redux/state/cart";
// import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
// // import { SearchIcon } from "lucide-react";

// import CustomersList from "@/app/(seller)/pos/product/components/customers";
// import { useCallback } from "react";
// import { useCreateTransactionMutation } from "@/app/redux/api/inventory-api";
// import { useGetInventoryItemsQuery } from "@/app/redux/api/inventory-api";
// import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";

// type inputData = {
//         data: InventoryItem;
//       };
      

// const ProductList: React.FC<inputData> = (props) => {
//         return (
//                 <div className="col-span-3 lg:col-span-2 bg-gray-100 p-6 overflow-y-auto">
//                 <h2 className="text-2xl font-semibold mb-4">Products</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {/* Mapping through cartProducts and displaying each product */}
//                   {/* {productItems.cartProducts.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))} */}
//                 </div>
          
//                 {/* Optionally, you can display the total and subtotal cost */}
//                 <div className="mt-6">
//                   <p className="font-semibold">Subtotal: ${props.data.reorder_level}</p>
//                   <p className="font-semibold">Total: ${props.data.status}</p>
//                 </div>
//               </div>
//         );
//       };

//       const ProductCard = ({ product }: { product: CartProduct }) => {
//         return (
//                 <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//                 {/* Product Image */}
//                 <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
                
//                 {/* Product Info */}
//                 <div className="mt-4">
//                   <h3 className="text-xl font-semibold">{product.name}</h3>
//                   <p className="text-gray-500 mt-2">${product.price.toFixed(2)}</p>
//                 </div>
//               </div>
//         );
//       };

// const SellersProducts = () => {
//   const [createTransaction] = useCreateTransactionMutation();
//   const cartProducts = useAppSelector((state) => state.cart);

//    const {
//       data: InventoryItemsData,
//       isLoading,
//       isError,
//     } = useGetInventoryItemsQuery();

//   const handleCheckoutHandler = () => {
//     console.log("here we are");
//     createTransaction(cartProducts);
//   };
//   const carts = useAppSelector((state) => state.cart.cartProducts);
//   const statusTab = useAppSelector((state) => state.cart.statusTab);
//   const totalcost = useAppSelector((state) => state.cart.totalCost);
//   //   const items = useAppSelector((state) => state.cart)
//   const dispatch = useAppDispatch();
  

//   const handleCloseTabCart = useCallback(() => {
//     dispatch(toggleStatusTab());
//   }, [dispatch]);
//   const inventoryItemsData = InventoryItemsData?.data || [];
//   if (inventoryItemsData.length === 0) {
//     return <div> no items in the inventory</div>;
//   }
//   return (
//     <>
//       {/* <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
//         <div style={{flexGrow:8}}>
//                 <ProductsTable/>
//         </div>
//         <div style={{flexGrow:4, backgroundColor:'red'}}>
//                 del martinini
//         </div>


//     </div> */}
//       <div className="grid grid-cols-3 gap-4  p-4" style={{ height: "677px" }}>
//         {/* Products Section */}
        
//         <div className="col-span-3 lg:col-span-2 bg-gray-100 p-6 overflow-y-auto">
//           <h2 className="text-2xl font-semibold mb-4">Products</h2>
//           {inventoryItemsData.map((product, key) => (
//                 <ProductList key={key} data={product}  />
//       ))}
          
//           <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//             Product 2
//           </div>
//           <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//             Product 3
//           </div>
//           {/* Add more products */}
//         </div>

//         {/* Cart Section */}
//         <div
//           className={`bg-gray-200 p-6 overflow-y-scroll  shadow-2xl grid grid-rows-[60px_1fr_60px_60px_60px_60px] 
//     transform transition-transform duration-500
//     max-h-[677px] 
   
//     `}
//         >
//           <h2 className="text-2xl font-semibold mb-2">products</h2>
//           <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//             <div className="flex flex-row justify-between mb-2 border-b-2">
//               <div>1</div>
//               <div>2</div>
//             </div>

//             <div className="overflow-y-scroll max-h-[289px]">
//             {carts.map((item, key) => (
//                  <div key={key} className="bg-white-100 p-4 mb-4 rounded-lg shadow-md">
//                 <CartItem key={key} data={item} />
//                 </div>
//               ))}
              
              
        
//               <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
//                 innerCart Item 1
//               </div>
              
              
//             </div>

//           </div>
//           <div className="bg-amber-600 rounded-lg text-white p-1 mb-1 text-2xl flex items-center justify-start">
//             <CustomersList />
//           </div>
//           <div className="bg-amber-600 text-white p-1 mb-1 text-2xl">
//             total cost is : {totalcost.total}
//           </div>
//           <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
//             Payment Type
//           </div>
//           <div className="grid grid-cols-2 bg-white  mb-4 rounded-lg shadow-md">
//             <button
//               className="bg-black text-white"
//               onClick={handleCloseTabCart}
//             >
//               CLOSE
//             </button>
//             <button
//               onClick={handleCheckoutHandler}
//               className="bg-amber-600 text-white"
//             >
//               CHECKOUT
//             </button>
//           </div>

//           {/*      
//          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
//         <div className="bg-white p-4 mb-4 rounded-lg shadow-md">Cart Item 1</div>
//         <div className="bg-white p-4 mb-4 rounded-lg shadow-md">Cart Item 2</div>  */}

//           {/* <div className="p-5">
//         {carts.length === 0? 'no items': null}
//         {carts.map((item, key) => (
                
//           <CartItem key={key} data={item} />
//         ))}
//       </div> 
//       <div className="bg-amber-600 text-white p-1 mb-1 text-2xl flex items-center justify-center">
//      <CustomersList />
//      </div> */}

//           {/* <div className="grid grid-cols-2">
//         <button className="bg-black text-white" onClick={handleCloseTabCart}>
//           CLOSE
//         </button>
//         <button onClick={ handleCheckoutHandler} className="bg-amber-600 text-white">CHECKOUT</button>
//       </div>  */}
//         </div>
//         {/* Add more cart items */}
//       </div>
//     </>
//   );
// };

// export default SellersProducts;

"use client";

import CartItem from "@/app/(seller)/pos/product/components/cartItem";
import { clearCart, toggleStatusTab } from "@/app/redux/state/cart";
import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
import CustomersList from "@/app/(seller)/pos/product/components/customers";
import { useCallback } from "react";
import { useCreateTransactionMutation } from "@/app/redux/api/inventory-api";
import { useGetInventoryItemsQuery } from "@/app/redux/api/inventory-api";
// import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";

// import { addToCheckout } from "@/app/redux/state/cart";
import ProductList from "@/app/(seller)/pos/products/product-card";
// type inputData = {
//   data: InventoryItem;
// };

// const ProductCard = ({ imgUrl, productName, productPrice }: { productName: string, productPrice: number, imgUrl?: string}) => {
//   return (
//     <div className="bg-white p-4 mb-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
//       {/* Product Image */}
//       {/* <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
//         <img
//           src={imgUrl || 'https://via.placeholder.com/150'}  // Placeholder image if no image
//           alt={productName}
//           className="w-full h-full object-cover"
//         />
       
//       </div> */}

//          <div className="flex justify-around items-center mb-4">
//         {/* Product Image */}
//         <div className="w-1/3 h-32 bg-gray-200 rounded-lg overflow-hidden">
//           <img
//             src={imgUrl || 'https://via.placeholder.com/150'}  // Placeholder image if no image
//             alt={productName}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Stock Quantity */}
//         <div className="flex flex-col justify-center items-center text-center ml-4">
//           <p className="text-lg font-semibold text-gray-700">price: {productPrice ? productPrice: 'no price'}</p>
//           <p className="text-lg font-semibold text-gray-700">In Stock: {productPrice ? productPrice: 'no price'}</p>
//         </div>
//       </div>
      
//       {/* Product Info */}
//        {/* Product Name */}
//        <div className="mt-2">
//         <h3 className="text-xl font-semibold text-gray-800">{productName}</h3>
//         <p className="text-gray-500 mt-2">${productPrice}</p>
//       </div>

//       {/* Add to Cart Button */}
//       <div className="mt-4">
//         <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200">
//           Select Item
//         </button>
//       </div>
//     </div>
//   );
// };

// const ProductList: React.FC<inputData> = (props) => {
//   return (
//     <div className="col-span-4 lg:col-span-2 bg-gray-100 p-6 overflow-y-auto">
//       <h2 className="text-2xl font-semibold mb-4">{props.data.supplierProduct?.supplier?.name}</h2>
   
//         {/* Mapping through inventory items and displaying each product */}
     
//           <ProductCard imgUrl="" productName={props.data.supplierProduct?.product?.name} productPrice={props.data.supplierProduct?.ProductPricing?.price}/>
   
   

//       {/* Optionally, you can display the total and subtotal cost */}
//       {/* <div className="mt-6">
//         <p className="font-semibold">Subtotal: ${props.data.reorder_level}</p>
//         <p className="font-semibold">Total: ${props.data.status}</p>
//       </div> */}
//     </div>
//   );
// };

const SellersProducts = () => {
  const [createTransaction,{reset, isLoading:transactionLoading,isError:transactionError, isSuccess:transactionSuccess, error: transactionErrorMessage}] = useCreateTransactionMutation();
  const cartProducts = useAppSelector((state) => state.cart);

  const {
    data: InventoryItemsData,
    isLoading,
    isError,
  } = useGetInventoryItemsQuery();

  const handleCheckoutHandler = () => {
    console.log("here we are", cartProducts);
    if(cartProducts.cartProducts.length === 0) {
        alert ('no items added');
        return;
    }
    createTransaction(cartProducts);
  };

  const carts = useAppSelector((state) => state.cart.cartProducts);
  const statusTab = useAppSelector((state) => state.cart.statusTab);
  const totalcost = useAppSelector((state) => state.cart.totalCost);
  const dispatch = useAppDispatch();

  const handleCloseTabCart = useCallback(() => {
    dispatch(toggleStatusTab());
  }, [dispatch]);

  

  const inventoryItemsData = InventoryItemsData?.data || [];

  if (inventoryItemsData.length === 0) {
    return <div> No items in the inventory </div>;
  }

if(transactionSuccess) {
        console.log('clear cart')
        dispatch(clearCart());
        reset()
}

  return (
    <>
 <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 `} style={{ height: "677px" }}>
  {/* Products Section */}
  <div className={`col-span-1 sm:col-span-2 lg:col-span-2 bg-gray-100 p-6 overflow-y-auto`}>
    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Products</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Mapping through inventory items and displaying each product */}
      {inventoryItemsData.map((product, key) => (
        <ProductList key={key} data={product} />
      ))}
    </div>
  </div>

  {/* Cart Section */}
   {cartProducts.cartProducts.length === 0 ? null:
  <div className="bg-gray-200 p-6 overflow-y-scroll shadow-2xl grid grid-rows-[60px_1fr_60px_60px_60px_60px_60px] transform transition-transform duration-500 max-h-[677px] col-span-1 sm:col-span-2 lg:col-span-1">
    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Cart</h2>
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <div className="flex flex-row justify-between mb-2 border-b-2">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
      <div className="overflow-y-scroll max-h-[280px]">
        {carts.map((item, key) => (
          <div key={key} className="bg-white-100 p-4 mb-4 rounded-lg shadow-md">
            <CartItem key={key} data={item} />
          </div>
        ))}
      </div>
    </div>

    <div className="bg-amber-600 rounded-lg text-white p-1 mb-1 text-xl sm:text-2xl flex items-center justify-start">
      <CustomersList />
    </div>

    {transactionError ? (
      <div className="bg-amber-600 text-white p-1 mb-1 text-xl sm:text-2xl">
        {transactionErrorMessage.data?.message}
      </div>
    ) : (
      <>
        {transactionSuccess ? (
          <div className="bg-amber-600 text-white p-1 mb-1 text-xl sm:text-2xl">Success</div>
        ) : null}
      </>
    )}

    <div className="bg-amber-600 text-white p-1 mb-1 text-xl sm:text-2xl">
      Total cost is: {totalcost.total}
    </div>

    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      Payment Type
    </div>

    {transactionLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="grid grid-cols-2 bg-white mb-4 rounded-lg shadow-md">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        <button onClick={handleCheckoutHandler} className="bg-amber-600 text-white">
          CHECKOUT
        </button>
      </div>
    )}
  </div>}
</div>

    </>
  );
};

export default SellersProducts;

