'use client'


import CartItem from "./cartItem";
import { toggleStatusTab } from "@/app/redux/state/cart";
import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
// import { SearchIcon } from "lucide-react";
import CustomersList from "./customers";



const CartTab = () => {
 
  const carts = useAppSelector((state) => state.cart.cartProducts);
  const statusTab = useAppSelector((state) => state.cart.statusTab);
  const totalcost = useAppSelector((state) => state.cart.totalCost);
//   const items = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };


  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px_60px_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}
    >
      <h2 className="p-5 text-white text-2xl">products added</h2>

      <div className="p-5">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>
      <div className="bg-amber-600 text-white p-1 mb-1 text-2xl flex items-center justify-center">
     <CustomersList />
     </div>

      <div className="bg-amber-600 text-white p-1 mb-1 text-2xl">
        total cost is : {totalcost.total}
      </div>
      <div className="grid grid-cols-2">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        <button className="bg-amber-600 text-white">CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartTab;
