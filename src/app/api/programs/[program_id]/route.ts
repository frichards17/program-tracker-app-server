import { getProgram } from "@/lib/external-api/backend-services/program.service"
import { isErrorResponse } from "@/types/ErrorResponse"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { program_id: string } }){
    try {
        const user = await getProgram(+params.program_id)
        return NextResponse.json(user)
    } catch(error) {
        if(isErrorResponse(error)){
            return Response.json({
                status: error.statusCode,
                error: error.message
            })
        } else {
            return Response.json(error)
        }
    }
}