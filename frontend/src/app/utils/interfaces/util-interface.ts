// Generic API Response Interface
export interface ApiResponse<T> {
    statusCode: number;
    data: T[];
    status: string;
  }
  