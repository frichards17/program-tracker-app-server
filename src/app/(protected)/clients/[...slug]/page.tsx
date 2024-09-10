"use client"
import CurrentProgram from "@/components/clients/current-program"
import PastPrograms from "@/components/clients/past-programs"
import LoadingIndicator from "@/components/common/loading-indicator"
import CreateProgram from "@/components/forms/program/create-program"
import { useQuery } from "@tanstack/react-query"
import { User } from "next-auth"
import { redirect } from "next/navigation"

export default function Page({ params }: { params: { slug: string[] } }) {

    const { slug } = params
    const user_id = slug?.[0]
    const createProgram = slug?.[1] === 'create-program'

    if(slug?.[1] && !createProgram){
        redirect('/clients/' + slug?.[0])
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


    if(createProgram){
        return (
            <CreateProgram/>
        )
    }

    return (
        <div className='grid gap-4 grid-cols-1 xl:grid-cols-2'>
            <CurrentProgram user_id={user.user_id} />
            <PastPrograms user_id={user.user_id} user_first_name={user.first_name}/>
        </div>
    )
  }