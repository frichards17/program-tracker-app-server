'use client'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button';
import { FaGoogle as GoogleIcon } from "react-icons/fa";

export default function SignInWithGoogle() {
  return (
      <Button variant="outline" className="w-full space-x-2" onClick={() => signIn('google')}>
          <GoogleIcon />
          <p>Google</p>
      </Button>
  )
}
