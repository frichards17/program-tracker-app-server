"use client"
import LoadingIndicator from '@/components/common/loading-indicator'
import CreateSession from '@/components/forms/session/create-session'
import ProgramSessionsCard from '@/components/programs/program-sessions-list'
import SessionCard from '@/components/programs/session-card'
import { Program } from '@/lib/external-api/backend-services/program.service'
import { Session } from '@/lib/external-api/backend-services/session.service'
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

const ProgramPage = ({ params }: { params: { slug: string[] } }) => {

  const { slug } = params
    const program_id = slug?.[0]
    const createSessions = slug?.[1] === 'create-sessions'

    if(slug?.[1] && !createSessions){
        redirect('/programs/' + slug?.[0])
    }

    const getProgramInfo = async (): Promise<Program> => {
        const response = await fetch(`/api/programs/${program_id}`)
        return await response.json()
    }

    const getSessions = async (): Promise<Session[]> => {
        const response = await fetch(`/api/sessions/for-program/${program_id}`)
        return await response.json()
    }

    const programInfoQuery = useQuery({
        queryKey: ['program-info'],
        queryFn: getProgramInfo,
    })

    const sessionsQuery = useQuery({
        queryKey: ['sessions'],
        queryFn: getSessions,
    })

    if (programInfoQuery.isPending) {
        return <LoadingIndicator />
    }

    if (programInfoQuery.isError) {
        return <span>Error: {programInfoQuery.error.message}</span>
    }

    if(createSessions){

        return (
            <div className='grid gap-4 grid-cols-1 xl:grid-cols-2'>
                <CreateSession />
                {sessionsQuery.data?.map((session) => {
                    return(
                        <SessionCard session={session} key={session.session_id} />       
                    )
                })}
            </div>
        )
        
    }

    return (
        <div className='grid gap-4 grid-cols-1 xl:grid-cols-2'>
            <ProgramSessionsCard program_id={+program_id}/>
        </div>
    )
}

export default ProgramPage