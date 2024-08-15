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

export const getClients = async (forUserId: number): Promise<User[]> => {
    console.log("User ID:", forUserId)
    const response = await axiosInstance.get(`/users/${forUserId}/clients`)
    const clients: User[] = response.data
    console.log("Clients fetched:", clients)
    return clients
}