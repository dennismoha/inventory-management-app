import { Request, Response } from 'express';
import { transactionSchema } from '@src/features/transactions/schema/transactions-schema';
import { joiValidation } from '@src/shared/globals/decorators/joi-validation-decorators';
import { StatusCodes } from 'http-status-codes';
import { utilMessage } from '@src/shared/globals/helpers/utils';
import GetSuccessMessage from '@src/shared/globals/helpers/success-messages';
import prisma from '@src/shared/prisma/prisma-client'; // Prisma client to interact with the database
import { Transaction, TransactionProductItems } from '@src/features/transactions/interfaces/transaction.interface';
// import { Decimal } from '@prisma/client/runtime/library';
import { BadRequestError } from '@src/shared/globals/helpers/error-handler';

export class TransactionsController {
  /**
   * Fetch all transactions.  
   */
  public async fetchTransactions(req: Request, res: Response): Promise<void> {
    const transactions: Transaction[] = await prisma.transaction.findMany({
      include: {    
        customer: true, // If customer is provided,
        TransactionProduct:true
      }
    });
    const message = utilMessage.fetchedMessage('transactions');
    res.status(StatusCodes.OK).send(GetSuccessMessage(StatusCodes.OK, transactions, message));
  }

  /**
   * Create a new transaction.
   */
  @joiValidation(transactionSchema)
  public async createTransaction(req: Request, res: Response): Promise<void> {
    const {
        cartProducts, // Array of cartProducts
        customerId,
        paymentMethod,
        totalCost,
        
    }: TransactionProductItems = req.body; // Typecasting the request body to ProductItems

    // Step 1: Generate a unique transaction ID
    const transactionId = crypto.randomUUID();

    // Step 2: Initialize transaction-related data
    let transaction : Transaction;

    // Step 3: Check if customer exists (if provided), otherwise handle as a generic transaction
    if (customerId) {
        // Step : Create a new transaction record for the customer
        transaction = await prisma.transaction.create({
            data: {
                transactionId,
                customerId,
                totalCost: totalCost.total, // Total cost (after VAT & discounts)
                paymentMethod,
                subtotal: totalCost.subtotal
              
            }
        });
    } else {  
        transaction = await prisma.transaction.create({
            data: {
              transactionId,            
              totalCost: totalCost.total, // Total cost (after VAT & discounts)
              paymentMethod,
              subtotal: totalCost.subtotal
            }
        });
    }

    //  Process each cart product and check inventory
    const transactionProducts = [];

    for (const product of cartProducts) {
        //  Check stock availability for each product
        const inventory = await prisma.inventory.findUnique({
            where: { supplier_products_id: product.supplier_products_id }
        });

        console.log('this new ============== ', inventory);

        if (!inventory || Number(inventory.stock_quantity) < product.quantity) {
            throw new BadRequestError(`Insufficient stock for product: ${product.productName} ${inventory?.stock_quantity} ${product.quantity}`);
        }

        // Step Deduct the quantity from the inventory
        await prisma.inventory.update({
            where: { supplier_products_id: product.supplier_products_id },
            data: {
                stock_quantity: Number(inventory.stock_quantity) - product.quantity
            }
        });

        // Step Calculate total cost for this product (taking VAT and discount into account)
        const productTotalCost = (product.price * product.quantity) * (1 + product.VAT / 100) - product.discount;
        const productSubTotalCost = (product.price * product.quantity);

        // Step Prepare the transaction product data
        transactionProducts.push({
          inventoryId: product.inventoryId, 
          stock_quantity: product.stock_quantity,
           VAT:  Number(product.VAT),
          supplier_products_id: product.supplier_products_id,
            quantity: product.quantity,
            productName: product.productName,
            price: product.price,
            discount: Number(product.discount),
            productSubTotalCost,
            productTotalCost,
            transactionId // Link to the current transaction
        });
    }
    
    // Step  Create the transaction products in the database
    await prisma.transactionProduct.createMany({
        data: transactionProducts
    });

    // Step 6: Send response with success message
    const message = utilMessage.created('transaction');
    res.status(StatusCodes.CREATED).send(GetSuccessMessage(StatusCodes.CREATED, transaction, message));
}  


  // @joiValidation(transactionSchema)
  // public async createTransaction(req: Request, res: Response): Promise<void> {
  //   const {
  //     supplierProductId,
  //     quantity,
  //     productName,
  //     price,
  //     discount,
  //     vat,
  //     customerId,
  //     totalCost,
  //     paymentMethod,
  //     subtotal
  //   } = req.body;

  //     // Step 1: Generate a unique transaction ID
  //     const transactionId = crypto.randomUUID();

  //     // Step 2: Check if the quantity is available in stock
  //     const inventory = await prisma.inventory.findUnique({
  //       where: { supplier_products_id: supplierProductId }
  //     });
  
  //     if (!inventory || inventory.stock_quantity < quantity) {
  //      throw new BadRequestError('insufficient stock');
  //     }
  
  //     // Step 3: Deduct the quantity from the inventory
  //     await prisma.inventory.update({
  //       where: { supplier_products_id: supplierProductId },
  //       data: {
  //         stock_quantity: Number(inventory.stock_quantity) - quantity
  //       }
  //     });

  //     // add customers update the customer details with the transaction details. we will need a customer transaction table
  //     let transaction ;
  //     if(!customerId) {
  //          // Create the new transaction entry in the database
  //    transaction = await prisma.transaction.create({
  //     data: {
  //       transactionId ,
  //       supplierProductId,
  //       quantity: quantity,
  //       productName,
  //       price: price,
  //       discount: discount,
  //       vat: vat,
  //       totalCost,
  //       paymentMethod,
  //       subtotal // Subtotal before VAT
  //     }
  //   });
  //     }else {
  //          // Create the new transaction entry in the database
  //    transaction = await prisma.transaction.create({
  //     data: {
  //       transactionId ,
  //       supplierProductId,
  //       quantity: quantity,
  //       productName,
  //       price: price,
  //       discount: discount,
  //       vat: vat,
  //       customerId,

  //       totalCost,
  //       paymentMethod,
  //       subtotal // Subtotal before VAT
  //     }
  //   });
  //     }
 

  //   const message = utilMessage.created('transaction');
  //   res.status(StatusCodes.CREATED).send(GetSuccessMessage(StatusCodes.CREATED, transaction, message));
  // }

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
