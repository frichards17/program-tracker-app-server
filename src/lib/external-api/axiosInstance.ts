/**
 * Axios instance to be used in external api calls
 */
import axios from "axios";

export interface BackendError {
    message: string
    statusCode: number
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            // Throw axios error data
            throw error.response?.data ?? { status: 500, message: "Something went wrong."};
        } else {
            // Other errors
            throw new Error(error)
        }
    }
);

export default axiosInstance