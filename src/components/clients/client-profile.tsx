import React from 'react'

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
      <h1 className="font-extrabold text-4xl">{user_name}</h1>
      <span className="text-md text-muted-foreground">{user_email}</span>
      {children}
    </div>
  )
}

export default ClientProfile