import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import ProgramSessions from '../clients/program-sessions'

const ProgramSessionsCard = ({
    program_id
}: {
    program_id: number
}) => {
    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Sessions</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="min-h-80 flex flex-col items-center justify-center">
                <ProgramSessions program_id={program_id} />
            </CardContent>
        </Card>
    )
}

export default ProgramSessionsCard