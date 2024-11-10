import { Category, SubCategory } from '@src/features/categories/interfaces/categories.interface';
import { Product } from '@src/features/products/interfaces/product.interface';
import { ProductUnit } from '@src/features/products/interfaces/product.interface';
import { Unit } from '@src/features/units/interfaces/units.interface';
import { Supplier, SupplierPricing, SupplierProduct } from '@src/features/suppliers/interfaces/supplier.interface';


type success_data =SupplierPricing | SupplierPricing[] | SupplierProduct | SupplierProduct[] | Supplier | Supplier[] | Unit | Unit[] | Category | Category[] | SubCategory[] | Product[] | Product | ProductUnit | ProductUnit[] | [];

export default function GetSuccessMessage(statusCode: number, data: success_data, statusMessage: string) {
    return {
        statusCode: statusCode || 200, // Default to 200 if statusCode is not provided
        data: data || null, // Default to null if data is not provided
        status: statusMessage || 'Success' // Default to 'Success' if statusMessage is not provided
    };
}
