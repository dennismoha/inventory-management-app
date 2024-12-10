// controllers/SupplierPricingController.ts
import { Request, Response } from 'express';
import { supplierPricingSchema } from '@src/features/suppliers/schema/suppliers-schema';
import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators';
import { StatusCodes } from 'http-status-codes';
import { utilMessage } from '@src/shared/globals/helpers/utils';
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client to interact with the database
import { SupplierPricing } from '@src/features/suppliers/interfaces/supplier.interface';


export class SupplierPricingController {
  /**
   * Fetch all supplier pricing entries.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public async fetchSupplierPricing(req: Request, res: Response): Promise<void> {
    const pricing: SupplierPricing[] = await prisma.supplierPricing.findMany();
    const message = utilMessage.fetchedMessage('supplier pricing');
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, pricing, message)); 
  }

  /**
   * Create a new supplier pricing entry.
   * @param req The Express request object.
   * @param res The Express response object.
   */

  @joiValidation(supplierPricingSchema)
  public async createSupplierPricing(req: Request, res: Response): Promise<void> {
   

    const { supplier_id, product_id, unit_id, price, effective_date } = req.body;
   
      const pricing = await prisma.supplierPricing.create({
        data: { supplier_id, product_id, unit_id, price, effective_date }
      });
      res.status(StatusCodes.CREATED).json(pricing);
   
  }

  /**
   * Update an existing supplier pricing entry.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public async updateSupplierPricing(req: Request, res: Response): Promise<void> {
    const { supplier_pricing } = req.params;
    const { supplier_id, product_id, unit_id, price, effective_date } = req.body;
   
      const updatedPricing = await prisma.supplierPricing.update({
        where: { supplier_pricing },
        data: { supplier_id, product_id, unit_id, price, effective_date }
      });
      res.status(StatusCodes.OK).json(updatedPricing);
    
  }

  /**
   * Delete an existing supplier pricing entry.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public async deleteSupplierPricing(req: Request, res: Response): Promise<void> {
    const { supplier_pricing } = req.params;
   
      await prisma.supplierPricing.delete({
        where: { supplier_pricing }
      });
      res.status(StatusCodes.NO_CONTENT).send();
    
  }
}
