import { signUp } from "@/lib/external-api/backendAuthService"
import RegisterRequest from "@/types/auth/RegisterRequest"
import { isErrorResponse } from "@/types/ErrorResponse"

// SignUp POST request
export async function POST(request: Request){
    const user: RegisterRequest = await request.json()
    try{
        const result = await signUp(user)
        return Response.json(result)
    } catch (error) {
        // Check if response is standard error response
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