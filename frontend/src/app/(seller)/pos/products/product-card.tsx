"use client";

import { useAppDispatch } from "@/app/redux/redux";

import { InventoryItem } from "@/app/(admin)/admin/inventory/interfaces/inventory-interface";
import { addToCheckout } from "@/app/redux/state/cart";

type inputData = {
  data: InventoryItem;
};

interface ProductsCard {
  supplier_products_id: string;
  // product_weight,
  inventoryId: string;
  status: "ACTIVE" | "INACTIVE" | "DISCONTINUED";

  stock_quantity: number;
  quantity: number;
  productName: string;
  price: number | undefined;
  VAT: number | undefined;
  discount: number | undefined;
}

// const ProductCard = ({ imgUrl, productName, productPrice }: { productName: string, productPrice: number, imgUrl?: string}) => {
const ProductCard = (propsData: ProductsCard) => {
  // const { productName } = propsData;
  const imgUrl = undefined;
  const productPrice = propsData.price;
  const dispatch = useAppDispatch();

  const {
    supplier_products_id,
    inventoryId,
    status,
    stock_quantity,
    //quantity, // Default value if not provided
    productName,
    price,
    VAT,
    discount, // You can add a default value here if necessary, like discount = 0
  } = propsData;
  console.log("props data is ", propsData);
  console.log(
    "supplier product id is ",
    supplier_products_id,
    "inventory id ",
    inventoryId
  );

  const handleAddToCart = () => {
    if (!price) {
      alert("cannot select unpriced product");
      return;
    }
    console.log("the stock quantity is ", stock_quantity);

    if (stock_quantity == 0) {
      alert("items out of stock");
      return;
    }

    dispatch(
      addToCheckout({
        supplier_products_id,
        // product_weight,
        inventoryId,
        status,

        stock_quantity,
        quantity: 1,
        productName,
        price: price ? price : 0,
        VAT: 0,
        discount: discount ? discount : 0,
      })
    );
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex justify-around items-center mb-4">
        {/* Product Image */}
        <div className="w-1/3 h-32 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={imgUrl ? imgUrl : "https://via.placeholder.com/150"} // Placeholder image if no image
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Stock Quantity */}
        <div className="flex flex-col justify-center items-center text-center ml-4">
          <p className="text-lg font-light text-gray-700">
            price: {productPrice ? productPrice : "no price"}
          </p>
          <p className="text-lg font-light text-gray-700">
            VAT: {VAT ? VAT : "no VAT"}
          </p>
          <p className="text-lg font-light text-gray-700">
            discount: {discount ? discount : "no discount"}
          </p>
          <p className="text-lg font-light text-gray-700">
            stock quantity: {stock_quantity ? stock_quantity : "no stock"}
          </p>
        </div>
      </div>

      {/* Product Info */}
      {/* Product Name */}
      <div className="mt-2">
        <h3 className="text-xl font-serif text-gray-800">{productName}</h3>
        <p className="text-gray-500 mt-2">${productPrice}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600  text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Select Item
        </button>
      </div>
    </div>
  );
};

const ProductList: React.FC<inputData> = (props) => {
  const propsData: ProductsCard = {
    supplier_products_id: props.data.supplier_products_id,
    // product_weight,
    inventoryId: props.data.inventoryId,
    status: props.data.status,
    stock_quantity: props.data.stock_quantity,
    quantity: props.data.stock_quantity,
    productName: props.data?.supplierProduct?.product?.name as string,
    price: props.data.supplierProduct?.ProductPricing?.price,
    VAT: props.data.supplierProduct?.ProductPricing?.VAT,
    discount: props.data.supplierProduct?.ProductPricing?.discount,
  };
  return (
    <div className="col-span-4 lg:col-span-2 bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-2xl font-serif mb-4">
        {props.data.supplierProduct?.supplier?.name}
      </h2>

      {/* Mapping through inventory items and displaying each product */}

      <ProductCard {...propsData} />

      {/* Optionally, you can display the total and subtotal cost */}
      {/* <div className="mt-6">
        <p className="font-semibold">Subtotal: ${props.data.reorder_level}</p>
        <p className="font-semibold">Total: ${props.data.status}</p>
      </div> */}
    </div>
  );
};

export default ProductList;
