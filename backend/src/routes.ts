import { Application } from 'express';
import { categoryRoutes } from '@src/features/categories/routes/category-routes';
import { BASE_PATH } from './constants';


export default(app:Application) => {
    const routes = () =>{
        app.use(BASE_PATH, categoryRoutes.routes());
    }

    routes();
}