import { Request, Response } from 'express';
import { transactionSchema } from '@src/features/transactions/schema/transactions-schema';
import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators';
import { StatusCodes } from 'http-status-codes';
import { utilMessage } from '@src/shared/globals/helpers/utils';
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client to interact with the database
import { Transaction } from '@src/features/transactions/interfaces/transaction.interface';
// import { Decimal } from '@prisma/client/runtime/library';
import { BadRequestError } from '@src/shared/globals/helpers/error-handler';

export class TransactionsController {
  /**
   * Fetch all transactions.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public async fetchTransactions(req: Request, res: Response): Promise<void> {
    const transactions: Transaction[] = await prisma.transaction.findMany({
      include: {
        supplierProduct: {
          include: {
            product: true,
            supplier: true
          }
        },
        customer: true // If customer is provided
      }
    });
    const message = utilMessage.fetchedMessage('transactions');
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, transactions, message));
  }

  /**
   * Create a new transaction.
   * @param req The Express request object containing the transaction details in the body.
   * @param res The Express response object used to send the response back to the client.
   */
  @joiValidation(transactionSchema)
  public async createTransaction(req: Request, res: Response): Promise<void> {
    const {
      supplierProductId,
      quantity,
      productName,
      price,
      discount,
      vat,
      customerId,
      totalCost,
      paymentMethod,
      subtotal
    } = req.body;

      // Step 1: Generate a unique transaction ID
      const transactionId = crypto.randomUUID();

      // Step 2: Check if the quantity is available in stock
      const inventory = await prisma.inventory.findUnique({
        where: { supplier_products_id: supplierProductId }
      });
  
      if (!inventory || inventory.stock_quantity < quantity) {
       throw new BadRequestError('insufficient stock');
      }
  
      // Step 3: Deduct the quantity from the inventory
      await prisma.inventory.update({
        where: { supplier_products_id: supplierProductId },
        data: {
          stock_quantity: Number(inventory.stock_quantity) - quantity
        }
      });

      // add customers update the customer details with the transaction details. we will need a customer transaction table
      let transaction ;
      if(!customerId) {
           // Create the new transaction entry in the database
     transaction = await prisma.transaction.create({
      data: {
        transactionId ,
        supplierProductId,
        quantity: quantity,
        productName,
        price: price,
        discount: discount,
        vat: vat,
        totalCost,
        paymentMethod,
        subtotal // Subtotal before VAT
      }
    });
      }else {
           // Create the new transaction entry in the database
     transaction = await prisma.transaction.create({
      data: {
        transactionId ,
        supplierProductId,
        quantity: quantity,
        productName,
        price: price,
        discount: discount,
        vat: vat,
        customerId,

        totalCost,
        paymentMethod,
        subtotal // Subtotal before VAT
      }
    });
      }
 

    const message = utilMessage.created('transaction');
    res.status(StatusCodes.CREATED).send(GetSuccessMessage(StatusCodes.CREATED, transaction, message));
  }

  // /**
  //  * Update an existing transaction.
  //  * @param req The Express request object containing the transaction ID in the params and updated details in the body.
  //  * @param res The Express response object used to send the response back to the client.
  //  */
  // @joiValidation(transactionSchema)
  // public async updateTransaction(req: Request, res: Response): Promise<void> {
  //   const { transactionId } = req.params; // Extract the transaction ID from the URL params
  //   const { supplier_products_id, quantity, productName, price, discount, vat, customerId, transactionDateCreated } = req.body;

  //   // Update the existing transaction entry in the database
  //   const updatedTransaction = await prisma.transaction.update({
  //     where: { transactionId },
  //     data: {
  //       supplier_products_id,
  //       quantity: new Decimal(quantity),
  //       productName,
  //       price: new Decimal(price),
  //       discount: new Decimal(discount),
  //       vat: new Decimal(vat),
  //       customerId,
  //       transactionDateCreated: new Date(transactionDateCreated),
  //       totalCost: new Decimal(price * quantity).minus(new Decimal(discount)).plus(new Decimal(vat)),
  //       paymentMethod: req.body.paymentMethod || null,
  //       subtotal: new Decimal(price * quantity).minus(new Decimal(discount))
  //     }
  //   });

  //   const message = utilMessage.updateMessage('transaction');
  //   res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, updatedTransaction, message));
  // }

  /**
   * Delete an existing transaction.
   * @param req The Express request object containing the transaction ID in the params.
   * @param res The Express response object used to send the response back to the client.
   */
  // public async deleteTransaction(req: Request, res: Response): Promise<void> {
  //   const { transactionId } = req.params;

  //   // Delete the transaction entry from the database
  //   await prisma.transaction.delete({
  //     where: { transactionId }
  //   });

  //   res.status(StatusCodes.NO_CONTENT).send();
  // }
};
