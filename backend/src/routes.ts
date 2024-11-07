import { BASE_PATH } from "./constants";
import { Application } from "express";
import { categoryRoutes } from "./features/categories/routes/category-routes";

export default(app:Application) => {
    const routes = () =>{
        app.use(BASE_PATH, categoryRoutes.routes())
    }

    routes();
}