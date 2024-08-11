import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { fetchUser, googleSignIn, signIn } from "@/lib/external-api/backendAuthService";
import { getServerSession as getServerSessionNextAuth} from 'next-auth'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: "email" },
                password: { label: "password" }
            },
            async authorize(credentials) {
                if (credentials) {
                    // Request sign in on backend
                    const response = await signIn({
                        email: credentials.email,
                        password: credentials.password
                    })
                    // Return user object to be picked up
                    // in jwt callback
                    return response

                }
                return null
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // User from db
            // Returned in authorize function (credentials login)
            if(user){
                // Attach user to token, to be picked up in
                // session callback
                return {
                    ...token,
                    id: user.id,
                    user: user
                }
            }
            return token
        },
        async session({ session, token }) {
            console.log("Session token:", token)
            
            // Check if session and token has first_name (i.e. from database)
            if(!session.user.first_name && !token.user.first_name && token.email){
                // User object in session and token is from google
                // Get correct user object from database and attach to session
                const user = await fetchUser(token.email)
                return {
                    ...session,
                    user: user
                }
            }
            return {
                ...session, 
                user: token.user
            }
        },
        async signIn({ account, profile }) {
            if(account){
                // Handle google sign in
                if(account.provider === 'google'){
                    
                    // Need profile from google to create
                    // user in db
                    if(!profile || !profile.email){
                        console.log("SignIn: NO PROFILE")
                        return false
                    }

                    // Check for a response from google sign
                    // in on backend
                    const response = await googleSignIn({
                        email: profile.email, 
                        first_name: profile.given_name, 
                        last_name: profile.family_name
                    })
                    if(response){
                        return true
                    }

                }else if(account.provider = 'credentials'){
                    // Sign in with credentials, already verified in authorize()
                    return true
                }
            }
            // Anything other than credentials, or successful google
            // sign in should be rejected
            return false
        },
    },
    pages: {
        signIn: "/signin",
        signOut: "/signout"
    }
}

export function getServerSession(){
    return getServerSessionNextAuth(authOptions)
} 

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }