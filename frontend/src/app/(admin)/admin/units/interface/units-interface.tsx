// types/units.ts

export interface Unit {
    unit_id: string; // UUID for the unit
    unit: string;    // Name of the unit (e.g., 'kg', 'piece', 'liter')
    short_name: string;  // Symbol for the unit (e.g., 'kg', 'pcs', 'L')
    no_of_products: number;
    created_at: Date; // ISO 8601 DateTime string
    updated_at: Date; // ISO 8601 DateTime string
  }
  
  export interface UnitApiResponse {
    statusCode: number;
    data: Unit[];
    status: string
  }

  export interface UnitBodyPayload {
    unit_id: string; // UUID for the unit
    unit: string;    // Name of the unit (e.g., 'kg', 'piece', 'liter')
    short_name: string;  // Symbol for the unit (e.g., 'kg', 'pcs', 'L')
    no_of_products: number;
  }
  