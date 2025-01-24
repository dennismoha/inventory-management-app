import { Request, Response } from 'express';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client
import { inventoryRestockSchema, inventorySchema } from '@src/features/inventory/schema/inventory-schema'; // Joi validation schema
import { StatusCodes } from 'http-status-codes'; // HTTP status codes
import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators'; // Joi validation decorator
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages'; // Helper function for success response
import {
  Inventory,
  InventoryRestock,
  InventorySalesTracking,
  InventorystockQuantityVsReorderLevel
} from '@src/features/inventory/interfaces/inventory.interface'; // Inventory interface
import { BadRequestError, ConflictError, NotFoundError } from '@src/shared/globals/helpers/error-handler';
import { convertToBaseUnit, getUnitCategory, utilMessage } from '@src/shared/globals/helpers/utils';

export class InventoryController {
  /**
   * Fetches all inventory items from the database.
   *
   * This method retrieves a list of inventory items that are not marked as logically deleted (softDelete: false).
   * It sends a successful response with the list of inventory items and an HTTP status of 200.
   *
   * @async
   * @function
   * @param {Request} req - The Express request object, which does not need to contain any body or params for this endpoint.
   * @param {Response} res - The Express response object, which will contain a JSON payload with the inventory items.
   *
   * @returns {Promise<void>} A promise that resolves to the response object containing the fetched inventory.
   */
  public async fetchInventory(req: Request, res: Response): Promise<void> {
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
   * Adds a new inventory item to the database.
   *
   * This method accepts input data from the request body, validates it using Joi schema, 
   *  Adds the new inventory item to the database after performing necessary validations.
   *
   * 1. Validates that the product has a unique SKU and product name.
   * 2. Ensures that the stock quantity is greater than 0.
   * 3. Validates that the reorder level is reasonable.
   * 
   * It returns a successful response with 
   * the newly created inventory item and an HTTP status of 201.
   *
   * @async
   * @function
   * @param {Request} req - The Express request object, which should contain the necessary body fields:
   *   - `supplier_products_id`: The ID of the product from the supplier products.   
   *   - `stock_quantity`: The quantity of the product in stock.
   *   - `reorder_level`: The stock level at which a reorder is triggered.
   *   - `last_restocked`: The date when the item was last restocked.
   *   - `unit_id`: The unit of measurement ID (e.g., kg, g, etc.).
   *   - `status`: The status of the inventory item (ACTIVE, INACTIVE, or DISCONTINUED).
   * 
   * Now on the unit conversion @function convert
   * 
   * /**
 * Converts the provided quantity into its base unit for consistent storage.
 * 
 * For each quantity (such as weight or length), a base unit is defined to standardize how data is stored and processed.
 * This ensures that all items are stored using a uniform measurement system, making it easier to handle various operations like
 * calculations, comparisons, and reporting. For example:
 * - For weight, kilograms (kg) may be converted into grams (g) because grams are the base unit for weight.
 * - For length, meters (m) may be converted into centimeters (cm), as centimeters are considered the base unit for length.
 * 
 * In the following conversion:
 * - `stock_quantity` is the quantity of the item being added or updated in inventory.
 * - `unitDetails.short_name` is the unit provided by the user (e.g., 'kg' for kilograms, 'm' for meters).
 * - `'g'` represents the target base unit, in this case, grams (for weight) or centimeters (for length), depending on the unit category.
 * 
 * This method ensures that all quantities are consistently stored in their respective base units, simplifying inventory tracking and
 * calculations across different unit systems.
 * 
 * @param {number} stock_quantity - The quantity of the item to be stored (e.g., 5 kg, 100 m).
 * @param {Object} unitDetails - An object containing details about the unit being used, including `short_name` (e.g., 'kg', 'm').
 * @param {string} baseUnit - The target base unit to which the quantity should be converted (e.g., 'g', 'cm').
 * 
 * @returns {Promise<number>} A promise that resolves to the converted quantity in the base unit (e.g., 5000 for 5 kg to g).
 * 
 * @example
 * // If the user inputs 5 kg, the stock quantity will be converted to 5000 grams (g)
 * await convert(stock_quantity, unitDetails.short_name, 'g'); // 5000
 
  * @param {Response} res - The Express response object, which will contain a JSON payload with the created inventory item.
   
  * @returns {Promise<void>} A promise that resolves to the response object containing the newly created inventory.
  */
  @joiValidation(inventorySchema)
  public async createInventory(req: Request, res: Response): Promise<void> {
    // eslint-disable-next-line prefer-const
    let { supplier_products_id, stock_quantity, reorder_level, unit_id } = req.body;

    // 1) Validate Unique Product Identifiers (SKU or product code)
    const existingProduct = await prisma.inventory.findFirst({
      where: {
        supplier_products_id
      } // Check if that suppliers product already exists
    });

    if (existingProduct) {
      throw new ConflictError(utilMessage.duplicateMessage('Product with the same  product name already exists.'));
    }

    // 2) Validate Quantity and Stock Level
    if (stock_quantity <= 0) {
      throw new BadRequestError('Stock quantity must be greater than 0.');
    }

    // 3) Set Reorder Level and Alerts
    if (reorder_level <= 0) {
      throw new BadRequestError('Reorder level must be a positive number.');
    }

    // 4) Fetch the unit details from the database (unitId)
    const unitDetails = await prisma.units.findUnique({
      where: { unit_id: unit_id }
    });

    if (!unitDetails) {
      throw new NotFoundError('Invalid unit ID provided');
    }

    let product_weight;

    // get unit category
    if (unitDetails.short_name !== 'bag' && unitDetails.short_name !== 'chicks') {
      const unitCategory = await getUnitCategory(unitDetails.short_name);

      // If the user inputs 5 kg, the stock quantity will be converted to 5000 grams (g)
      const { convertedValue, baseUnit } = await convertToBaseUnit(stock_quantity, unitDetails.short_name, unitCategory, false);
      product_weight = convertedValue;

      const newUnitId = await prisma.units.findUnique({
        where: { short_name: baseUnit }
      });

      unit_id = newUnitId?.unit_id;
    }

    reorder_level = Number(reorder_level);
    product_weight = stock_quantity;

    // ) Create New Inventory Item
    const newInventory: Inventory = await prisma.inventory.create({
      data: {
        supplier_products_id,
        product_weight,
        stock_quantity,
        reorder_level,
        last_restocked: new Date(),
        unit_id,
        status: 'ACTIVE', // Ensure proper status is set
        created_at: new Date(),
        updated_at: new Date(),
        softDelete: false
      }
    });

    // Send success message with the newly created inventory
    res.status(StatusCodes.CREATED).send(GetSuccessMessage(StatusCodes.CREATED, newInventory, 'Inventory item added successfully'));
  }

  /**
   * Updates an existing inventory item in the database.
   *
   * This method accepts the `inventoryId` parameter from the URL and the updated data from the request body.
   * It then updates the inventory item in the database and returns the updated item with a successful response.
   *
   * @async
   * @function
   * @param {Request} req - The Express request object, which should contain the following:
   *   - `inventoryId`: The ID of the inventory item to update (in the URL params).
   *   - The body should contain the fields to be updated:
   *     - `productName`: The updated name of the product.
   *     - `sku`: The updated SKU of the product.
   *     - `stock_quantity`: The updated quantity of the product.
   *     - `reorder_level`: The updated reorder level of the product.
   *     - `last_restocked`: The updated date when the item was last restocked.
   *     - `unit_id`: The updated unit of measurement ID.
   *     - `status`: The updated status of the inventory item.
   * @param {Response} res - The Express response object, which will contain the updated inventory item and a success message.
   *
   * @returns {Promise<void>} A promise that resolves to the response object containing the updated inventory.
   */
  @joiValidation(inventorySchema)
  public async updateInventory(req: Request, res: Response): Promise<void> {
    const { inventoryId } = req.params;
    // eslint-disable-next-line prefer-const
    let { reorder_level, last_restocked, unit_id, status } = req.body;

    // Fetch the current stock_quantity from the database
    const currentInventory = await prisma.inventory.findUnique({
      where: { inventoryId },
      select: { stock_quantity: true }
    });

    // If the inventory item is not found, handle the error
    if (!currentInventory) {
      throw new BadRequestError('item not found');
    }

    reorder_level = Number(reorder_level);

    // Attempt to update the inventory item in the database
    const updatedInventory: Inventory = await prisma.inventory.update({
      where: { inventoryId },
      data: {
        reorder_level,
        last_restocked,
        unit_id,
        status,
        updated_at: new Date()
      }
    });

    // Send success response with the updated inventory item
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, updatedInventory, 'Inventory updated successfully'));
  }

  /**
   *
   * Restock inventory
   *
   */

  @joiValidation(inventoryRestockSchema)
  public async restockInventory(req: Request, res: Response): Promise<void> {
    const { inventoryId } = req.params; // inventoryId as a string from request params
    const { stock_quantity }: { stock_quantity: number } = req.body; // stock_quantity is expected to be a number

    // Fetch the current inventory data
    const currentInventory: Pick<Inventory, 'stock_quantity' | 'reorder_level'> | null = await prisma.inventory.findUnique({
      where: { inventoryId },
      select: { stock_quantity: true, reorder_level: true } // Select relevant fields for restocking
    });

    // If the inventory item is not found, return an error
    if (!currentInventory) {
      throw new BadRequestError('Item not found');
    }

    // Calculate the updated stock quantity
    const updatedStockQuantity: number = Number(currentInventory.stock_quantity || 0) + Number(stock_quantity || 0);
    console.log('Updated Stock Quantity is ', updatedStockQuantity);

    // Update the inventory record with the new stock quantity and timestamps
    const updatedInventory: Inventory = await prisma.inventory.update({
      where: { inventoryId },
      data: {
        stock_quantity: updatedStockQuantity,
        last_restocked: new Date(), // Timestamp when stock was last restocked
        updated_at: new Date() // Timestamp when inventory was updated
      }
    });

    // Store restock information in the InventoryRestock table
    await prisma.inventoryRestock.create({
      data: {
        inventory_Id: inventoryId, // Foreign key reference to the inventory item
        new_stock_quantity: updatedStockQuantity, // The stock after restock
        old_stock_quantity: currentInventory.stock_quantity, // The previous stock before restock
        reorder_level: currentInventory.reorder_level, // Reorder level from the inventory
        restock_date: new Date(), // The current date when restock occurred
        softDelete: false // Mark as not soft deleted (default is false)
      }
    });

    // Send a success response with the updated inventory details
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, updatedInventory, 'Inventory updated successfully'));
  }

  /**
   *
   * fetch the restockItems db
   *
   */

  public async getAllRestocks(req: Request, res: Response): Promise<void> {
    // Fetch all restock records from the InventoryRestock table
    const restockRecords: InventoryRestock[] = await prisma.inventoryRestock.findMany({
      orderBy: {
        restock_date: 'desc'
      }
    });
    // Send a success response with all the restock records
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, restockRecords, 'Restock records fetched successfully'));
  }

  // public async restockInventory(req: Request, res: Response): Promise<void> {
  //   const { inventoryId } = req.params;
  //   // eslint-disable-next-line prefer-const
  //   let { stock_quantity } = req.body;

  //   // Fetch the current stock_quantity from the database
  //   const currentInventory = await prisma.inventory.findUnique({
  //     where: { inventoryId },
  //     select: { stock_quantity: true }
  //   });

  //   // If the inventory item is not found, handle the error
  //   if (!currentInventory) {
  //     throw new BadRequestError('item not found');
  //   }

  //   // Calculate the new stock quantity
  //   const updatedStockQuantity = Number(currentInventory.stock_quantity || 0) + Number(stock_quantity || 0);
  //   console.log('updated Stock Quantity is ', updatedStockQuantity);

  //   // Attempt to update the inventory item in the database
  //   const updatedInventory: Inventory = await prisma.inventory.update({
  //     where: { inventoryId },
  //     data: {
  //       stock_quantity: updatedStockQuantity,
  //       last_restocked: new Date(),
  //       updated_at: new Date()
  //     }
  //   });

  //   // store in the restock table

  //   // Send success response with the updated inventory item
  //   res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, updatedInventory, 'Inventory updated successfully'));
  // }

  /**
   * Soft deletes an inventory item from the database.
   *
   * Instead of permanently removing the item, this method sets the `softDelete` flag to `true`,
   * marking the item as deleted without physically removing it from the database.
   *
   * @async
   * @function
   * @param {Request} req - The Express request object, which contains the `inventoryId` parameter in the URL.
   * @param {Response} res - The Express response object, which will send an empty 204 response (No Content) upon success.
   *
   * @returns {Promise<void>} A promise that resolves to the response object indicating successful soft delete.
   */
  public async deleteInventory(req: Request, res: Response): Promise<void> {
    const { inventoryId } = req.params;

    // Soft delete the inventory item by setting softDelete flag to true
    // await prisma.inventory.update({
    //   where: { inventoryId },
    //   data: {
    //     softDelete: true, // Mark the item as logically deleted
    //     updated_at: new Date()
    //   }
    // });

    await prisma.inventory.delete({
      where: { inventoryId }
    });

    // Send a 204 (No Content) response indicating successful soft delete
    res.status(StatusCodes.NO_CONTENT).send(); // 204 No Content
  }

  /**
   * Fetches all inventory items from the database where reorder level is greater than stock quantity.
   *
   * This method retrieves a list of inventory items where reorder level is greater than the stock quantity.
   * It sends a successful response with the list of low stock items and an HTTP status of 200.
   *
   * @async
   * @function
   * @param {Request} req - The Express request object, which does not need to contain any body or params for this endpoint.
   * @param {Response} res - The Express response object, which will contain a JSON payload with the low stock items.
   *
   * @returns {Promise<void>} A promise that resolves to the response object containing the fetched low stock inventory.
   */
  public async fetchLowStockItems(req: Request, res: Response): Promise<void> {
    // Fetch inventory items where reorder_level > stock_quantity

    const lowStockItems = await prisma.$queryRaw<InventorystockQuantityVsReorderLevel[]>`
      SELECT "inventoryId", "stock_quantity", "reorder_level"
      FROM "Inventory" 
      WHERE "reorder_level" > "stock_quantity"
    `;

    // Check if any low stock items were found
    if (lowStockItems.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'No low stock items found.' });
      return;
    }

    // Send success message with the fetched low stock items
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, lowStockItems, 'Low stock items retrieved successfully'));
  }

  /**
   * Fetches all inventory sales tracking records.
   * This method retrieves all sales tracking records that have not been marked as soft deleted, ordered by restock date in descending order.
   *
   * @returns {Promise<void>} - Sends a response with a status of 200 and a success message containing the fetched sales tracking records.
   */
  public async getAllSalesTracking(req: Request, res: Response): Promise<void> {
    // Fetch all sales tracking records from the database
    const salesTrackingRecords: InventorySalesTracking[] = await prisma.inventorySalesTracking.findMany({
      where: {
        softDelete: false // Only include records that are not soft-deleted
      },
      orderBy: {
        restock_date: 'desc' // Order records by restock_date in descending order
      },
      include: {
        InventoryItemID: true // Include related inventory item details
      }
    });
    res.json(salesTrackingRecords);
    // Send a success response with the fetched records
    // res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, salesTrackingRecords, 'Sales tracking records fetched successfully'));
  }

  /**
   * Fetches inventory sales tracking records where `new_stock_quantity` is greater than `old_stock_quantity` or vice versa.
   * This method retrieves sales tracking records where stock quantities are either increasing or decreasing.
   *
   * @returns {Promise<void>} - Sends a response with a status of 200 and a success message containing the filtered sales tracking records.
   */
  public async getSalesTrackingByStockComparison(req: Request, res: Response): Promise<void> {
    // Fetch sales tracking records based on stock comparison
    const salesTrackingRecords: InventorySalesTracking[] = await prisma.inventorySalesTracking.findMany({
      where: {
        softDelete: false,
        OR: [
          {
            new_stock_quantity: {
              gt: 0 // Include records where new_stock_quantity is greater than 0
            }
          },
          {
            old_stock_quantity: {
              gt: 0 // Include records where old_stock_quantity is greater than 0
            }
          }
        ]
      },
      orderBy: {
        restock_date: 'desc' // Order records by restock_date in descending order
      },
      include: {
        InventoryItemID: true // Include related inventory item details
      }
    });
    res.json(salesTrackingRecords);
    // Send a success response with the filtered records
    //res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, salesTrackingRecords, 'Sales tracking records with stock comparison fetched successfully'));
  }

  /**
   * Fetches inventory sales tracking records where `new_stock_quantity` or `old_stock_quantity` is zero.
   * This method retrieves sales tracking records where either new or old stock quantities are zero, typically indicating stockouts or no movement.
   *
   * @returns {Promise<void>} - Sends a response with a status of 200 and a success message containing the filtered sales tracking records.
   */
  public async getSalesTrackingByZeroStock(req: Request, res: Response): Promise<void> {
    // Fetch sales tracking records with zero stock quantity
    const salesTrackingRecords: InventorySalesTracking[] = await prisma.inventorySalesTracking.findMany({
      where: {
        softDelete: false,
        OR: [
          {
            new_stock_quantity: 0 // Include records where new_stock_quantity is 0
          },
          {
            old_stock_quantity: 0 // Include records where old_stock_quantity is 0
          }
        ]
      },
      orderBy: {
        restock_date: 'desc' // Order records by restock_date in descending order
      },
      include: {
        InventoryItemID: true // Include related inventory item details
      }
    });

    // Send a success response with the filtered records
    res.json(salesTrackingRecords);
    //res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, salesTrackingRecords, 'Sales tracking records with zero stock fetched successfully'));
  }
}
