"use client"

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { columns } from './columns'
import { User } from 'next-auth'
import { DataTable } from '@/components/ui/data-table'

const UserTable = () => {

    const getUsers = async (): Promise<User[]> => {
        const response = await fetch('/api/users')
        const users: User[] = await response.json()
        return users
      }

    const { 
        isPending, 
        isError, 
        data, 
        error
    } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
      })

    if(isPending){
        return <span>Loading...</span>
    }

    if(isError){
        return <span>Error: {error.message}</span>
    }

    return <DataTable columns={columns} data={data} />
    
}

export default UserTable