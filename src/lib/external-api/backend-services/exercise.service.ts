import { CreateExerciseRequest } from "@/types/exercise/create-exercise"
import axiosInstance from "../axiosInstance"

export interface Exercise {
    exercise_id: number
    exercise_name: string
}

export const getExercises = async (): Promise<Exercise[]> => {
    console.log("Getting exercises")
    const response = await axiosInstance.get('/exercises');
    console.log("Exercises got:", response.data)
    const users: Exercise[] = response.data
    return users
}

export const createExercise = async (exercise: CreateExerciseRequest): Promise<Exercise> => {
    console.log("Posting exercise to backend:", exercise)
    const response = await axiosInstance.post('/exercises', exercise)
    return response.data
}