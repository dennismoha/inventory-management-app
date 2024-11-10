import Joi, { ObjectSchema } from 'joi';
// SupplierProducts Validation Schema
export const supplierProductSchema: ObjectSchema = Joi.object().keys({
    supplier_id: Joi.string().uuid().required(),
    product_id: Joi.string().uuid().required(),
  });
  
// SupplierPricing Validation Schema
export const supplierPricingSchema: ObjectSchema = Joi.object().keys({
    supplier_id: Joi.string().uuid().required(),
    product_id: Joi.string().uuid().required(),
    unit_id: Joi.string().uuid().required(),
    price: Joi.number().precision(2).required(),
    effective_date: Joi.date().required(),
  });
  

  // Suppliers Validation Schema
export const supplierSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().required(),
  });