import { decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Middleware function to check for session cookie
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')
  const secret = process.env.NEXTAUTH_SECRET
  const { pathname } = request.nextUrl

  // Allow sign in and sign up
  if(
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api/auth')
  ){
    return NextResponse.next()
  }

  // Check for session
  if (token && secret) {
    try {
      const result = await decode({
        token: token.value,
        secret: secret
      })

      if(result){
        return NextResponse.next()
      }
    } catch (error) {
      // Error, continue to unauthorized response
      console.log("Decode error:", error)
    }
  }

  // If API return error response
  if(pathname.startsWith("/api")){
    return NextResponse.json(
      { success: false, message: 'Unauthorized', status: 401 },
      { status: 401 }
    )
  }
  // If page redirect to sign in
  else{
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}