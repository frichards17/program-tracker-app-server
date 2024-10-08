import { SignInForm } from '@/components/forms/auth/sign-in-form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'

export default async function LoginPage() {

    const session = await getServerSession()
    if(session){
        redirect('/dashboard')
    }

    return(
        <div>
        <SignInForm />
        </div>
    )
}