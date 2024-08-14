"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import DataTable from './dataTable'
import { User } from 'next-auth'

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
      <DataTable queryResult={result} />
    </div>
  )
}
