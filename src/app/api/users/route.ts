import { getUsers } from "@/lib/external-api/backend-services/user.service";

export async function GET(){
    const users = await getUsers()
    return Response.json(users)
}