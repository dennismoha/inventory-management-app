// controllers/SuppliersController.ts
import { Request, Response } from 'express';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client to interact with the database
import { supplierSchema } from '@src/features/suppliers/schema/suppliers-schema'; 
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators';
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages';
import { Supplier } from '@src/features/suppliers/interfaces/supplier.interface';
import { ConflictError } from '@src/shared/globals/helpers/error-handler';



export class SuppliersController {
  /**
   * Fetch all suppliers.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public async fetchSuppliers(req: Request, res: Response): Promise<void> {
    const suppliers:Supplier[] = await prisma.suppliers.findMany({
      include: {      
        SupplierProducts: true, // Include related Products
        SupplierPricing: true
      }
    });
    const message = 'fetched suppliers succesfully';
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, suppliers, message));    
  }

  /**
   * Create a new supplier.
   * @param req The Express request object.
   * @param res The Express response object.
   */

  @joiValidation(supplierSchema)
  public async createSupplier(req: Request, res: Response): Promise<void> {
   

    const { name, address, contact } = req.body;
    const message = 'fetched suppliers';

     // Check if category_slug already exists
     const existingSupplier = await prisma.suppliers.findUnique({
      where: { name }
    });

    if (existingSupplier) {
      throw new ConflictError('supplier arleady exists');
    }

   
      const supplier: Supplier = await prisma.suppliers.create({
        data: { name, address, contact }
      });
      res.status(StatusCodes.CREATED).send(GetSuccessMessage(StatusCodes.CREATED, supplier, message));    
      //json(supplier);
    
  }

  /**
   * Update an existing supplier.
   * @param req The Express request object.
   * @param res The Express response object.
   */

  @joiValidation(supplierSchema)
  public async updateSupplier(req: Request, res: Response): Promise<void> {
    const { supplier_id } = req.params;
    const { name, address, contact } = req.body;
    const message = 'supplier updated succesfully';
    
      const updatedSupplier: Supplier = await prisma.suppliers.update({
        where: { supplier_id },
        data: { name, address, contact }
      });
      res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, updatedSupplier, message)); 
      //json(updatedSupplier);
  
  }

  /**
   * Delete an existing supplier.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public async deleteSupplier(req: Request, res: Response): Promise<void> {
    const { supplier_id } = req.params;
  
      await prisma.suppliers.delete({
        where: { supplier_id }
      });
      res.status(StatusCodes.NO_CONTENT).send();
    
  }
}
