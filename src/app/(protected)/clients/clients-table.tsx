"use client"

import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import { User } from 'next-auth'
import { DataTable } from '@/components/ui/data-table'
import { useRouter } from 'next/navigation'

const ClientsTable = () => {

    const router = useRouter()

    const getClients = async (): Promise<User[]> => {
        const response = await fetch('/api/clients')
        const users: User[] = await response.json()
        return users
    }

    const rowClicked = (client: User) => {
        console.log("Row clicked for user:", client.user_id)
        router.push(`/clients/${client.user_id}`)
    }

    const {
        isPending,
        isError,
        data,
        error
    } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients,
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return <DataTable columns={columns} data={data} onClickRow={rowClicked}/>

}

export default ClientsTable