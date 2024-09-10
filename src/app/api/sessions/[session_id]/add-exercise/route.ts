import { addSessionExercise } from "@/lib/external-api/backend-services/session.service"
import { AddSessionExerciseRequest } from "@/types/session/add-session-exercise-request"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { session_id: string } }){
    console.log(`REQUEST LOG POST sessions/${params.session_id}/add-exercise`)
    // Get request apart from session id from request body
    const sessionExercise: Omit<AddSessionExerciseRequest, 'session_id'> = await request.json()
    // Add session id from params
    const created = await addSessionExercise({...sessionExercise, session_id: +params.session_id})
    return NextResponse.json(created)
}