
import { NextRequest, NextResponse } from "next/server";
import { getServerSessionWithOpts } from "../auth/[...nextauth]/route";
import { getClients } from "@/lib/external-api/backend-services/user.service";

export async function GET(req: NextRequest){
    const session = await getServerSessionWithOpts()
    if(!session){
        return NextResponse.json(
            { success: false, message: 'Unauthorized', status: 401 },
            { status: 401 }
        )
    }
    const users = await getClients(session.user.user_id)
    return NextResponse.json(users)
}