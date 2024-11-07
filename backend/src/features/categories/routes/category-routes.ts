import express, {Router} from 'express'
import { Categories } from '../controller';

class CategoryRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.get('/categories', Categories.prototype.fetchCategories)

        return this.router;
    }
}

export const categoryRoutes: CategoryRoutes = new CategoryRoutes()