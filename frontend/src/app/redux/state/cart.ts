import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InventoryItem } from '@/app/(admin)/admin/inventory/interfaces/inventory-interface';
export type cartProducts =Pick<InventoryItem,'inventoryId' | 'status' | 'unit' | 'stock_quantity'>  & {   
    quantity: number,
    name: string,
    pricing: number,
    VAT: number,
    discount: number
}
interface ProductItems {
    cartProducts: cartProducts[]
    statusTab: boolean,
    totalCost: {
        total: number
        subtotal: number      
    }
    customerId?: string
}
const initialState: ProductItems = { 
    cartProducts: [], // Initialize the cartProducts as an empty array
    statusTab: false, // Default statusTab value
    totalCost: {
        total: 0,
        subtotal:0

    },
    customerId: ''
};

const checkoutSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCheckout(state, action: PayloadAction<cartProducts>) {
            const { inventoryId, quantity, status, unit, stock_quantity, name, pricing, VAT, discount } = action.payload;
            
            // Find if the product already exists in the cartProducts
            const indexProductId = state.cartProducts.findIndex(item => item.inventoryId === inventoryId);
            
            if (indexProductId >= 0) {
                // If the product is found, update its quantity
                state.cartProducts[indexProductId].quantity += quantity
            } else {
                // If the product does not exist, add a new product to the cart
                state.cartProducts.push({ inventoryId, quantity, status, unit, stock_quantity , name, pricing , VAT, discount});
            }

            
               // Calculate the total cost of all items in the cart after the update
            //    state.totalCost.subtotal = state.cartProducts.reduce((total, item) => {
            //     return total + (item.quantity * item.pricing); // Multiply quantity by pricing for each item
            // }, 0);
              // Calculate the subtotal (sum of all item prices before VAT and discount)
              const subtotal = state.cartProducts.reduce((total, item) => {
                return total + (item.quantity *  pricing); // Multiply quantit by pricing for each item
            }, 0);

            // Calculate the total VAT (based on the subtotal and each item's VAT percentage)
            const totalVAT = state.cartProducts.reduce((total, item) => {
                return total + (item.quantity *  pricing * VAT / 100); // VAT is a percentage
            }, 0);

            // Calculate the total discount (based on each item's discount percentage)
            const totalDiscount = state.cartProducts.reduce((total, item) => {
                return total + (item.quantity *  pricing * item.discount / 100); // Discount is a percentage
            }, 0);

            // Calculate the total cost (subtotal + VAT - discount)
            const totalCost = subtotal + totalVAT - totalDiscount;

            // Update the state with the calculated values
            state.totalCost.subtotal = subtotal;  // Subtotal is before VAT and discount
            state.totalCost.total = totalCost;    // Total includes VAT and subtracts discount
        },
        changeQuantity(state, action: PayloadAction<Pick<cartProducts ,'inventoryId' | 'quantity'>>) {
            const { inventoryId, quantity } = action.payload;

            // Find the product in the cartProducts
            const indexProductId = state.cartProducts.findIndex(item => item.inventoryId === inventoryId);
            
            if (indexProductId >= 0) {
                // If the product is found, update the quantity
                if (quantity > 0) {
                    const k =  state.cartProducts[indexProductId];
                    
                    k.quantity = quantity;
                } else {
                    // If quantity is 0 or less, remove the product from the cart
                    state.cartProducts = state.cartProducts.filter(item => item.inventoryId !== inventoryId);
                }
            }

             // Calculate the total cost of all items in the cart after the update
            //  state.totalCost = state.cartProducts.reduce((total, item) => {
            //     return total + (item.quantity * item.pricing); // Multiply quantity by pricing for each item
            // }, 0);

              // Calculate the subtotal (sum of all item prices before VAT and discount)
              const subtotal = state.cartProducts.reduce((total, item) => {
                return total + (item.quantity * item.pricing); // Multiply quantity by pricing for each item
            }, 0);

            // Calculate the total VAT (based on the subtotal and each item's VAT percentage)
            const totalVAT = state.cartProducts.reduce((total, item) => {
                return total + (item.quantity * item.pricing * item.VAT / 100); // VAT is a percentage
            }, 0);

            // Calculate the total discount (based on each item's discount percentage)
            const totalDiscount = state.cartProducts.reduce((total, item) => {
                return total + (item.quantity * item.pricing * item.discount / 100); // Discount is a percentage
            }, 0);

            // Calculate the total cost (subtotal + VAT - discount)
            const totalCost = subtotal + totalVAT - totalDiscount;

            // Update the state with the calculated values
            state.totalCost.subtotal = subtotal;  // Subtotal is before VAT and discount
            state.totalCost.total = totalCost;    // Total includes VAT and subtracts discount
           
        },
        changeCustomerId(state, action: PayloadAction<Pick<ProductItems ,'customerId' >>) {
            const {customerId} = action.payload
            state.customerId = customerId;
        },
        toggleStatusTab(state) {
            if (state.statusTab === false) {
                state.statusTab = true;
            } else {
                state.statusTab = false;
            }
        }
    }
})
export const { addToCheckout, changeQuantity, toggleStatusTab, changeCustomerId } = checkoutSlice.actions;
export default checkoutSlice.reducer;