/**
 * Functions to fetch data from backend server
 */

import RegisterRequest from "@/types/auth/RegisterRequest";
import axiosInstance, { BackendError } from "../axiosInstance";

export interface SignInPayload {
    email: string
    password: string
}

export interface GoogleSignInPayload {
    email: string
    first_name: string
    last_name: string
}

export interface SignInResponse {
    status: number,
    data: any
}

/**
 * Send a sign in request to the backend server.
 * @param credentials Sign in credentials, { email: string, password: string }
 * @returns 
 */
export const signIn = async (credentials: SignInPayload) => {
    // Send credentials to signin api
    const response = await axiosInstance.post('/auth/signin', credentials);
    return response.data
}

// Send google sign in request to backend
export const googleSignIn = async (credentials: GoogleSignInPayload) => {
    try {
        const response = await axiosInstance.post('/auth/google-signin', credentials)
        return response
    } catch (error) {
        throw error;
    }
}

/**
 * Send a signUp request to the backend server.
 * @param userData Sign up data used to create the user.
 * @returns 
 */
export const signUp = async (userData: RegisterRequest) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data
}

export const fetchUser = async (email: string) => {
    const response = await axiosInstance.get(`/users/byemail/${email}`)
    return response.data
}