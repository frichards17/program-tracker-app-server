"use client"

import { useQuery } from '@tanstack/react-query'
import { User } from 'next-auth'

import { DataTable } from '@/components/ui/data-table'
import UserTable from './user-table'

export default function Users() {

  const getUsers = async (): Promise<User[]> => {
    const response = await fetch('/api/users')
    const users: User[] = await response.json()
    return users
  }

  const result = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
    <div>
      <h1 className="font-extrabold text-4xl">Users</h1>
      <br />
      <UserTable userQuery={result} />
    </div>
  )
}
