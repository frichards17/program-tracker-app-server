import axiosInstance from "../axiosInstance"

export interface User {
    user_id: number
    first_name: string
    last_name: string
}

export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    const users: User[] = response.data
    return users
}