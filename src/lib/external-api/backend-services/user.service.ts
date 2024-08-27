import axiosInstance from "../axiosInstance"

export interface User {
    user_id: number
    first_name: string
    last_name: string
}

export const getUser = async (id: number): Promise<User> => {
    console.log("Getting user", id)
    const response = await axiosInstance.get(`/users/${id}`);
    const user: User = response.data
    console.log("Got user", user)
    return user
}

export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    const users: User[] = response.data
    return users
}

export const getClients = async (forUserId: number): Promise<User[]> => {
    const response = await axiosInstance.get(`/users/${forUserId}/clients`)
    const clients: User[] = response.data
    return clients
}