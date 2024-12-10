
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




export default(app:Application) => {
    const routes = () =>{
        app.use(BASE_PATH, categoryRoutes.routes());
        app.use(BASE_PATH, subCategoryRoutes.routes());
        app.use(BASE_PATH, productUnitsRoutes.routes());
        app.use(BASE_PATH, productsRoutes.routes());
        app.use(BASE_PATH, unitsRoutes.routes());
        app.use(BASE_PATH, suppliersRoutes.routes());
        app.use(BASE_PATH, supplierProductsRoutes.routes());
        app.use(BASE_PATH, supplierPricingRoutes.routes());
    };

    routes();
};