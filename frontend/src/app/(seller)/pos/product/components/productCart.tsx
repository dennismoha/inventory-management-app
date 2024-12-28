"use client";
import React from "react";

// import iconCart from "../assets/images/iconCart.png";
import { useAppDispatch } from "@/app/redux/redux";

import { addToCheckout } from "@/app/redux/state/cart";
import Link from "next/link";
// import { CheckoutProducts } from "../interface";
import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";
import Image from "next/image";
import imageProduct8 from '../assets/images/8.png' 

type inputData = {
  data: InventoryItem;
};

const ProductCart: React.FC<inputData> = (props) => {
  const dispatch = useAppDispatch();
  // const carts = useAppSelector(store => store.cart.items);
  // const {productId, name, price, image, slug} = props.data;
  const {
    inventoryId,
    supplier_products_id,
    // product_weight,
    stock_quantity,
    // reorder_level,
    // last_restocked,
    // unit_id,
    // created_at,
    // updated_at,
    // softDelete,
    status,
    supplierProduct,
    unit,  
  } = props.data;

  console.log('inventory id is ', props.data)
  
  // const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCheckout({
        supplier_products_id,
        // product_weight,
        inventoryId,
        status,
      
        stock_quantity,
        quantity: 1,
        productName: `${supplierProduct?.supplier?.name}-${ supplierProduct?.product?.name}`,
        price: supplierProduct?.ProductPricing?.price  ?  supplierProduct?.ProductPricing?.price : 0,
        VAT: supplierProduct?.ProductPricing?.VAT  ?  supplierProduct?.ProductPricing?.VAT : 0,
        discount: supplierProduct?.ProductPricing?.discount  ?  supplierProduct?.ProductPricing?.discount : 0
      })
    );
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <Link href=''>
        <Image
          src={imageProduct8}
          width={500} // Image width
          height={300} // Image height
          priority // Optional: For better performance
          alt="kk"
          className="w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]"
        />
      </Link>
      <h3 className="text-2xl py-3 text-center font-medium"> {supplierProduct?.supplier?.name}-{ supplierProduct?.product?.name}</h3>
      <div className="flex justify-between items-center">
        <p>
          kes <span className="text-2xl font-medium">{!supplierProduct?.ProductPricing? 'not priced':supplierProduct?.ProductPricing?.price}</span>
        - per <span>{unit?.short_name}</span>
        </p>
        <button
          className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
          onClick={handleAddToCart}
        >
          {/* <img src={iconCart} alt="" className="w-5" /> */}
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
