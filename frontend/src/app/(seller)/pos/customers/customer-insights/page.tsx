'use client';
import React, { useState } from 'react';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import { useGetTotalSalesForEachCustomerQuery } from '@/app/redux/api/inventory-api';
import { CustomerTotalSalesInterface, GetTransactionDateData } from '../interface/customer-interface';

const CustomerCard = () => {
  // Sample customer data (multiple customers)
  const { data, isLoading, isError } = useGetTotalSalesForEachCustomerQuery();
  console.log('data from backend is ', data);
  //   const customers = [
  //     {
  //         "customerId": "567410a6-82cb-41f9-870f-746dfbc18227",
  //         "firstName": "joad",
  //         "lastName": "vavf",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Mwonga-Goat & Sheep Feed",
  //                 "totalSales": 3400
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                 "totalSales": 796.4
  //             },
  //             {
  //                 "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "FarmFeed Suppliers-Premium Cattle Feed",
  //                 "totalSales": 272.2
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 2994
  //             },
  //             {
  //                 "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 180
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "cd2cc0e6-6d7f-44de-adb7-1e835deb49a6",
  //                 "transactionDateCreated": "2024-12-28T20:28:07.071Z",
  //                 "totalCost": 404.8,
  //                 "subtotal": 400,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "0995089d-7a52-457f-896a-6472a416daed",
  //                 "transactionDateCreated": "2024-12-28T20:28:44.782Z",
  //                 "totalCost": 404.8,
  //                 "subtotal": 400,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "4a30da77-1ed7-494e-a9fb-dba557252675",
  //                 "transactionDateCreated": "2024-12-28T20:30:08.833Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "64672ae8-f87b-40a6-b639-58307af2e5e5",
  //                 "transactionDateCreated": "2024-12-28T20:39:35.838Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "b0e0d0f1-bbd6-46b4-b5be-9dad22bf02b8",
  //                 "transactionDateCreated": "2024-12-28T20:44:38.149Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "e7da5d3b-8966-44d5-b548-5bdea2f37eb6",
  //                 "transactionDateCreated": "2024-12-28T20:45:44.886Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "e070866a-dc22-49d8-9047-e1b45f101c08",
  //                 "transactionDateCreated": "2024-12-28T20:46:56.426Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "986273c0-47fe-426a-8850-4e565c38d7b9",
  //                 "transactionDateCreated": "2024-12-28T20:48:38.243Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "fa8c6b39-42a4-4cd7-9c1a-9bd6a385b1c5",
  //                 "transactionDateCreated": "2024-12-28T20:49:12.670Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "1186fc3a-8d9c-403d-b40f-5771e2cb3839",
  //                 "transactionDateCreated": "2024-12-28T20:50:35.737Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "79adf27a-e08d-4ba0-af25-6f0d97ee385e",
  //                 "transactionDateCreated": "2024-12-28T20:51:41.507Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "ef97e0da-de16-423b-bc99-0c7f7e681e05",
  //                 "transactionDateCreated": "2024-12-28T20:52:09.198Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "f5222017-1531-4514-b2e0-3ae2cefacb47",
  //                 "transactionDateCreated": "2024-12-28T20:52:46.268Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 600,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "9a712d30-a417-4858-b1f5-3baf347ccf58",
  //                 "transactionDateCreated": "2024-12-28T20:53:39.991Z",
  //                 "totalCost": 600,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 600,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "623d7c21-c09c-4b9c-9435-fd22e17f85fb",
  //                 "transactionDateCreated": "2024-12-28T20:54:00.811Z",
  //                 "totalCost": 1000,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 1000,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 5,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "148fa56d-0714-4b4e-964c-362805351e44",
  //                 "transactionDateCreated": "2024-12-28T20:55:25.978Z",
  //                 "totalCost": 703.4,
  //                 "subtotal": 700,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 1000,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 5,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                         "productTotalCost": 202.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 92.2,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "487c08f9-9c97-40c5-afc6-4a3ab382b72d",
  //                 "transactionDateCreated": "2025-01-07T08:21:55.924Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "207e47b2-97d5-4079-93e4-74fd17309eec",
  //                 "transactionDateCreated": "2025-01-07T08:58:08.367Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "37c37dea-316c-48ac-8f46-6ea7d7d25b3f",
  //                 "transactionDateCreated": "2025-01-07T09:12:24.851Z",
  //                 "totalCost": 772,
  //                 "subtotal": 800,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "802290a3-f19d-46c2-b0ed-fbf6d6334855",
  //                 "transactionDateCreated": "2025-01-07T09:16:41.087Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "087c93cb-80e3-442b-9991-3a717829cacb",
  //                 "transactionDateCreated": "2025-01-14T08:08:42.432Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "a8a0aa58-288a-425c-97f3-8b96d69a7adf",
  //                 "transactionDateCreated": "2025-01-14T08:54:55.790Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "e6ebbf30-3ca3-42d9-bbd0-8a5680cd0037",
  //                 "transactionDateCreated": "2025-01-16T14:01:19.650Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "customerId": "b342abcf-9292-43f9-886e-7d39a06e3a7b",
  //         "firstName": "Johnathan",
  //         "lastName": "Doe",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "FarmFeed Suppliers-Premium Cattle Feed",
  //                 "totalSales": 464.4
  //             },
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Mwonga-Goat & Sheep Feed",
  //                 "totalSales": 400
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                 "totalSales": 1790.4
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 4994
  //             },
  //             {
  //                 "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 4740
  //             },
  //             {
  //                 "supplier_products_id": "60ac9483-f9a4-4cc0-9b1c-de38f9ab19f0",
  //                 "supplierProduct": "isinya",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 200
  //             },
  //             {
  //                 "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 60
  //             },
  //             {
  //                 "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                 "supplierProduct": "kenchick",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 60
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "251da32d-127e-462b-b1f6-d25b32812b6a",
  //                 "transactionDateCreated": "2024-12-29T08:47:17.743Z",
  //                 "totalCost": 584.8,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 194.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                         "productTotalCost": 202.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "b1974241-4401-4714-b8c6-7821d3e3f95a",
  //                 "transactionDateCreated": "2025-01-07T07:22:02.770Z",
  //                 "totalCost": 2940,
  //                 "subtotal": 3000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 2998,
  //                         "productSubTotalCost": 3000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "3ffdff48-212b-4e1d-8a3c-485a7ef7c7c9",
  //                 "transactionDateCreated": "2025-01-07T08:09:17.387Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "cf8f52ed-b022-416d-998c-c9bab66d80be",
  //                 "transactionDateCreated": "2025-01-07T08:12:07.190Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "af6fcdaa-177e-4c1f-88c6-197d87512077",
  //                 "transactionDateCreated": "2025-01-07T08:12:10.065Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "c0f24f7c-46dd-4b5a-8c2b-31155a04b2ea",
  //                 "transactionDateCreated": "2025-01-07T08:12:12.388Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "513e9a8d-77c4-4d0e-915b-3599dd762a48",
  //                 "transactionDateCreated": "2025-01-07T08:12:13.928Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "08b35933-b86a-44b4-9ef9-b97db66130f6",
  //                 "transactionDateCreated": "2025-01-07T08:12:25.467Z",
  //                 "totalCost": 588,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 598,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "5fc2c597-1cb0-477d-ad4e-719f093f92cc",
  //                 "transactionDateCreated": "2025-01-07T08:57:06.387Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "b0cac79e-365e-4261-84d5-3f6740e222cb",
  //                 "transactionDateCreated": "2025-01-07T09:16:16.015Z",
  //                 "totalCost": 1880,
  //                 "subtotal": 2000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "d3c281f0-ffdf-4afb-bd0d-d2949d838a99",
  //                 "transactionDateCreated": "2025-01-13T10:31:20.528Z",
  //                 "totalCost": 3520,
  //                 "subtotal": 4400,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 4380,
  //                         "productSubTotalCost": 4400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 22,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "a0a6e556-02c3-43bf-b881-7ca88fc55bd7",
  //                 "transactionDateCreated": "2025-01-13T14:38:41.463Z",
  //                 "totalCost": 2690,
  //                 "subtotal": 2740,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "003eaadc-cf31-47c6-8c19-17cd839a81c8",
  //                 "transactionDateCreated": "2025-01-13T14:38:43.150Z",
  //                 "totalCost": 2690,
  //                 "subtotal": 2740,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "b41091b4-2f19-4345-aca4-3869d8214ad4",
  //                 "transactionDateCreated": "2025-01-13T14:39:02.073Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "60ac9483-f9a4-4cc0-9b1c-de38f9ab19f0",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "31a6d277-8d9a-4bf1-9409-88326c117e98",
  //                 "transactionDateCreated": "2025-01-13T14:39:26.754Z",
  //                 "totalCost": 60,
  //                 "subtotal": 60,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 60,
  //                         "productSubTotalCost": 60,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "bd09ab85-4fc0-4a28-bdef-3b6447846b41",
  //                 "transactionDateCreated": "2025-01-13T14:39:30.854Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "2091a5b3-862b-4843-bba0-9b1f02cbc9ae",
  //                 "transactionDateCreated": "2025-01-14T08:54:07.724Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "90775273-623a-47e0-b5b6-90b60098dad1",
  //                 "transactionDateCreated": "2025-01-14T08:56:51.023Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "23c2619a-8584-42aa-aa6c-443f62f89ab7",
  //                 "transactionDateCreated": "2025-01-14T11:15:07.292Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "5655a6ba-0890-423d-87b3-89429515a70b",
  //                 "transactionDateCreated": "2025-01-14T11:22:40.992Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "59d5aeab-f284-417d-9491-f4856ef2bae9",
  //                 "transactionDateCreated": "2025-01-14T11:26:44.789Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "e2f9a509-d028-4863-ab80-31cced6adc3d",
  //                 "transactionDateCreated": "2025-01-14T13:57:21.612Z",
  //                 "totalCost": 30,
  //                 "subtotal": 30,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 30,
  //                         "productSubTotalCost": 30,
  //                         "VAT": 0,
  //                         "price": 30,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "kenchick"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "aaf14ff9-f4b8-44bc-9516-e71db70fd26e",
  //                 "transactionDateCreated": "2025-01-16T13:58:59.538Z",
  //                 "totalCost": 30,
  //                 "subtotal": 30,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 30,
  //                         "productSubTotalCost": 30,
  //                         "VAT": 0,
  //                         "price": 30,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "kenchick"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "customerId": "13965ea5-5a64-4fb4-a593-8eb694011a72",
  //         "firstName": "Elizabeth",
  //         "lastName": "Nyambura",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Mwonga-Goat & Sheep Feed",
  //                 "totalSales": 2200
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                 "totalSales": 1198.8
  //             },
  //             {
  //                 "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "FarmFeed Suppliers-Premium Cattle Feed",
  //                 "totalSales": 554.4
  //             },
  //             {
  //                 "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 40
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 9988
  //             },
  //             {
  //                 "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                 "supplierProduct": "isinya",
  //                 "products": "Dog Food - Adult Formula",
  //                 "totalSales": 400
  //             },
  //             {
  //                 "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                 "supplierProduct": "kenchick",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 90
  //             },
  //             {
  //                 "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 180
  //             },
  //             {
  //                 "supplier_products_id": "60ac9483-f9a4-4cc0-9b1c-de38f9ab19f0",
  //                 "supplierProduct": "isinya",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 200
  //             },
  //             {
  //                 "supplier_products_id": "919f4caa-30d8-4b70-bf31-58296c774d9e",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 100
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "2f30ecde-a8b9-4a4b-b5b0-b2c1d77b7a9c",
  //                 "transactionDateCreated": "2024-12-28T21:47:31.059Z",
  //                 "totalCost": 703.4,
  //                 "subtotal": 700,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 1000,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 5,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                         "productTotalCost": 202.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 92.2,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "56a15d0c-b123-4c38-9fee-370e4a8fbfbf",
  //                 "transactionDateCreated": "2024-12-28T21:47:41.285Z",
  //                 "totalCost": 703.4,
  //                 "subtotal": 700,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 1000,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 5,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                         "productTotalCost": 202.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 92.2,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "22ecf895-3735-430b-902e-4791f481ab1b",
  //                 "transactionDateCreated": "2025-01-07T08:10:24.029Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "918c2352-baaf-47ca-92f6-8f2d9c777928",
  //                 "transactionDateCreated": "2025-01-07T08:11:40.273Z",
  //                 "totalCost": 392,
  //                 "subtotal": 400,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 398,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "842f7ae5-3288-4364-af2a-2ea82d215fb9",
  //                 "transactionDateCreated": "2025-01-13T14:39:18.450Z",
  //                 "totalCost": 20,
  //                 "subtotal": 20,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "c407f9a9-85c2-437e-bbd3-aa64c74ed2fb",
  //                 "transactionDateCreated": "2025-01-14T08:53:27.535Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "a3d785e3-ac9b-4bc5-9b56-988118761d19",
  //                 "transactionDateCreated": "2025-01-14T09:31:31.524Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "e925c80b-1699-4049-89a3-2cb9ce8e6bcd",
  //                 "transactionDateCreated": "2025-01-14T09:31:41.980Z",
  //                 "totalCost": 2940,
  //                 "subtotal": 3000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 2998,
  //                         "productSubTotalCost": 3000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "8a137aab-e139-41cf-a3b9-6fce23572b27",
  //                 "transactionDateCreated": "2025-01-14T09:31:43.356Z",
  //                 "totalCost": 2940,
  //                 "subtotal": 3000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 2998,
  //                         "productSubTotalCost": 3000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "ce59615d-be55-481c-aa88-da091a6d1478",
  //                 "transactionDateCreated": "2025-01-14T11:22:25.253Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "2f02bd0b-9fe2-431b-a060-e42877afa854",
  //                 "transactionDateCreated": "2025-01-14T11:43:33.835Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "02408d46-0341-4452-ab3e-7b71dadfffd6",
  //                 "transactionDateCreated": "2025-01-14T13:54:39.681Z",
  //                 "totalCost": 2132,
  //                 "subtotal": 2200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 60,
  //                         "productSubTotalCost": 60,
  //                         "VAT": 0,
  //                         "price": 30,
  //                         "discount": 0,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "kenchick"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "60ac9483-f9a4-4cc0-9b1c-de38f9ab19f0",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "919f4caa-30d8-4b70-bf31-58296c774d9e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 100,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "345274a0-6cc4-4972-9926-c5db1c276c43",
  //                 "transactionDateCreated": "2025-01-16T14:00:38.553Z",
  //                 "totalCost": 180,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 190,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "cc60e2ce-f614-4605-a335-9480ebf9c4cf",
  //                 "transactionDateCreated": "2025-01-16T14:04:56.704Z",
  //                 "totalCost": 1980,
  //                 "subtotal": 2000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 30,
  //                         "productSubTotalCost": 30,
  //                         "VAT": 0,
  //                         "price": 30,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "kenchick"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "customerId": "e332706c-6b4b-4136-9572-df7b8a31c215",
  //         "firstName": "Joseph",
  //         "lastName": "Ikiara",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Mwonga-Goat & Sheep Feed",
  //                 "totalSales": 800
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                 "totalSales": 996.4
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 4990
  //             },
  //             {
  //                 "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Premium Cattle Feed",
  //                 "totalSales": 270
  //             },
  //             {
  //                 "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 180
  //             },
  //             {
  //                 "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                 "supplierProduct": "isinya",
  //                 "products": "Dog Food - Adult Formula",
  //                 "totalSales": 1000
  //             },
  //             {
  //                 "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 20
  //             },
  //             {
  //                 "supplier_products_id": "919f4caa-30d8-4b70-bf31-58296c774d9e",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 100
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "ec1f12a9-dfb8-432e-9803-ec83cf2d5f73",
  //                 "transactionDateCreated": "2024-12-29T08:42:59.386Z",
  //                 "totalCost": 609.2,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 400,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                         "productTotalCost": 202.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "11b37c56-1494-4f88-85b8-51d263213f8e",
  //                 "transactionDateCreated": "2025-01-07T08:09:53.437Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "ef45acff-a51a-4044-9df4-e6c899f13c27",
  //                 "transactionDateCreated": "2025-01-07T08:57:15.407Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "09762a59-3187-40bb-b387-00fdd7f7aaea",
  //                 "transactionDateCreated": "2025-01-07T09:00:45.641Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "8fa84913-c205-4bb3-b69d-3c48f15f4d73",
  //                 "transactionDateCreated": "2025-01-07T09:12:37.472Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "40640377-7277-49dc-b841-09816bfa9c0b",
  //                 "transactionDateCreated": "2025-01-07T09:51:55.644Z",
  //                 "totalCost": 968,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 398,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "c64d3f52-96f1-4248-b3fd-bd98c83c49b5",
  //                 "transactionDateCreated": "2025-01-08T10:26:14.688Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "4bb02cf2-9ec5-4044-9886-99dc11c5776a",
  //                 "transactionDateCreated": "2025-01-10T08:14:04.779Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "19954fe1-86d1-4b36-984d-35c208de4ce5",
  //                 "transactionDateCreated": "2025-01-13T14:38:32.879Z",
  //                 "totalCost": 2690,
  //                 "subtotal": 2740,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "22264ab0-bcef-4335-91cf-b5999fd59602",
  //                 "transactionDateCreated": "2025-01-13T14:41:31.441Z",
  //                 "totalCost": 1980,
  //                 "subtotal": 2000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": []
  //             },
  //             {
  //                 "transactionId": "92f760b9-fec3-485d-83e5-084b97770ecc",
  //                 "transactionDateCreated": "2025-01-13T14:41:37.675Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "36d33557-c52d-4ff7-963d-faaba28fcfa6",
  //                 "transactionDateCreated": "2025-01-14T07:02:43.325Z",
  //                 "totalCost": 6980,
  //                 "subtotal": 7000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 1000,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 5,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "4d83ee72-8362-4912-b394-36295184c352",
  //                 "transactionDateCreated": "2025-01-14T11:15:25.061Z",
  //                 "totalCost": 100,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "919f4caa-30d8-4b70-bf31-58296c774d9e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 100,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "7611b9aa-3e9a-41f5-ae72-e742a8ea668a",
  //                 "transactionDateCreated": "2025-01-14T11:17:28.015Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "e31913f9-6ae7-4a58-a072-bff07c4c061c",
  //                 "transactionDateCreated": "2025-01-14T14:09:23.969Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "customerId": "c3f0dbe1-a21d-437e-847e-17b51a06c9fe",
  //         "firstName": "eli",
  //         "lastName": "eliz",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "FarmFeed Suppliers-Premium Cattle Feed",
  //                 "totalSales": 476.6
  //             },
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Mwonga-Goat & Sheep Feed",
  //                 "totalSales": 400
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                 "totalSales": 604.8
  //             },
  //             {
  //                 "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 20
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 4994
  //             },
  //             {
  //                 "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 180
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "9f0a779d-3e58-46a6-815e-c23accb39be7",
  //                 "transactionDateCreated": "2024-12-29T06:04:33.606Z",
  //                 "totalCost": 92.2,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 92.2,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "56e736f2-d746-4738-a245-e75717406efa",
  //                 "transactionDateCreated": "2024-12-29T09:14:00.427Z",
  //                 "totalCost": 985.2,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 194.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 400,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "AnimalNutra Co.-Dog Food - Adult Formula",
  //                         "productTotalCost": 406.8,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 2.2,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "5112c3d4-200e-473a-b262-6d8901a7e401",
  //                 "transactionDateCreated": "2025-01-07T08:57:38.774Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "93e14eb8-4f08-4bc3-834b-98567640a154",
  //                 "transactionDateCreated": "2025-01-08T10:26:34.995Z",
  //                 "totalCost": 20,
  //                 "subtotal": 20,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "bbe4aff9-4b5d-418f-a49b-bd175b400cc3",
  //                 "transactionDateCreated": "2025-01-08T10:42:32.567Z",
  //                 "totalCost": 3120,
  //                 "subtotal": 3200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 190,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 2998,
  //                         "productSubTotalCost": 3000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "20be08dc-2382-4fa5-bca1-fe35e245a979",
  //                 "transactionDateCreated": "2025-01-14T08:36:25.922Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "bfe0e92d-356f-4b98-a8e2-0cfa49216962",
  //                 "transactionDateCreated": "2025-01-14T08:59:59.938Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "714a18c1-b746-4bbb-bc56-a320d3f5773b",
  //                 "transactionDateCreated": "2025-01-17T09:51:36.714Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "customerId": "be25784f-5c90-4f0d-8e1c-c70245e482c8",
  //         "firstName": "beatrice",
  //         "lastName": "karimu",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "FarmFeed Suppliers-Premium Cattle Feed",
  //                 "totalSales": 838.8
  //             },
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Mwonga-Goat & Sheep Feed",
  //                 "totalSales": 1400
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "Dog Food - Adult Formula",
  //                 "totalSales": 1992
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 4990
  //             },
  //             {
  //                 "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 40
  //             },
  //             {
  //                 "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 360
  //             },
  //             {
  //                 "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                 "supplierProduct": "kenchick",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 30
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "b7abf4ab-8f3e-45d4-b16e-74e832d3e4d9",
  //                 "transactionDateCreated": "2024-12-31T06:15:20.574Z",
  //                 "totalCost": 584.4,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 194.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 400,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "4d413730-5d72-4217-b982-af61a1bcce2d",
  //                 "transactionDateCreated": "2024-12-31T06:21:23.003Z",
  //                 "totalCost": 584.4,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "FarmFeed Suppliers-Premium Cattle Feed",
  //                         "productTotalCost": 194.4,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 2.2,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Mwonga-Goat & Sheep Feed",
  //                         "productTotalCost": 400,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "60a9e427-8d4b-48a5-86c5-c96e83796194",
  //                 "transactionDateCreated": "2025-01-07T08:15:26.261Z",
  //                 "totalCost": 588,
  //                 "subtotal": 600,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 598,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "5113cbe3-a419-4d0e-b07a-c5db35146220",
  //                 "transactionDateCreated": "2025-01-07T08:16:05.537Z",
  //                 "totalCost": 5820,
  //                 "subtotal": 6000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 598,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "0cc83210-4e13-4e63-93e8-f00cefc6dd3c",
  //                 "transactionDateCreated": "2025-01-07T08:16:25.750Z",
  //                 "totalCost": 5820,
  //                 "subtotal": 6000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 598,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "ca9f0e44-12c8-4b90-811e-2ba2a3aba340",
  //                 "transactionDateCreated": "2025-01-07T08:57:49.812Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "46897ae9-25eb-4252-9932-3ab624c9de6c",
  //                 "transactionDateCreated": "2025-01-07T08:58:18.869Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "8bc08bb6-3004-47f8-8272-6bc6f8cd99b0",
  //                 "transactionDateCreated": "2025-01-07T08:58:34.138Z",
  //                 "totalCost": 1880,
  //                 "subtotal": 2000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "420eb715-d12a-4a45-a970-e7043277612b",
  //                 "transactionDateCreated": "2025-01-10T08:37:26.928Z",
  //                 "totalCost": 200,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "693bd4a4-676b-4ca9-8581-d56134ba25d7",
  //                 "transactionDateCreated": "2025-01-13T14:42:08.973Z",
  //                 "totalCost": 2880,
  //                 "subtotal": 3000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "cd56ab6a-d0ff-46fb-b5f9-62e5abd0b511",
  //                 "transactionDateCreated": "2025-01-14T09:01:28.759Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "14a7082e-ed93-4f57-861a-a62e7af0894c",
  //                 "transactionDateCreated": "2025-01-14T09:04:53.293Z",
  //                 "totalCost": 90,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9448845c-cae0-4216-b996-818eadf038a8",
  //                         "productName": "Premium Cattle Feed",
  //                         "productTotalCost": 90,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 10,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "ccba875c-1b4a-4f34-a741-9742599936f7",
  //                 "transactionDateCreated": "2025-01-14T13:29:00.883Z",
  //                 "totalCost": 30,
  //                 "subtotal": 30,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "b11ba3d7-ef25-4050-b26d-7dacd6809358",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 30,
  //                         "productSubTotalCost": 30,
  //                         "VAT": 0,
  //                         "price": 30,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "kenchick"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "dd0db339-bfe3-4c1f-b195-70d7b9596199",
  //                 "transactionDateCreated": "2025-01-16T13:51:03.276Z",
  //                 "totalCost": 160,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "bb60fdce-d4e6-4c2b-98d6-b84b7bb6c935",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 180,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 20,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "67563445-67ec-4c1d-9a4d-84865f0d42ba",
  //                 "transactionDateCreated": "2025-01-17T11:31:05.126Z",
  //                 "totalCost": 20,
  //                 "subtotal": 20,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "customerId": "76d665eb-96a9-4033-ac98-64d87c014b45",
  //         "firstName": "ken",
  //         "lastName": "sample",
  //         "totalSales": [
  //             {
  //                 "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                 "supplierProduct": "Mwonga",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 1000
  //             },
  //             {
  //                 "supplier_products_id": "60ac9483-f9a4-4cc0-9b1c-de38f9ab19f0",
  //                 "supplierProduct": "isinya",
  //                 "products": "Goat & Sheep Feed",
  //                 "totalSales": 200
  //             },
  //             {
  //                 "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "Dog Food - Adult Formula",
  //                 "totalSales": 396
  //             },
  //             {
  //                 "supplier_products_id": "919f4caa-30d8-4b70-bf31-58296c774d9e",
  //                 "supplierProduct": "AnimalNutra Co.",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 100
  //             },
  //             {
  //                 "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                 "supplierProduct": "FarmFeed Suppliers",
  //                 "products": "Broiler Chicken Feed",
  //                 "totalSales": 60
  //             },
  //             {
  //                 "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                 "supplierProduct": "isinya",
  //                 "products": "Dog Food - Adult Formula",
  //                 "totalSales": 600
  //             },
  //             {
  //                 "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                 "supplierProduct": "isinya",
  //                 "products": "Layer Chicken Feed",
  //                 "totalSales": 998
  //             }
  //         ],
  //         "transactionDate": [
  //             {
  //                 "transactionId": "a5cc5bba-72b6-4b9f-bc94-11e71a57a4d8",
  //                 "transactionDateCreated": "2025-01-16T13:52:27.479Z",
  //                 "totalCost": 400,
  //                 "subtotal": 400,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 400,
  //                         "productSubTotalCost": 400,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 2,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "ea5e7907-bcc9-4eed-a9c5-46f496da483e",
  //                 "transactionDateCreated": "2025-01-16T13:58:48.039Z",
  //                 "totalCost": 396,
  //                 "subtotal": 400,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "60ac9483-f9a4-4cc0-9b1c-de38f9ab19f0",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 200,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "73302457-88e7-4f4f-a05a-15968d83b945",
  //                 "transactionDateCreated": "2025-01-16T14:08:36.631Z",
  //                 "totalCost": 100,
  //                 "subtotal": 100,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "919f4caa-30d8-4b70-bf31-58296c774d9e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 100,
  //                         "productSubTotalCost": 100,
  //                         "VAT": 0,
  //                         "price": 100,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "ba70b7d2-0966-485b-b344-ba53660fb0cf",
  //                 "transactionDateCreated": "2025-01-16T14:09:47.872Z",
  //                 "totalCost": 20,
  //                 "subtotal": 20,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "9b783195-7b8a-45ca-aac9-e626f75016bc",
  //                 "transactionDateCreated": "2025-01-16T14:10:03.466Z",
  //                 "totalCost": 20,
  //                 "subtotal": 20,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "62b2bc64-e4de-4d9e-b644-2c22e24dc495",
  //                 "transactionDateCreated": "2025-01-16T20:03:34.727Z",
  //                 "totalCost": 20,
  //                 "subtotal": 20,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "0d9a3157-4cd7-4eea-aa4c-20fe934b208e",
  //                         "productName": "Broiler Chicken Feed",
  //                         "productTotalCost": 20,
  //                         "productSubTotalCost": 20,
  //                         "VAT": 0,
  //                         "price": 20,
  //                         "discount": 0,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "FarmFeed Suppliers"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "0405f1fe-a508-493e-9cee-1a32672ad7a5",
  //                 "transactionDateCreated": "2025-01-16T22:42:41.721Z",
  //                 "totalCost": 1200,
  //                 "subtotal": 1200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "ea34f5a0-42ff-4e4f-8b27-9ab74896a499",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 600,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     },
  //                     {
  //                         "supplier_products_id": "9f7d1258-7753-468e-a58e-c452c27f5a93",
  //                         "productName": "Goat & Sheep Feed",
  //                         "productTotalCost": 600,
  //                         "productSubTotalCost": 600,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 0,
  //                         "quantity": 3,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "Mwonga"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "57f285de-7af6-46b8-85d6-c4160c564297",
  //                 "transactionDateCreated": "2025-01-17T11:30:16.984Z",
  //                 "totalCost": 980,
  //                 "subtotal": 1000,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "384544ed-77d4-4b28-8880-ded5164f5cfd",
  //                         "productName": "Layer Chicken Feed",
  //                         "productTotalCost": 998,
  //                         "productSubTotalCost": 1000,
  //                         "VAT": 0,
  //                         "price": 1000,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "isinya"
  //                             }
  //                         }
  //                     }
  //                 ]
  //             },
  //             {
  //                 "transactionId": "15f7a5e8-d7ca-4efc-b50c-1b30011a5873",
  //                 "transactionDateCreated": "2025-01-18T12:32:59.894Z",
  //                 "totalCost": 196,
  //                 "subtotal": 200,
  //                 "paymentMethod": "cash",
  //                 "TransactionProduct": [
  //                     {
  //                         "supplier_products_id": "c8c8217c-ec8b-4d36-a3d8-8f0fe3cdaf58",
  //                         "productName": "Dog Food - Adult Formula",
  //                         "productTotalCost": 198,
  //                         "productSubTotalCost": 200,
  //                         "VAT": 0,
  //                         "price": 200,
  //                         "discount": 2,
  //                         "quantity": 1,
  //                         "supplierProduct": {
  //                             "supplier": {
  //                                 "name": "AnimalNutra Co."
  //                             }
  //                         }
  //                     }
  //                 ]
  //             }
  //         ]
  //     }
  //   ];

  const customers = data?.data ? data.data : [];

  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null); // Track which customer is expanded
  const [expandedTransactions, setExpandedTransactions] = useState<string | null>(null); // Track which customer's transactions are expanded

  const toggleCustomerDetails = (customerId: string | null) => {
    setExpandedCustomerId((prev) => (prev === customerId ? null : customerId));
  };

  const toggleTransactions = (customerId: string | null) => {
    setExpandedTransactions((prev) => (prev === customerId ? null : customerId));
  };

  // Function to calculate total sales
  const calculateTotalSales = (sales: CustomerTotalSalesInterface[]) => {
    return sales.reduce((total, sale) => total + sale.totalSales, 0);
  };

  // Function to calculate transaction total (sum of productTotalCost, VAT, and discount)
  //   const calculateTransactionTotal = (transaction) => {
  //     return transaction.TransactionProduct.reduce((total, product) => {
  //       const productTotal = product.productTotalCost * product.quantity;
  //       const vatAmount = product.VAT;
  //       const discountAmount = product.discount;
  //       return total + productTotal + vatAmount - discountAmount;
  //     }, 0);
  //   };

  //  data processing functions for the charts
  const getTransactionDateData = (transactions: GetTransactionDateData[]) => {
    return transactions.map((transaction) => ({
      date: new Date(transaction.transactionDateCreated!).toLocaleDateString(),
      total: transaction.totalCost
    }));
  };

  const getProductDistributionData = (transactions: GetTransactionDateData[]) => {
    const productCounts: Record<string, number> = {};
    transactions.forEach((transaction) => {
      transaction.TransactionProduct?.forEach((product) => {
        productCounts[product.productName] = (productCounts[product.productName] || 0) + product.quantity;
      });
    });

    console.log('product counts are ', productCounts);

    return Object.keys(productCounts).map((product) => ({
      label: product,
      value: productCounts[product]
    }));
  };

  const getTransactionTrendData = (transactions: GetTransactionDateData[]) => {
    return transactions.map((transaction) => ({
      date: new Date(transaction.transactionDateCreated!).toLocaleDateString(),
      total: transaction.totalCost
    }));
  };

  if (isLoading) {
    return <p> fetching data ...</p>;
  }

  if (isError) {
    return <p> error fetching data.....</p>;
  }

  return (
    <div className="p-8">
      {customers.length === 0 ? (
        '<p>no customers </p>'
      ) : (
        <>
          {customers.map((customer) => (
            <div
              key={customer.customerId}
              className="bg-white rounded-lg shadow-lg mb-8 p-6 flex flex-col space-y-4"
              style={{
                display: expandedCustomerId === customer.customerId || expandedCustomerId === null ? 'block' : 'none'
              }}
            >
              {/* Customer Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">Customer ID: {customer.customerId}</p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-full"
                    onClick={() => toggleCustomerDetails(customer.customerId)}
                  >
                    {expandedCustomerId === customer.customerId ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </div>

              {/* Customer Details */}
              {expandedCustomerId === customer.customerId && (
                <>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Customer Details</h3>
                    <p>
                      <strong>Full Name:</strong> {customer.firstName} {customer.lastName}
                    </p>
                    <p>
                      <strong>Customer ID:</strong> {customer.customerId}
                    </p>
                  </div>

                  {/* Total Sales Overview */}
                  <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold">Total Sales Overview</h3>
                    <ul className="space-y-2 mt-2">
                      {customer.totalSales.map((sale, index) => (
                        <li key={index} className="flex justify-between">
                          <span className="text-gray-700">{sale.products}</span>
                          <span className="font-semibold">{sale.totalSales.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Show Total Sales Sum */}
                    <div className="flex justify-between mt-4 font-bold">
                      <span>Total Sales Sum:</span>
                      <span>{calculateTotalSales(customer.totalSales).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Collapsible Transaction History */}
                  <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold flex justify-between items-center">
                      <span>Transaction History</span>
                      <button className="text-blue-500" onClick={() => toggleTransactions(customer.customerId)}>
                        {expandedTransactions === customer.customerId ? 'Hide Transactions' : 'Show Transactions'}
                      </button>
                    </h3>

                    {expandedTransactions === customer.customerId && (
                      <>
                        {customer.transactionDate.map((transaction) => (
                          <div key={transaction.transactionId}>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">{new Date(transaction.transactionDateCreated!).toLocaleString()}</span>
                              <span className="text-sm text-gray-500">Payment: {transaction.paymentMethod}</span>
                            </div>
                            <div className="mt-2 pl-4">
                              <table className="min-w-full table-auto border-collapse">
                                <thead>
                                  <tr>
                                    <th className="border px-4 py-2">Product</th>
                                    <th className="border px-4 py-2">Price</th>
                                    <th className="border px-4 py-2">Quantity</th>
                                    <th className="border px-4 py-2">VAT</th>
                                    <th className="border px-4 py-2">Discount</th>
                                    <th className="border px-4 py-2">Subtotal</th>
                                    <th className="border px-4 py-2">Total Cost</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {transaction.TransactionProduct?.map((product, idx) => (
                                    <tr key={idx}>
                                      <td className="border px-4 py-2">{product.productName}</td>
                                      <td className="border px-4 py-2">{product.price.toFixed(2)}</td>
                                      <td className="border px-4 py-2">{product.quantity}</td>
                                      <td className="border px-4 py-2">{product.VAT}</td>
                                      <td className="border px-4 py-2">{product.discount} %</td>
                                      <td className="border px-4 py-2">{product.productSubTotalCost!.toFixed(2)}</td>
                                      <td className="border px-4 py-2">{product.productTotalCost!.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {/* Show Transaction Total Cost */}
                              <div className="flex justify-between mt-4 font-bold">
                                <span>Transaction Total:</span>
                                <span>{transaction.totalCost}</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Charts */}
                        <div className="mt-4">
                          <h4>Transactions Over Time. Day the highest transactions were made</h4>
                          <BarChart
                            series={[
                              {
                                data: getTransactionDateData(customer.transactionDate).map((item) => item.total)
                              }
                            ]}
                            xAxis={[
                              {
                                data: getTransactionDateData(customer.transactionDate).map((item) => item.date),
                                scaleType: 'band'
                              }
                            ]}
                            height={290}
                            // margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                          />
                        </div>

                        <div className="mt-4">
                          <h4>Product Distribution with resepct to the quantity of item sold the most</h4>
                          <PieChart
                            series={[
                              {
                                data: getProductDistributionData(customer.transactionDate)
                              }
                            ]}
                            width={400}
                            height={200}
                          />
                        </div>

                        <div className="mt-4">
                          <h4>Transaction Trend with the days he made the highest to the lowest transaction</h4>

                          <LineChart
                            xAxis={[
                              {
                                data: getTransactionTrendData(customer.transactionDate).map(
                                  (item) => new Date(item.date) // Convert date string to timestamp
                                ),
                                scaleType: 'time' // Ensuring it's time-based for proper date rendering
                              }
                            ]}
                            series={[{ data: getTransactionTrendData(customer.transactionDate).map((item) => item.total) }]}
                            height={590}
                            width={590}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CustomerCard;
