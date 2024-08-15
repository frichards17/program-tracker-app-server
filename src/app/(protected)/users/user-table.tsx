import { UseQueryResult } from '@tanstack/react-query'
import { columns } from './columns'
import { User } from 'next-auth'
import { DataTable } from '@/components/ui/data-table'

const UserTable = ({
    userQuery
}: {
    userQuery: UseQueryResult<User[]>
}) => {
    const { 
        isPending, 
        isError, 
        data, 
        error
    } = userQuery

    if(isPending){
        return <span>Loading...</span>
    }

    if(isError){
        return <span>Error: {error.message}</span>
    }

    return <DataTable columns={columns} data={data} />
    
}

export default UserTable