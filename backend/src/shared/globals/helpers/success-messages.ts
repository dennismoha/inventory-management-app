import { Category} from '@src/features/categories/interfaces/categories.interface';
export default function GetSuccessMessage(statusCode: number , data: Category | []  , statusMessage: string) {
    return {
        statusCode: statusCode || 200, // Default to 200 if statusCode is not provided
        data: data || null, // Default to null if data is not provided
        status: statusMessage || 'Success' // Default to 'Success' if statusMessage is not provided
    };
}

