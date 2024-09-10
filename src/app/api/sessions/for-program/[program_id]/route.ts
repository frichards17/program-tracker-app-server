import { getSessions } from "@/lib/external-api/backend-services/session.service"
import { NextRequest, NextResponse } from "next/server"

// Get all sessions for a given program id
export async function GET(request: NextRequest, { params }: { params: { program_id: string } }){
    const sessions = await getSessions(+params.program_id)
    return NextResponse.json(sessions)
}