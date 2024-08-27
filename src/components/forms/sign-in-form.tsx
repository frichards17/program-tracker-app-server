"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EMAIL, PASSWORD, SIGNIN } from "@/constants/auth";
import { Button } from "../ui/button";
import SignInWithGoogle from "../auth/SignInWithGoogle";
import { FormErrors } from "./form-error";
import { useFormState } from "react-dom";
import { signInAction } from "@/app/auth/actions/actions";
import { redirect } from "next/navigation";

const INITIAL_STATE = {
  message: null,
  errors: null
}

export function SignInForm() {

  const [formState, formAction] = useFormState(signInAction, INITIAL_STATE)

  if(formState.message === "success"){
    redirect('/dashboard')
  }

  return (
    <div className="w-full max-w-md">

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <form onSubmit={handleSubmit} className='space-y-4'> */}
          <form action={formAction} className='space-y-4'>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id={EMAIL}
                name={EMAIL}
                type="text"
                placeholder="joe.smith@example.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrors errors={formState.errors?.[EMAIL]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id={PASSWORD}
                name={PASSWORD}
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrors errors={formState.errors?.[PASSWORD]} />
            </div>
            {/* <Button className="w-full" disabled={loading}> */}
            {/* {loading ? "Signing in..." : "Sign In"} */}
            <Button className="w-full">
              Sign in
            </Button>
            <FormErrors errors={formState.errors?.[SIGNIN]} className="w-full text-center"/>
          </form>
          <CardDescription className='w-full text-center'>
            Or sign in with...
          </CardDescription>
          <SignInWithGoogle />
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm">
        Don't have an account?
        <Link className="underline ml-2" href="signup">
          Sign Up
        </Link>
      </div>

    </div>
  );
}