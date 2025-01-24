'use client'



const inventory =  [
  {
    "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
    "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
    "product_weight": "5",
    "stock_quantity": "10",
    "reorder_level": 5,
    "last_restocked": "2025-01-21T11:22:58.513Z",
    "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
    "created_at": "2025-01-20T13:09:13.885Z",
    "updated_at": "2025-01-21T11:22:58.513Z",
    "softDelete": false,
    "status": "ACTIVE",
    "InventorySalesTracking": [
        {
            "inventorysalesTrackingId": "3941629e-93dd-437c-a731-4503aaf48deb",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "25",
            "old_stock_quantity": "15",
            "reorder_level": 5,
            "restock_date": "2025-01-21T13:01:43.734Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "ed67b45e-7b53-482e-8c69-267a9a75839d",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "26",
            "old_stock_quantity": "25",
            "reorder_level": 5,
            "restock_date": "2025-01-21T13:03:44.972Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "f5d8bef5-465c-45dd-b3da-975878b93e28",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "25",
            "old_stock_quantity": "26",
            "reorder_level": 5,
            "restock_date": "2025-01-21T13:11:59.652Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "24e7679f-cdf4-49cc-b1d8-138b93d8c495",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "24",
            "old_stock_quantity": "25",
            "reorder_level": 5,
            "restock_date": "2025-01-21T13:12:08.953Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "1f2cf041-c067-4dfc-88a8-ec7c91dc9911",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "12",
            "old_stock_quantity": "24",
            "reorder_level": 5,
            "restock_date": "2025-01-21T14:21:31.763Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "f73bc54d-3b7d-469a-abe8-ff24a33b7408",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "3",
            "old_stock_quantity": "12",
            "reorder_level": 5,
            "restock_date": "2025-01-21T14:21:43.516Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "aba1b64a-6e62-49dd-877e-2220e9de9993",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "0",
            "old_stock_quantity": "3",
            "reorder_level": 5,
            "restock_date": "2025-01-21T14:21:52.222Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "87357a41-a9c4-4188-8482-6b9a7523ad4e",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "10",
            "old_stock_quantity": "0",
            "reorder_level": 5,
            "restock_date": "2025-01-21T14:22:58.515Z",
            "softDelete": false
        }
    ],
    "InventoryRestock": [
        {
            "inventoryRestockId": "d5e91185-84e1-4010-a4bd-a26b8d71cbb6",
            "inventory_Id": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "14",
            "old_stock_quantity": "4",
            "reorder_level": 5,
            "restock_date": "2025-01-20T13:12:51.891Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "c9b500d1-ff14-422a-bbe7-406263ce22e7",
            "inventory_Id": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "10",
            "old_stock_quantity": "0",
            "reorder_level": 5,
            "restock_date": "2025-01-20T13:24:15.447Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "25f99f10-619b-4fce-9ac4-23ee9adecb4e",
            "inventory_Id": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "15",
            "old_stock_quantity": "10",
            "reorder_level": 5,
            "restock_date": "2025-01-21T08:02:07.132Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "d4a993e4-bf6b-4efa-b1b8-10e7edc6451b",
            "inventory_Id": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "25",
            "old_stock_quantity": "15",
            "reorder_level": 5,
            "restock_date": "2025-01-21T10:01:43.740Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "8ede70c1-a1c1-47da-8a3e-4bdb2386ebc6",
            "inventory_Id": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "26",
            "old_stock_quantity": "25",
            "reorder_level": 5,
            "restock_date": "2025-01-21T10:03:44.995Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "af82e436-5f49-4787-9a31-c8c317b275bf",
            "inventory_Id": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "new_stock_quantity": "10",
            "old_stock_quantity": "0",
            "reorder_level": 5,
            "restock_date": "2025-01-21T11:22:58.527Z",
            "softDelete": false
        }
    ],
    "TransactionProduct": [
        {
            "TransactionProductId": "ea051621-59f8-43d1-82d3-bafc70fa96ec",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "10",
            "quantity": 1,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 50,
            "productTotalCost": 50,
            "transactionId": "49ab0604-b1ba-43ee-9616-58110fc6a1e9",
            "createdAt": "2025-01-20T13:11:04.817Z"
        },
        {
            "TransactionProductId": "c7a9a3f4-28b1-469e-9177-0b35c1f49c82",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "9",
            "quantity": 5,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 250,
            "productTotalCost": 250,
            "transactionId": "52bb7370-63a0-463c-a257-4b70088c0d25",
            "createdAt": "2025-01-20T13:12:03.094Z"
        },
        {
            "TransactionProductId": "308d92aa-599e-47c3-98fe-d72657b164c4",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "14",
            "quantity": 7,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 350,
            "productTotalCost": 350,
            "transactionId": "b1f9dbc9-9c34-4872-a532-3c361b6a6e38",
            "createdAt": "2025-01-20T13:16:38.871Z"
        },
        {
            "TransactionProductId": "ad817b93-566f-4040-b3bf-9a81da7260e7",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "7",
            "quantity": 4,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 200,
            "productTotalCost": 200,
            "transactionId": "a090b89b-f8d2-4f2a-aa07-bd6003c8edd2",
            "createdAt": "2025-01-20T13:17:33.595Z"
        },
        {
            "TransactionProductId": "ce6b7a26-7e06-42e9-bbb5-e5ae75bb8b3f",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "3",
            "quantity": 3,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 150,
            "productTotalCost": 150,
            "transactionId": "4e2d601a-8680-4b20-9364-880c355e5a61",
            "createdAt": "2025-01-20T13:17:47.910Z"
        },
        {
            "TransactionProductId": "be1c2726-e59b-46ea-b445-21148c4030ad",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "26",
            "quantity": 1,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 50,
            "productTotalCost": 50,
            "transactionId": "8e34fe3b-099d-4727-a71c-7ae8fa06bdab",
            "createdAt": "2025-01-21T10:11:59.674Z"
        },
        {
            "TransactionProductId": "016ff8dd-745b-4f0e-80b7-3c784915072d",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "25",
            "quantity": 1,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 50,
            "productTotalCost": 50,
            "transactionId": "d642c6c7-a7c0-4914-8b3e-0288494e2b55",
            "createdAt": "2025-01-21T10:12:08.962Z"
        },
        {
            "TransactionProductId": "29e2bb46-52e7-4ab4-80db-441d633315c2",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "24",
            "quantity": 12,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 600,
            "productTotalCost": 600,
            "transactionId": "48b9b945-e4e5-4999-b0b7-1d16205301ef",
            "createdAt": "2025-01-21T11:21:31.828Z"
        },
        {
            "TransactionProductId": "b66fea3a-364c-4584-bf49-34ed96efa1ab",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "12",
            "quantity": 9,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 450,
            "productTotalCost": 450,
            "transactionId": "268c86a8-d4c8-4818-9d4f-0e64b4bec335",
            "createdAt": "2025-01-21T11:21:43.525Z"
        },
        {
            "TransactionProductId": "e9ba8603-c15c-473b-8d22-83c396de0563",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "inventoryId": "04643d0f-b7f8-4ad9-9078-b888fdf8738e",
            "stock_quantity": "3",
            "quantity": 3,
            "productName": "Broiler finisher pellets",
            "price": 50,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 150,
            "productTotalCost": 150,
            "transactionId": "f74ae255-c25c-4295-bd43-9fa963604941",
            "createdAt": "2025-01-21T11:21:52.231Z"
        }
    ],
    "supplierProduct": {
        "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
        "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
        "product_id": "8c0bb886-cadd-4d72-b3b8-2e3e967fbca3",
        "created_at": "2025-01-20T13:08:49.151Z",
        "updated_at": "2025-01-20T13:08:49.151Z",
        "product": {
            "product_id": "8c0bb886-cadd-4d72-b3b8-2e3e967fbca3",
            "name": "Broiler finisher pellets",
            "description": "broiler finisher pellets",
            "category_id": "8caa33d6-2260-4c69-ad28-4603087ad91d",
            "subcategory_id": "391a53d8-2c4b-4298-87b2-d8493f9450e8",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7dz0U9nF54sqsmSZJfCfAHlvDxqmmwDh4g&s",
            "sku": "BROIF",
            "created_at": "2025-01-20T13:08:28.545Z",
            "updated_at": "2025-01-20T13:08:28.545Z"
        },
        "supplier": {
            "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
            "name": "ISINYA",
            "address": "P.O.Box Meru",
            "contact": "0722354036",
            "created_at": "2025-01-20T12:12:57.076Z",
            "updated_at": "2025-01-20T12:12:57.076Z"
        },
        "ProductPricing": {
            "product_pricing_id": "dc514675-1313-4036-973e-789d0c3f28d2",
            "supplier_products_id": "0acf37da-c78e-4520-bbef-bc4be5b69cda",
            "Quantity": "1",
            "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
            "price": "50",
            "VAT": "0",
            "discount": "0",
            "effective_date": "2025-01-20T13:10:24.165Z",
            "created_at": "2025-01-20T13:10:24.164Z",
            "updated_at": "2025-01-20T13:10:24.164Z"
        }
    },
    "unit": {
        "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
        "unit": "bags",
        "short_name": "bag",
        "no_of_products": 1,
        "created_at": "2025-01-20T12:14:39.030Z",
        "updated_at": "2025-01-20T12:14:39.030Z"
    }
},
{
    "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
    "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
    "product_weight": "100",
    "stock_quantity": "300",
    "reorder_level": 50,
    "last_restocked": "2025-01-21T18:54:34.691Z",
    "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
    "created_at": "2025-01-20T12:21:50.747Z",
    "updated_at": "2025-01-21T18:54:34.691Z",
    "softDelete": false,
    "status": "ACTIVE",
    "InventorySalesTracking": [
        {
            "inventorysalesTrackingId": "aa188b28-a036-4024-a9d2-1d6effa9e93b",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "new_stock_quantity": "298",
            "old_stock_quantity": "300",
            "reorder_level": 50,
            "restock_date": "2025-01-21T14:21:31.797Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "4fe5624b-d7cc-45d2-b267-59b00bdf6b22",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "new_stock_quantity": "300",
            "old_stock_quantity": "298",
            "reorder_level": 50,
            "restock_date": "2025-01-21T21:54:34.692Z",
            "softDelete": false
        }
    ],
    "InventoryRestock": [
        {
            "inventoryRestockId": "46e622c8-c5e0-41a5-8a86-7821604a8bad",
            "inventory_Id": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "new_stock_quantity": "120",
            "old_stock_quantity": "100",
            "reorder_level": 50,
            "restock_date": "2025-01-20T12:22:09.020Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "e5d44d04-b2f6-420f-86c8-1fbc0b61e1c8",
            "inventory_Id": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "new_stock_quantity": "314",
            "old_stock_quantity": "114",
            "reorder_level": 50,
            "restock_date": "2025-01-20T12:49:06.833Z",
            "softDelete": false
        },
        {
            "inventoryRestockId": "56bb325b-6920-4f40-8f1f-4a7365154684",
            "inventory_Id": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "new_stock_quantity": "300",
            "old_stock_quantity": "298",
            "reorder_level": 50,
            "restock_date": "2025-01-21T18:54:34.754Z",
            "softDelete": false
        }
    ],
    "TransactionProduct": [
        {
            "TransactionProductId": "2a387e18-2a0f-4481-993a-35f1ec9756b5",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "120",
            "quantity": 1,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 200,
            "productTotalCost": 200,
            "transactionId": "06e4d9c0-e9e0-4d04-a708-3710cc727ee4",
            "createdAt": "2025-01-20T12:32:33.411Z"
        },
        {
            "TransactionProductId": "c6595e05-5136-41da-be2e-d111254ba4fa",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "119",
            "quantity": 1,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 200,
            "productTotalCost": 200,
            "transactionId": "0e7416de-9627-4390-9c82-bd36ca843616",
            "createdAt": "2025-01-20T12:42:27.424Z"
        },
        {
            "TransactionProductId": "5e04390a-e88a-4bf4-bfad-fc7df60a7414",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "118",
            "quantity": 3,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 600,
            "productTotalCost": 600,
            "transactionId": "b2911bf7-b26e-410f-bf5e-4fbb1b7a1a15",
            "createdAt": "2025-01-20T12:43:08.017Z"
        },
        {
            "TransactionProductId": "359c6e97-a872-4711-b65a-0dcbb2e0e9f4",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "115",
            "quantity": 1,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 200,
            "productTotalCost": 200,
            "transactionId": "0cbd67ed-b346-4687-ae7f-ea4363476dc1",
            "createdAt": "2025-01-20T12:44:37.075Z"
        },
        {
            "TransactionProductId": "ae5eecc0-4fb3-4b2d-a639-41fd3de301be",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "114",
            "quantity": 4,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 800,
            "productTotalCost": 800,
            "transactionId": "be7d18dd-d595-459c-a7db-faa23d730243",
            "createdAt": "2025-01-20T12:49:37.297Z"
        },
        {
            "TransactionProductId": "07288c8a-7c72-47df-948d-6dc40c59c0ca",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "310",
            "quantity": 5,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1000,
            "productTotalCost": 1000,
            "transactionId": "da512cb6-3032-4c99-a9cd-163852adabc4",
            "createdAt": "2025-01-20T13:18:58.827Z"
        },
        {
            "TransactionProductId": "8b0030cc-94ab-4300-a5b4-e20c543e3c32",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "305",
            "quantity": 5,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1000,
            "productTotalCost": 1000,
            "transactionId": "9229e45d-a0c6-40b4-8689-3d3f2445c5a9",
            "createdAt": "2025-01-20T13:19:25.022Z"
        },
        {
            "TransactionProductId": "b8b681c2-3837-444a-b4b7-a965b5476c05",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "inventoryId": "a0d589e8-9622-4a7e-9087-0bf271191787",
            "stock_quantity": "300",
            "quantity": 2,
            "productName": "Broiler Feeds",
            "price": 200,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 400,
            "productTotalCost": 400,
            "transactionId": "48b9b945-e4e5-4999-b0b7-1d16205301ef",
            "createdAt": "2025-01-21T11:21:31.828Z"
        }
    ],
    "supplierProduct": {
        "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
        "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
        "product_id": "88df2d0f-02dd-41f4-87d2-cfd5c56cda2c",
        "created_at": "2025-01-20T12:13:12.378Z",
        "updated_at": "2025-01-20T12:13:12.378Z",
        "product": {
            "product_id": "88df2d0f-02dd-41f4-87d2-cfd5c56cda2c",
            "name": "Broiler Feeds",
            "description": "These are broiler feeds food",
            "category_id": "8caa33d6-2260-4c69-ad28-4603087ad91d",
            "subcategory_id": "391a53d8-2c4b-4298-87b2-d8493f9450e8",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7dz0U9nF54sqsmSZJfCfAHlvDxqmmwDh4g&s",
            "sku": "BROI",
            "created_at": "2025-01-20T12:11:42.392Z",
            "updated_at": "2025-01-20T12:11:42.392Z"
        },
        "supplier": {
            "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
            "name": "ISINYA",
            "address": "P.O.Box Meru",
            "contact": "0722354036",
            "created_at": "2025-01-20T12:12:57.076Z",
            "updated_at": "2025-01-20T12:12:57.076Z"
        },
        "ProductPricing": {
            "product_pricing_id": "4d56b90a-89d7-4378-bf9c-54b57e432932",
            "supplier_products_id": "dca04c27-2980-452b-9f5a-50031ebcc3de",
            "Quantity": "1",
            "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
            "price": "200",
            "VAT": "0",
            "discount": "0",
            "effective_date": "2025-01-20T12:30:49.908Z",
            "created_at": "2025-01-20T12:30:49.907Z",
            "updated_at": "2025-01-20T12:30:49.907Z"
        }
    },
    "unit": {
        "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
        "unit": "bags",
        "short_name": "bag",
        "no_of_products": 1,
        "created_at": "2025-01-20T12:14:39.030Z",
        "updated_at": "2025-01-20T12:14:39.030Z"
    }
},
{
    "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
    "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
    "product_weight": "1000",
    "stock_quantity": "984",
    "reorder_level": 100,
    "last_restocked": "2025-01-20T12:39:12.344Z",
    "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
    "created_at": "2025-01-20T12:39:12.344Z",
    "updated_at": "2025-01-21T11:21:31.785Z",
    "softDelete": false,
    "status": "ACTIVE",
    "InventorySalesTracking": [
        {
            "inventorysalesTrackingId": "8d063b8d-8ad2-4727-a416-edd67b05031a",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "new_stock_quantity": "986",
            "old_stock_quantity": "987",
            "reorder_level": 100,
            "restock_date": "2025-01-21T13:04:45.425Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "a6a46474-5c11-4a89-82e0-152be8e203bf",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "new_stock_quantity": "984",
            "old_stock_quantity": "986",
            "reorder_level": 100,
            "restock_date": "2025-01-21T14:21:31.786Z",
            "softDelete": false
        }
    ],
    "InventoryRestock": [],
    "TransactionProduct": [
        {
            "TransactionProductId": "140ded51-2426-41c8-9f23-3d53328d050b",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "stock_quantity": "1000",
            "quantity": 1,
            "productName": "Phase1 Broiler starter crumps",
            "price": 1500,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1500,
            "productTotalCost": 1500,
            "transactionId": "b2911bf7-b26e-410f-bf5e-4fbb1b7a1a15",
            "createdAt": "2025-01-20T12:43:08.017Z"
        },
        {
            "TransactionProductId": "8a8c74f9-d404-41e5-b4ff-c58a2cde42fa",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "stock_quantity": "999",
            "quantity": 1,
            "productName": "Phase1 Broiler starter crumps",
            "price": 1500,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1500,
            "productTotalCost": 1500,
            "transactionId": "0cbd67ed-b346-4687-ae7f-ea4363476dc1",
            "createdAt": "2025-01-20T12:44:37.075Z"
        },
        {
            "TransactionProductId": "ed48bf66-b819-43b2-aa6c-61fe8b4bf77c",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "stock_quantity": "998",
            "quantity": 6,
            "productName": "Phase1 Broiler starter crumps",
            "price": 1500,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 9000,
            "productTotalCost": 9000,
            "transactionId": "da512cb6-3032-4c99-a9cd-163852adabc4",
            "createdAt": "2025-01-20T13:18:58.827Z"
        },
        {
            "TransactionProductId": "c9b3ea29-f268-4720-8692-7a082f31dd8d",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "stock_quantity": "992",
            "quantity": 5,
            "productName": "Phase1 Broiler starter crumps",
            "price": 1500,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 7500,
            "productTotalCost": 7500,
            "transactionId": "9229e45d-a0c6-40b4-8689-3d3f2445c5a9",
            "createdAt": "2025-01-20T13:19:25.022Z"
        },
        {
            "TransactionProductId": "9a2305ba-8bea-446e-bdfc-36d428897e8f",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "stock_quantity": "987",
            "quantity": 1,
            "productName": "Phase1 Broiler starter crumps",
            "price": 1500,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1500,
            "productTotalCost": 1500,
            "transactionId": "53dcfbfa-3a3e-4ae0-973c-e7723c7b3c22",
            "createdAt": "2025-01-21T10:04:45.434Z"
        },
        {
            "TransactionProductId": "7ae49a12-042c-480c-90d3-81fabbffab51",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "inventoryId": "d6f1f055-1d36-4ad6-9680-6627d7344448",
            "stock_quantity": "986",
            "quantity": 2,
            "productName": "Phase1 Broiler starter crumps",
            "price": 1500,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 3000,
            "productTotalCost": 3000,
            "transactionId": "48b9b945-e4e5-4999-b0b7-1d16205301ef",
            "createdAt": "2025-01-21T11:21:31.828Z"
        }
    ],
    "supplierProduct": {
        "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
        "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
        "product_id": "198b33ad-2417-4f21-bfcb-32fb8df70406",
        "created_at": "2025-01-20T12:38:18.819Z",
        "updated_at": "2025-01-20T12:38:18.819Z",
        "product": {
            "product_id": "198b33ad-2417-4f21-bfcb-32fb8df70406",
            "name": "Phase1 Broiler starter crumps",
            "description": "this is phase 1 broiler starts",
            "category_id": "37f0524d-0361-4b57-a4d0-62ce10807827",
            "subcategory_id": "e1a871fb-0af8-43da-b6c5-d96d6f07371f",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7dz0U9nF54sqsmSZJfCfAHlvDxqmmwDh4g&s",
            "sku": "BROI#",
            "created_at": "2025-01-20T12:37:08.193Z",
            "updated_at": "2025-01-20T12:37:08.193Z"
        },
        "supplier": {
            "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
            "name": "ISINYA",
            "address": "P.O.Box Meru",
            "contact": "0722354036",
            "created_at": "2025-01-20T12:12:57.076Z",
            "updated_at": "2025-01-20T12:12:57.076Z"
        },
        "ProductPricing": {
            "product_pricing_id": "a32bfe21-0115-419d-9835-f4bafa037f7f",
            "supplier_products_id": "e3cc4670-0fca-404e-9b1e-1fb7171b7476",
            "Quantity": "1",
            "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
            "price": "1500",
            "VAT": "0",
            "discount": "0",
            "effective_date": "2025-01-20T12:40:09.260Z",
            "created_at": "2025-01-20T12:40:09.259Z",
            "updated_at": "2025-01-20T12:40:09.259Z"
        }
    },
    "unit": {
        "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
        "unit": "bags",
        "short_name": "bag",
        "no_of_products": 1,
        "created_at": "2025-01-20T12:14:39.030Z",
        "updated_at": "2025-01-20T12:14:39.030Z"
    }
},
{
    "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
    "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
    "product_weight": "3000",
    "stock_quantity": "2981",
    "reorder_level": 1000,
    "last_restocked": "2025-01-20T12:39:28.708Z",
    "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
    "created_at": "2025-01-20T12:39:28.708Z",
    "updated_at": "2025-01-21T11:21:31.810Z",
    "softDelete": false,
    "status": "ACTIVE",
    "InventorySalesTracking": [
        {
            "inventorysalesTrackingId": "1b969761-f879-482e-b697-618760283a33",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "new_stock_quantity": "2983",
            "old_stock_quantity": "2984",
            "reorder_level": 1000,
            "restock_date": "2025-01-21T13:10:56.119Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "9e6e7a52-3c8c-4ccc-adae-7ed85ef09496",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "new_stock_quantity": "2981",
            "old_stock_quantity": "2983",
            "reorder_level": 1000,
            "restock_date": "2025-01-21T14:21:31.810Z",
            "softDelete": false
        }
    ],
    "InventoryRestock": [],
    "TransactionProduct": [
        {
            "TransactionProductId": "dce30808-7bb9-418d-acf0-b291ae67ad30",
            "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "stock_quantity": "3000",
            "quantity": 4,
            "productName": "Chick Mash",
            "price": 400,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1600,
            "productTotalCost": 1600,
            "transactionId": "b2911bf7-b26e-410f-bf5e-4fbb1b7a1a15",
            "createdAt": "2025-01-20T12:43:08.017Z"
        },
        {
            "TransactionProductId": "876ce4b9-f4f2-44a7-9fd7-064be39d273b",
            "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "stock_quantity": "2996",
            "quantity": 8,
            "productName": "Chick Mash",
            "price": 400,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 3200,
            "productTotalCost": 3200,
            "transactionId": "da512cb6-3032-4c99-a9cd-163852adabc4",
            "createdAt": "2025-01-20T13:18:58.827Z"
        },
        {
            "TransactionProductId": "0153478f-7c99-44cd-904a-e1027b8bec5f",
            "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "stock_quantity": "2988",
            "quantity": 4,
            "productName": "Chick Mash",
            "price": 400,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1600,
            "productTotalCost": 1600,
            "transactionId": "9229e45d-a0c6-40b4-8689-3d3f2445c5a9",
            "createdAt": "2025-01-20T13:19:25.022Z"
        },
        {
            "TransactionProductId": "12f682e5-0e8e-497c-912a-4bee0fd21e1d",
            "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "stock_quantity": "2984",
            "quantity": 1,
            "productName": "Chick Mash",
            "price": 400,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 400,
            "productTotalCost": 400,
            "transactionId": "9ecb52f5-39ae-4b11-834d-9ad717f8e221",
            "createdAt": "2025-01-21T10:10:56.134Z"
        },
        {
            "TransactionProductId": "c58526bf-dd8a-4124-a24a-2cf901801856",
            "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
            "inventoryId": "eccb5406-1576-44d8-8d25-82f6cf4abba3",
            "stock_quantity": "2983",
            "quantity": 2,
            "productName": "Chick Mash",
            "price": 400,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 800,
            "productTotalCost": 800,
            "transactionId": "48b9b945-e4e5-4999-b0b7-1d16205301ef",
            "createdAt": "2025-01-21T11:21:31.828Z"
        }
    ],
    "supplierProduct": {
        "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
        "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
        "product_id": "8119891e-e8ac-43fd-b9b9-b1d2074b8e47",
        "created_at": "2025-01-20T12:38:21.365Z",
        "updated_at": "2025-01-20T12:38:21.365Z",
        "product": {
            "product_id": "8119891e-e8ac-43fd-b9b9-b1d2074b8e47",
            "name": "Chick Mash",
            "description": "this is chick mash",
            "category_id": "8caa33d6-2260-4c69-ad28-4603087ad91d",
            "subcategory_id": "457ccbca-652a-45d8-9b26-93a0b459c669",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7dz0U9nF54sqsmSZJfCfAHlvDxqmmwDh4g&s",
            "sku": "BROI2",
            "created_at": "2025-01-20T12:37:38.332Z",
            "updated_at": "2025-01-20T12:37:38.332Z"
        },
        "supplier": {
            "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
            "name": "ISINYA",
            "address": "P.O.Box Meru",
            "contact": "0722354036",
            "created_at": "2025-01-20T12:12:57.076Z",
            "updated_at": "2025-01-20T12:12:57.076Z"
        },
        "ProductPricing": {
            "product_pricing_id": "c69a3ebb-e6ed-45fd-a3a7-a50c9978754b",
            "supplier_products_id": "4bd918c0-e4fb-4c90-9ee6-12cdf6a7ce63",
            "Quantity": "1",
            "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
            "price": "400",
            "VAT": "0",
            "discount": "0",
            "effective_date": "2025-01-20T12:40:25.767Z",
            "created_at": "2025-01-20T12:40:25.766Z",
            "updated_at": "2025-01-20T12:40:25.766Z"
        }
    },
    "unit": {
        "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
        "unit": "bags",
        "short_name": "bag",
        "no_of_products": 1,
        "created_at": "2025-01-20T12:14:39.030Z",
        "updated_at": "2025-01-20T12:14:39.030Z"
    }
},
{
    "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
    "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
    "product_weight": "200",
    "stock_quantity": "187",
    "reorder_level": 30,
    "last_restocked": "2025-01-20T12:38:50.769Z",
    "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
    "created_at": "2025-01-20T12:38:50.769Z",
    "updated_at": "2025-01-21T11:21:31.819Z",
    "softDelete": false,
    "status": "ACTIVE",
    "InventorySalesTracking": [
        {
            "inventorysalesTrackingId": "ca0a7139-230c-4d91-9cab-697fb326ed04",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "new_stock_quantity": "189",
            "old_stock_quantity": "190",
            "reorder_level": 30,
            "restock_date": "2025-01-21T13:11:45.917Z",
            "softDelete": false
        },
        {
            "inventorysalesTrackingId": "da53051b-c45f-4257-ad08-0cb59f49e7f1",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "new_stock_quantity": "187",
            "old_stock_quantity": "189",
            "reorder_level": 30,
            "restock_date": "2025-01-21T14:21:31.819Z",
            "softDelete": false
        }
    ],
    "InventoryRestock": [],
    "TransactionProduct": [
        {
            "TransactionProductId": "d6418487-e67f-457c-9a1c-20a37334ae8c",
            "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "stock_quantity": "200",
            "quantity": 1,
            "productName": "Broiler Starter Crumps",
            "price": 300,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 300,
            "productTotalCost": 300,
            "transactionId": "b2911bf7-b26e-410f-bf5e-4fbb1b7a1a15",
            "createdAt": "2025-01-20T12:43:08.017Z"
        },
        {
            "TransactionProductId": "4dd4a7bf-43c4-4fdc-b22b-8f6a59e559be",
            "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "stock_quantity": "199",
            "quantity": 5,
            "productName": "Broiler Starter Crumps",
            "price": 300,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1500,
            "productTotalCost": 1500,
            "transactionId": "da512cb6-3032-4c99-a9cd-163852adabc4",
            "createdAt": "2025-01-20T13:18:58.827Z"
        },
        {
            "TransactionProductId": "42dcb65c-a3f9-4644-9d68-ca48d0856af2",
            "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "stock_quantity": "194",
            "quantity": 4,
            "productName": "Broiler Starter Crumps",
            "price": 300,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 1200,
            "productTotalCost": 1200,
            "transactionId": "9229e45d-a0c6-40b4-8689-3d3f2445c5a9",
            "createdAt": "2025-01-20T13:19:25.022Z"
        },
        {
            "TransactionProductId": "f8692878-3aa2-4ad9-b056-bb3b9f7b4323",
            "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "stock_quantity": "190",
            "quantity": 1,
            "productName": "Broiler Starter Crumps",
            "price": 300,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 300,
            "productTotalCost": 300,
            "transactionId": "b339eb19-4764-4155-b47a-f91bb5ecf7c4",
            "createdAt": "2025-01-21T10:11:45.926Z"
        },
        {
            "TransactionProductId": "8e5dff8f-ee73-4d6b-b54c-c9e4a3a2751b",
            "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
            "inventoryId": "fb2962da-1820-44b1-99e2-f55a8819b71f",
            "stock_quantity": "189",
            "quantity": 2,
            "productName": "Broiler Starter Crumps",
            "price": 300,
            "discount": 0,
            "VAT": 0,
            "productSubTotalCost": 600,
            "productTotalCost": 600,
            "transactionId": "48b9b945-e4e5-4999-b0b7-1d16205301ef",
            "createdAt": "2025-01-21T11:21:31.828Z"
        }
    ],
    "supplierProduct": {
        "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
        "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
        "product_id": "d7618f6b-df8a-4865-ba75-7b695e841d17",
        "created_at": "2025-01-20T12:38:16.166Z",
        "updated_at": "2025-01-20T12:38:16.166Z",
        "product": {
            "product_id": "d7618f6b-df8a-4865-ba75-7b695e841d17",
            "name": "Broiler Starter Crumps",
            "description": "starter crumps for broilers",
            "category_id": "8caa33d6-2260-4c69-ad28-4603087ad91d",
            "subcategory_id": "391a53d8-2c4b-4298-87b2-d8493f9450e8",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7dz0U9nF54sqsmSZJfCfAHlvDxqmmwDh4g&s",
            "sku": "BROIS",
            "created_at": "2025-01-20T12:36:14.889Z",
            "updated_at": "2025-01-20T12:36:14.889Z"
        },
        "supplier": {
            "supplier_id": "bac6185d-3076-46b1-a735-299d326b68cc",
            "name": "ISINYA",
            "address": "P.O.Box Meru",
            "contact": "0722354036",
            "created_at": "2025-01-20T12:12:57.076Z",
            "updated_at": "2025-01-20T12:12:57.076Z"
        },
        "ProductPricing": {
            "product_pricing_id": "4f634a4b-e9cb-47d4-a79c-055dd3a02831",
            "supplier_products_id": "f53df252-2453-48af-b1e9-a56896cdf5d0",
            "Quantity": "1",
            "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
            "price": "300",
            "VAT": "0",
            "discount": "0",
            "effective_date": "2025-01-20T12:39:50.262Z",
            "created_at": "2025-01-20T12:39:50.260Z",
            "updated_at": "2025-01-20T12:39:50.260Z"
        }
    },
    "unit": {
        "unit_id": "98ce621b-b065-4cb3-9e32-ae39c19f94fa",
        "unit": "bags",
        "short_name": "bag",
        "no_of_products": 1,
        "created_at": "2025-01-20T12:14:39.030Z",
        "updated_at": "2025-01-20T12:14:39.030Z"
    }
}

]

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useGetInventoryItemsInsightQuery } from '@/app/redux/api/inventory-api';

// Registering the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const InventoryDetails = () => {
  // const data = inventory; // Assuming inventory is an array of objects
  const itemsPerPage = 5; // Number of items per page
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {data:response, isLoading, isError} = useGetInventoryItemsInsightQuery()

  console.log('_____response for the inventory list i s', response)

  const data = response?.data ?? []

  // Filter the data based on search query
  const filteredData = data.filter(item => 
    item.supplierProduct.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplierProduct.product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get items for the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search is changed
  };

  const handleToggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if(isLoading) return <div>loading....</div>

  if(isError) return <div>Error</div>

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Product Name or Description..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-600">Found {filteredData.length} items</p>
        </div>
      </div>

      {/* Inventory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((item, index) => (
          <div
            key={index}
            className={`p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-all ease-in-out duration-300 ${
              expandedIndex === index ? 'col-span-4' : ''
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Information</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div><strong>Inventory ID:</strong> {item.inventoryId}</div>
              <div><strong>Product Name:</strong> {item.supplierProduct.product.name}</div>
              <div><strong>Description:</strong> {item.supplierProduct.product.description}</div>
              <div><strong>Category:</strong> {item.supplierProduct.product.category_id}</div>
              <div><strong>Supplier:</strong> {item.supplierProduct.supplier.name}</div>
              <div><strong>Unit:</strong> {item.unit.unit}</div>
              <div><strong>Stock Quantity:</strong> {item.stock_quantity}</div>
            </div>

            {/* Show/Hide Details Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => handleToggleDetails(index)}
            >
              {expandedIndex === index ? 'Hide Details' : 'Show Details'}
            </button>

            {/* If the card is expanded, show extra details */}
            {expandedIndex === index && (
              <div className="mt-6 space-y-4">
                <Tabs>
                  <Tab label="Product Info">
                    <ProductInfo item={item} />
                  </Tab>

                  <Tab label="Supplier Product Details">
                    <SupplierProductDetails item={item} />
                  </Tab>

                  <Tab label="Inventory Sales Tracking">
                    <InventorySalesTracking item={item} />
                    <GraphSection data={item.InventorySalesTracking} label="Sales Tracking" />
                  </Tab>

                  <Tab label="Inventory Restock">
                    <InventoryRestock item={item} />
                    <GraphSection data={item.InventoryRestock} label="Restock Tracking" />
                  </Tab>

                  <Tab label="Transaction Products">
                    <TransactionProducts item={item} />
                    <GraphSection data={item.TransactionProduct} label="Transaction Data" />
                  </Tab>
                </Tabs>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Graph Section Component
const GraphSection = ({ data, label }) => {
  const chartData = {
    labels: data.map((item) => new Date(item.createdAt).toLocaleDateString()), // Using createdAt as time dimension
    datasets: [
      {
        label: label,
        data: data.map((item) => item.new_stock_quantity || item.quantity), // Quantity to be graphed
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{label} Graph</h3>
      <Line data={chartData} />
    </div>
  );
};

// Tab Container Component
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 border-b border-gray-300 pb-2">
        {children.map((child) => (
          <button
            key={child.props.label}
            onClick={() => setActiveTab(child.props.label)}
            className={`text-lg font-medium px-4 py-2 ${activeTab === child.props.label ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {children.map((child) =>
          activeTab === child.props.label ? <div key={child.props.label}>{child.props.children}</div> : null
        )}
      </div>
    </div>
  );
};

// Tab Component
const Tab = ({ label, children }) => {
  return <>{children}</>;
};

// Product Info Component (unchanged)
const ProductInfo = ({ item }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div><strong>Inventory ID:</strong> {item.inventoryId}</div>
    <div><strong>Product Name:</strong> {item.supplierProduct.product.name}</div>
    <div><strong>Description:</strong> {item.supplierProduct.product.description}</div>
    <div><strong>Category:</strong> {item.supplierProduct.product.category_id}</div>
    <div><strong>Supplier:</strong> {item.supplierProduct.supplier.name}</div>
    <div><strong>Unit:</strong> {item.unit.unit}</div>
    <div><strong>Stock Quantity:</strong> {item.stock_quantity}</div>
  </div>
);

// Supplier Product Details Component
const SupplierProductDetails = ({ item }) => (
  <div className="space-y-4">
    <div className="text-lg font-semibold">Supplier Product Details</div>
    <div><strong>Supplier Product ID:</strong> {item.supplierProduct.supplier_products_id}</div>
    <div><strong>Supplier ID:</strong> {item.supplierProduct.supplier_id}</div>
    <div><strong>Product ID:</strong> {item.supplierProduct.product_id}</div>
    <div><strong>Product Name:</strong> {item.supplierProduct.product.name}</div>
    <div><strong>Description:</strong> {item.supplierProduct.product.description}</div>
    <div><strong>SKU:</strong> {item.supplierProduct.product.sku}</div>
    <div><strong>Price:</strong> {item.supplierProduct.ProductPricing.price}</div>
    <div><strong>VAT:</strong> {item.supplierProduct.ProductPricing.VAT}</div>
    <div><strong>Discount:</strong> {item.supplierProduct.ProductPricing.discount}</div>
    <div><strong>Effective Date:</strong> {new Date(item.supplierProduct.ProductPricing.effective_date).toLocaleDateString()}</div>
    <div><strong>Supplier Name:</strong> {item.supplierProduct.supplier.name}</div>
    <div><strong>Supplier Address:</strong> {item.supplierProduct.supplier.address}</div>
    <div><strong>Supplier Contact:</strong> {item.supplierProduct.supplier.contact}</div>
  </div>
);

// Inventory Sales Tracking Component (unchanged)
const InventorySalesTracking = ({ item }) => (
  <div className="space-y-4">
    {item.InventorySalesTracking.map((tracking, trackingIndex) => (
      <div key={trackingIndex} className="p-4 border rounded-lg bg-gray-50 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div><strong>Tracking ID:</strong> {tracking.inventorysalesTrackingId}</div>
          <div><strong>Restock Date:</strong> {new Date(tracking.restock_date).toLocaleString()}</div>
          <div><strong>New Stock Quantity:</strong> {tracking.new_stock_quantity}</div>
          <div><strong>Old Stock Quantity:</strong> {tracking.old_stock_quantity}</div>
        </div>
      </div>
    ))}
  </div>
);

// Inventory Restock Component (unchanged)
const InventoryRestock = ({ item }) => (
  <div className="space-y-4">
    {item.InventoryRestock.map((restock, restockIndex) => (
      <div key={restockIndex} className="p-4 border rounded-lg bg-gray-50 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div><strong>Restock ID:</strong> {restock.inventoryRestockId}</div>
          <div><strong>Restock Date:</strong> {new Date(restock.restock_date).toLocaleString()}</div>
          <div><strong>New Stock Quantity:</strong> {restock.new_stock_quantity}</div>
          <div><strong>Old Stock Quantity:</strong> {restock.old_stock_quantity}</div>
        </div>
      </div>
    ))}
  </div>
);

// Transaction Products Component (unchanged)
const TransactionProducts = ({ item }) => (
  <div className="space-y-4">
    {item.TransactionProduct.map((transaction, transactionIndex) => (
      <div key={transactionIndex} className="p-4 border rounded-lg bg-gray-50 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div><strong>Product Name:</strong> {transaction.productName}</div>
          <div><strong>Transaction ID:</strong> {transaction.transactionId}</div>
          <div><strong>Quantity:</strong> {transaction.quantity}</div>
          <div><strong>Total Cost:</strong> {transaction.productTotalCost}</div>
          <div><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</div>
        </div>
      </div>
    ))}
  </div>
);

export default InventoryDetails;
