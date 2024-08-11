export interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
    return typeof obj === 'object' &&
           obj !== null &&
           typeof obj.statusCode === 'number' &&
           typeof obj.error === 'string' &&
           typeof obj.message === 'string';
  }