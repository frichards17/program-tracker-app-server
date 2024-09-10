import { AddSessionExerciseRequest } from "@/types/session/add-session-exercise-request"
import axiosInstance from "../axiosInstance"
import { Exercise } from "./exercise.service"

export interface SessionExercise {
    exercise: Exercise
    reps: number
    sets: number
    weight: number
}

export interface Session {
    session_id: number
    session_name: string
    exercises: SessionExercise[]
}

export const getSessionExercises = async (forSession: number) => {
    const response = await axiosInstance.get(`/session-exercises/for-session/${forSession}`)
    return response.data
}

export const getSessions = async (forProgram: number) => {
    const response = await axiosInstance.get(`/sessions/for-program/${forProgram}`)
    return response.data
}

export const addSessionExercise = async (sessionExercise: AddSessionExerciseRequest) => {
    const response = await axiosInstance.post('/session-exercises', sessionExercise)
    return response.data
}