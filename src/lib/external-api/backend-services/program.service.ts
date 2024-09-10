
import axiosInstance from "../axiosInstance"
import { Session } from "./session.service"
import { User } from "./user.service"

export interface Program {
    program_id: number
    program_name: string
    start_date: Date
    client: User
    sessions: Session[]
}

export const getProgram = async (id: number): Promise<Program> => {
    console.log("Getting program", id)
    const response = await axiosInstance.get(`/programs/${id}`);
    const program: Program = {
        ...response.data,
        start_date: new Date(response.data.start_date)
    }
    console.log("Got program", program)
    return program
}

export const getLatestProgram = async (forClient: number): Promise<Program> => {
    const response = await axiosInstance.get(`/programs/for-client/${forClient}/latest`)
    const program: Program = {
        ...response.data,
        start_date: new Date(response.data.start_date)
    }
    return program
}