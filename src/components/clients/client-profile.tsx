import React from 'react'
import PageTitle from '../common/page-title'

const ClientProfile = ({
    user_name,
    user_email,
    children
} : {
    user_name: string,
    user_email: string
    children?: React.ReactNode
}) => {
  return (
    <div className='space-y-4'>
      <PageTitle title={user_name} />
      <span className="text-md text-muted-foreground">{user_email}</span>
      {children}
    </div>
  )
}

export default ClientProfile