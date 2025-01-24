import { Request, Response } from 'express';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client
//import { inventoryRestockSchema, inventorySchema } from '@src/features/inventory/schema/inventory-schema'; // Joi validation schema
import { StatusCodes } from 'http-status-codes'; // HTTP status codes
//import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators'; // Joi validation decorator
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages'; // Helper function for success response
import { Inventory } from '@src/features/inventory/interfaces/inventory.interface'; // Inventory interface
//import { Inventory, InventoryRestock, InventorySalesTracking, InventorystockQuantityVsReorderLevel } from '@src/features/inventory/interfaces/inventory.interface'; // Inventory interface
// import { BadRequestError, ConflictError, NotFoundError } from '@src/shared/globals/helpers/error-handler';
// import { convertToBaseUnit, getUnitCategory, utilMessage } from '@src/shared/globals/helpers/utils';

export class InventoryController {
  /**
   * Fetches all inventory items from the database.
   *
   * This method retrieves a list of inventory items that are not marked as logically deleted (softDelete: false).
   * It sends a successful response with the list of inventory items and an HTTP status of 200.
   */
  public async fetchInventorInsights(req: Request, res: Response): Promise<void> {
    // Fetch inventory items that are not marked as deleted (softDelete = false)
    const inventory: Inventory[] = await prisma.inventory.findMany({
      where: {
        softDelete: false // Optional: Only return non-deleted records
      },
      include: {
        InventorySalesTracking: true,
        InventoryRestock: true,
        TransactionProduct: true,
        supplierProduct: {
          include: {
            product: true,
            supplier: true,
            ProductPricing: true
          }
        },
        unit: true
      }
    });

    // Send success message with the fetched inventory
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, inventory, 'Inventory fetched successfully'));
  }

  /**
   * Fetches all inventory sales tracking records.
   * This method retrieves all sales tracking records that have not been marked as soft deleted, ordered by restock date in descending order.
   *
   * @returns {Promise<void>} - Sends a response with a status of 200 and a success message containing the fetched sales tracking records.
   */
  //    public async getAllSalesTracking(req: Request, res: Response): Promise<void> {

  //       // Fetch all sales tracking records from the database
  //       const salesTrackingRecords: InventorySalesTracking[] = await prisma.inventorySalesTracking.findMany({
  //         where: {
  //           softDelete: false, // Only include records that are not soft-deleted
  //         },
  //         orderBy: {
  //           restock_date: 'desc', // Order records by restock_date in descending order
  //         },
  //         include: {
  //           InventoryItemID: true, // Include related inventory item details
  //         },
  //       });
  //       res.json(salesTrackingRecords);
  //       // Send a success response with the fetched records
  //      // res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, salesTrackingRecords, 'Sales tracking records fetched successfully'));

  //   }

  /**
   * Fetches inventory sales tracking records where `new_stock_quantity` is greater than `old_stock_quantity` or vice versa.
   * This method retrieves sales tracking records where stock quantities are either increasing or decreasing.
   *
   * @returns {Promise<void>} - Sends a response with a status of 200 and a success message containing the filtered sales tracking records.
   */
  //   public async getSalesTrackingByStockComparison(req: Request, res: Response): Promise<void> {

  //       // Fetch sales tracking records based on stock comparison
  //       const salesTrackingRecords: InventorySalesTracking[] = await prisma.inventorySalesTracking.findMany({
  //         where: {
  //           softDelete: false,
  //           OR: [
  //             {
  //               new_stock_quantity: {
  //                 gt: 0, // Include records where new_stock_quantity is greater than 0
  //               },
  //             },
  //             {
  //               old_stock_quantity: {
  //                 gt: 0, // Include records where old_stock_quantity is greater than 0
  //               },
  //             },
  //           ],
  //         },
  //         orderBy: {
  //           restock_date: 'desc', // Order records by restock_date in descending order
  //         },
  //         include: {
  //           InventoryItemID: true, // Include related inventory item details
  //         },
  //       });
  //       res.json(salesTrackingRecords);
  //       // Send a success response with the filtered records
  //       //res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, salesTrackingRecords, 'Sales tracking records with stock comparison fetched successfully'));

  //   }

  /**
   * Fetches inventory sales tracking records where `new_stock_quantity` or `old_stock_quantity` is zero.
   * This method retrieves sales tracking records where either new or old stock quantities are zero, typically indicating stockouts or no movement.
   *
   * @returns {Promise<void>} - Sends a response with a status of 200 and a success message containing the filtered sales tracking records.
   */
  //   public async getSalesTrackingByZeroStock(req: Request, res: Response): Promise<void> {

  //       // Fetch sales tracking records with zero stock quantity
  //       const salesTrackingRecords: InventorySalesTracking[] = await prisma.inventorySalesTracking.findMany({
  //         where: {
  //           softDelete: false,
  //           OR: [
  //             {
  //               new_stock_quantity: 0, // Include records where new_stock_quantity is 0
  //             },
  //             {
  //               old_stock_quantity: 0, // Include records where old_stock_quantity is 0
  //             },
  //           ],
  //         },
  //         orderBy: {
  //           restock_date: 'desc', // Order records by restock_date in descending order
  //         },
  //         include: {
  //           InventoryItemID: true, // Include related inventory item details
  //         },
  //       });

  //       // Send a success response with the filtered records
  //       res.json(salesTrackingRecords);
  //       //res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, salesTrackingRecords, 'Sales tracking records with zero stock fetched successfully'));

  //   }
}
