import { getSessionExercises } from "@/lib/external-api/backend-services/session.service"
import { NextRequest, NextResponse } from "next/server"

// Get all SessionExercise for a given session_id 
export async function GET(request: NextRequest, { params }: { params: { session_id: string } }){

    const sessions = await getSessionExercises(+params.session_id)
    return NextResponse.json(sessions)
}