// Generic API Response Interface
// export interface ApiResponse<T> {
//     statusCode: number;
//     data: T[] | number;
//     status: string;
//   }

export interface ApiResponse<T> {
  statusCode: number;
  data: T extends number
  ? number
  : T extends object
  ? T[] // If T is an object, data will be T[]
  : T;   //
  status: string;
}

  