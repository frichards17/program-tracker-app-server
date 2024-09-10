import LoadingIndicator from '@/components/common/loading-indicator'
import PageTitle from '@/components/common/page-title'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <LoadingIndicator />
    </div>
  )
}
