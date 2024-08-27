import { getLatestProgram } from "@/lib/external-api/backend-services/program.service"
import { isErrorResponse } from "@/types/ErrorResponse"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { user_id: string } }){
    try {
        const program = await getLatestProgram(+params.user_id)
        return NextResponse.json(program)
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