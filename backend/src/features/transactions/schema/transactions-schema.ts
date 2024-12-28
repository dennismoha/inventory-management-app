import Joi from 'joi';

export const transactionSchema = Joi.object().keys({
  supplier_products_id: Joi.string().uuid().required(),  // Use `supplier_products_id` (UUID)
  quantity: Joi.number().min(0).required(),  // Use `quantity` (positive number)
  productName: Joi.string().min(1).max(255).required(),  // `productName` (non-empty string)
  price: Joi.number().precision(2).required(),  // `price` (number with precision of 2 decimal places)
  discount: Joi.number().precision(2).min(0).required(),  // `discount` (non-negative number)
  vat: Joi.number().precision(2).min(0).required(),  // `vat` (non-negative number)
  customerId: Joi.string().uuid().allow(null),  // `customerId` (UUID, can be null)
  transactionDateCreated: Joi.date().iso().required(),  // `transactionDateCreated` (valid ISO date)
  paymentMethod: Joi.string().valid('card', 'paypal', 'cash', 'bank-transfer').required(),  // `paymentMethod` (valid string)
  subtotal: Joi.number().precision(2).min(0).required(),  // `subtotal` (non-negative number)
  totalCost: Joi.number().precision(2).min(0).required()  // `totalCost` (non-negative number)
});
