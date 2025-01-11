import express, { Router } from 'express';
import { SubCategoriesController } from '@src/features/categories/controller/subcategories-controller';

class SubCategoryRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/subcategories', SubCategoriesController.prototype.fetchSubCategories);
    this.router.post('/subcategories', SubCategoriesController.prototype.createSubCategory);
    this.router.put('/subcategories/:subcategory_id', SubCategoriesController.prototype.updateSubCategory);
    this.router.delete('/subcategories/:subcategory_id', SubCategoriesController.prototype.deleteSubCategory);

    return this.router;
  }
}

export const subCategoryRoutes: SubCategoryRoutes = new SubCategoryRoutes();
