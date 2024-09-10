"use client"
import Link from 'next/link'
import { Button } from '../ui/button'
import { Program } from '@/lib/external-api/backend-services/program.service'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { formatDate } from '@/lib/utils'
import ProgramSessions from './program-sessions'
import LoadingIndicator from '../common/loading-indicator'

const NoPrograms = ({
    user_id
}: {
    user_id: number
}) => {
    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Current Program</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="min-h-80 flex flex-col items-center justify-center">
                <span className='text-lg font-semibold'>No current program.</span>
                <span className='text-md text-muted-foreground'>To get started, create a program.</span>
                <Link className='py-4' href={`/clients/${user_id}/create-program`}>
                    <Button>
                        Create Program
                    </Button>
                </Link>
            </CardContent>
        </Card>

    )
}

const CurrentProgram = ({
    user_id
}: {
    user_id: number
}) => {

    const getCurrentProgram = async (): Promise<Program> => {
        const response = await fetch(`/api/clients/${user_id}/current-program`)

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
        queryKey: ['current-program'],
        queryFn: getCurrentProgram,
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    if (program) {
        console.log("Program:", program)
        return (
            <Card className='min-h-80'>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold">Current Program - {program.program_name}</CardTitle>
                    <CardDescription>
                        {`${formatDate(program.start_date)} - Present`}
                    </CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent className="min-h-80 space-y-4">
                    Sessions
                    <ProgramSessions program_id={program.program_id}/>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <NoPrograms user_id={user_id} />
        )
    }


}

export default CurrentProgram