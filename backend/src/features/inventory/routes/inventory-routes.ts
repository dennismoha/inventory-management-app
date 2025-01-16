// routes/inventoryRoutes.ts
import express, { Router } from 'express';
import { InventoryController } from '@src/features/inventory/controller/inventory-controller';

class InventoryRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/inventory', InventoryController.prototype.fetchInventory);
    this.router.post('/inventory', InventoryController.prototype.createInventory);
    this.router.put('/inventory/:inventoryId', InventoryController.prototype.updateInventory);
    this.router.delete('/inventory/:inventoryId', InventoryController.prototype.deleteInventory);
    this.router.get('/inventory/low-stock', InventoryController.prototype.fetchLowStockItems);

    return this.router;
  }
}

export const inventoryRoutes = new InventoryRoutes();
