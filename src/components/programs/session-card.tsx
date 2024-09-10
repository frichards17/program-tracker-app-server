"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Session, SessionExercise } from '@/lib/external-api/backend-services/session.service'
import AddExercise, { AddExerciseDto } from '../forms/session/add-exercise'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const ExerciseList = ({
    sessionExercises
}: {
    sessionExercises: SessionExercise[]
}) => {

    return (
        sessionExercises.map((sessionExercise) => {
            const exercise = sessionExercise.exercise
            return (
                <p key={exercise.exercise_id}>{exercise.exercise_name} at {sessionExercise.weight}kg for {sessionExercise.sets} sets of {sessionExercise.reps}.</p>
            )
        })
    )

}

const SessionCard = ({
    session
}: {
    session: Session
}) => {
    const queryClient = useQueryClient()

    const getExercises = async (): Promise<SessionExercise[]> => {
        const response = await fetch(`/api/sessions/${session.session_id}/exercises`)
        return await response.json()
    }

    const {
        isPending,
        isError,
        data: exercises,
        error
    } = useQuery({
        queryKey: ['session-exercises'],
        queryFn: getExercises,
    })

    const addExercise = async (exercise: AddExerciseDto) => {

        const response = await fetch(`/api/sessions/${exercise.session_id}/add-exercise`, {
            method: 'POST',
            body: JSON.stringify(exercise)
        })

        console.log("Add SessionExercise response:", response)

        queryClient.invalidateQueries({ queryKey: ['session-exercises'] })
    }

    return (
        <Card key={session.session_id}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">{session.session_name}</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="min-h-80 flex flex-col space-y-4 justify-between">
                {
                    isPending ? <p>Loading...</p> :
                        error ? <p>{error.message}</p> :
                            exercises ? <ExerciseList sessionExercises={exercises} /> :
                                <p>This session has no exercises, add an exercise below.</p>
                }
                <AddExercise addExercise={addExercise} forSession={session.session_id} />
            </CardContent>
        </Card>
    )
}

export default SessionCard