import { Response } from 'hyper-express';

interface ApiResponse<Type> {
    is_success?: boolean;
    message?: string;
    data?: Type;
}

export function OK<Type>(response: Response, payload: ApiResponse<Type>): void {
    const apiResponse: ApiResponse<Type> = {
        is_success: true,
        message: payload.message || 'Success',
        data: payload.data,
    };
    response.json(apiResponse);
}

export function FAIL(response: Response, message: string): void {
    const apiResponse: ApiResponse<null> = {
        is_success: false,
        message: message || 'Internal Server Error',
    };
    response.json(apiResponse);
}