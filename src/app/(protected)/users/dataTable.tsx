import { User } from '@/lib/external-api/backend-services/user.service'
import { UseQueryResult } from '@tanstack/react-query'
import React from 'react'

const DataTable = ({
    queryResult
}: {
    queryResult: UseQueryResult<User[]>
}) => {

    const { 
        isPending, 
        isError, 
        data, 
        error
    } = queryResult

    if(isPending){
        return <span>Loading...</span>
    }

    if(isError){
        return <span>Error: {error.message}</span>
    }


  return (
    <div>
        <ul>
            {data.map((user)=>(<li>{`${user.first_name} ${user.last_name}`}</li>))}
        </ul>
    </div>
  )
}

export default DataTable