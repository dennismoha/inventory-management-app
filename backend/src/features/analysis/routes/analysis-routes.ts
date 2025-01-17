import express, { Router } from 'express';
import { SalesController } from '@src/features/analysis/controller/sales'; // Import the SalesController

class SalesRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/total-sales', SalesController.prototype.getTotalSales); // Route to get total sales
    this.router.get('/sales-between-dates', SalesController.prototype.getSalesBetweenDates); // Route to get sales between dates
    this.router.get('/total-sales-for-product/:productId', SalesController.prototype.getTotalSalesForProduct); // Route to get total sales for a product
    this.router.get('/sales-for-product-in-range/:productId', SalesController.prototype.getTotalSalesForProductInRange); // Route to get sales for a product within date range
    this.router.get('/sales-per-customer', SalesController.prototype.getTotalSalesForEachCustomer); // Route to get sales for each customer
    this.router.get('/sales-per-customer-in-range', SalesController.prototype.getTotalSalesForEachCustomerInRange); // Route to get sales for each customer in date range
    this.router.get('/inventory-sales-difference', SalesController.prototype.getInventorySalesDifference); // Route to get inventory sales difference
    this.router.get('/calculate-profit', SalesController.prototype.calculateProfit); // Route to calculate profit

    return this.router;
  }
}

export const salesRoutes: SalesRoutes = new SalesRoutes();
