"use client"

import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/ui/data-table'
import { useRouter } from 'next/navigation'
import { Exercise } from '@/lib/external-api/backend-services/exercise.service'
import { columns } from './columns'
import LoadingIndicator from '@/components/common/loading-indicator'

const ExercisesTable = () => {

    const router = useRouter()

    const getExercises = async (): Promise<Exercise[]> => {
        const response = await fetch('/api/exercises')
        const users: Exercise[] = await response.json()
        return users
    }

    const {
        isPending,
        isError,
        data,
        error
    } = useQuery({
        queryKey: ['exercises'],
        queryFn: getExercises,
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return <DataTable columns={columns} data={data}/>

}

export default ExercisesTable