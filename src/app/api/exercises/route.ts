import { createExercise, getExercises } from "@/lib/external-api/backend-services/exercise.service"
import { CreateExerciseRequest } from "@/types/exercise/create-exercise"
import { NextRequest, NextResponse } from "next/server"

export async function GET(){
    const users = await getExercises()
    return NextResponse.json(users)
}

export async function POST(request: NextRequest){
    const exercise: CreateExerciseRequest = await request.json()
    const created = await createExercise(exercise)
    return NextResponse.json(created)
}