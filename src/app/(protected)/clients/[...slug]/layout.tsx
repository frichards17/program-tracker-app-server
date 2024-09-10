"use client"

import ClientProfile from "@/components/clients/client-profile"
import LoadingIndicator from "@/components/common/loading-indicator"
import { useQuery } from "@tanstack/react-query"
import { User } from "next-auth"

// Layout for all single client routes
export default function ClientLayout(
    {
        params,
        children
    }: {
        params: { slug: string[] }
        children: React.ReactNode
    }
) {

    const user_id = params.slug?.[0]

    if(!user_id) { 
        console.log("NO USER ID :(")
        console.log(params)
        return 
    }

    const getClientInfo = async (): Promise<User> => {
        const response = await fetch(`/api/clients/${user_id}`)
        
        const client = await response.json()
        console.log("Client info loaded:", client)
        return client
    }

    const {
        isPending,
        isError,
        data: user,
        error
    } = useQuery({
        queryKey: ['client-info'],
        queryFn: getClientInfo,
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <ClientProfile user_name={user.first_name + " " + user.last_name} user_email={user.email} >
            {children}
        </ClientProfile>
    )
}