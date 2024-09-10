import React from 'react'
import ClientsTable from './clients-table'
import PageTitle from '@/components/common/page-title'

export default function Clients() {

  return (
    <div>
      <PageTitle title="Clients" />
      <br/>
      <ClientsTable />
    </div>
  )
}
