"use client"

import LoadingIndicator from '@/components/common/loading-indicator'
import PageTitle from '@/components/common/page-title'
import { Program } from '@/lib/external-api/backend-services/program.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ProgramPageLayout = ({
    params,
    children
}: {
    params: { slug: string[] }
    children: React.ReactNode
}) => {

    const program_id = params.slug?.[0]

    if(!program_id) { 
        console.log("NO PROGRAM ID :(")
        console.log(params)
        return 
    }

    const getClientInfo = async (): Promise<Program> => {
        const response = await fetch(`/api/programs/${program_id}`)
        
        const client = await response.json()
        console.log("Client info loaded:", client)
        return client
    }

    const {
        isPending,
        isError,
        data: program,
        error
    } = useQuery({
        queryKey: ['program-info'],
        queryFn: getClientInfo,
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className='space-y-4'>
            <PageTitle title={program.program_name} />
            <span className="text-md text-muted-foreground">{program.client.first_name} {program.client.last_name}</span>
            {children}
        </div>
    )
}

export default ProgramPageLayout