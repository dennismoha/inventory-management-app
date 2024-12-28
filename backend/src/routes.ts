
import { Application } from 'express';
import { categoryRoutes } from '@src/features/categories/routes/category-routes';
import { subCategoryRoutes } from '@src/features/categories/routes/subcategory-routes';
import { BASE_PATH } from './constants';
import { productUnitsRoutes } from '@src/features/products/routes/product-units-routes';
import { productsRoutes } from '@src/features/products/routes/product-routes';
import { unitsRoutes } from '@src/features/units/routes/units-routes';
import { suppliersRoutes } from '@src/features/suppliers/routes/suppliers-routes';
import { supplierProductsRoutes } from '@src/features/suppliers/routes/supplier-products-routes';
import { supplierPricingRoutes } from '@src/features/suppliers/routes/supplier-pricing-routes';
import { orderProductsRoutes } from '@src/features/orders/routes/order-product-routes';
import { ordersRoutes } from '@src/features/orders/routes/orders-routes';

import { miscellaneousRoutes } from '@src/features/miscellaneous/routes/miscellaneous-routes';
import { inventoryRoutes } from '@src/features/inventory/routes/inventory-routes';
import { productPricingRoutes } from '@src/features/inventory/routes/product-pricing';
import { authRoutes } from '@src/features/auth/routes/auth-routes';
import { transactionRoutes } from '@src/features/transactions/routes/transaction-routes';
import { customerRoutes } from '@src/features/customers/routes/customers-routes';
// import { authMiddleware } from './shared/globals/helpers/auth-middleware';




export default(app:Application) => {
    const routes = () =>{
        app.use(BASE_PATH, authRoutes.routes());
        app.use(BASE_PATH, authRoutes.signoutRoute());
        app.use(BASE_PATH, categoryRoutes.routes());
        app.use(BASE_PATH, subCategoryRoutes.routes());
        app.use(BASE_PATH, productUnitsRoutes.routes());
        app.use(BASE_PATH, productsRoutes.routes());
        app.use(BASE_PATH, suppliersRoutes.routes());
        app.use(BASE_PATH, supplierProductsRoutes.routes());
        app.use(BASE_PATH, supplierPricingRoutes.routes());
        app.use(BASE_PATH, ordersRoutes.routes());
        app.use(BASE_PATH, orderProductsRoutes.routes());
        app.use(BASE_PATH, miscellaneousRoutes.routes());
        app.use(BASE_PATH, inventoryRoutes.routes());
        app.use(BASE_PATH, productPricingRoutes.routes());
        app.use(BASE_PATH, transactionRoutes.routes());
        app.use(BASE_PATH, customerRoutes.routes());
        app.use(BASE_PATH, unitsRoutes.routes());
     
    };

    routes();
};