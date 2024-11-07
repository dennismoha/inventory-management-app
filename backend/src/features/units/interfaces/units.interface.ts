// Interface for Units (as referenced in ProductUnits and SupplierPricing)
export interface Unit {
    unit_id: string;    // UUID for the unit
    name: string;       // Name of the unit (e.g., 'kg', 'piece', 'liter')
    symbol: string;     // Symbol for the unit (e.g., 'kg', 'pcs', 'L')
    created_at: string; // ISO 8601 DateTime string
    updated_at: string; // ISO 8601 DateTime string
  }