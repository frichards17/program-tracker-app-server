import AuthButton from "@/components/auth/AuthButton"

import { redirect } from "next/navigation"
import { getServerSession } from "../api/auth/[...nextauth]/route"

// Layout for all protected routes
export default async function ProtectedLayout({
    children
} : {
    children: React.ReactNode
}) {

    const session = await getServerSession()

    if(!session){
        redirect('/signin')
    }

    return(
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-row space-x-2">
                <p>{`Hi ${session?.user?.first_name}!`}</p>
                <AuthButton/>
            </div>
            <br/>
            {children}
        </main>
    )
}