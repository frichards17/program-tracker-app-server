"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { 
  EMAIL, 
  PASSWORD, 
  CONFIRM_PASSWORD,
  FIRST_NAME,
  LAST_NAME,
  SIGNUP
} from "@/constants/Auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useFormState } from "react-dom";

import { signUpAction } from "@/app/(auth)/actions/auth-actions";

import { FormErrors } from "./FormError";
import { Button } from "../ui/button";
import SignInWithGoogle from "../auth/SignInWithGoogle";

// Initial form state
const INITIAL_STATE = {
  message: null,
  errors: null
}

// Register user form
export function RegisterForm() {

  const [formState, formAction] = useFormState(signUpAction, INITIAL_STATE)

  if(formState.message = "success"){
    
  }

  return (
    <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Register</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={formAction} noValidate className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={EMAIL}>Email</Label>
                <Input
                  id={EMAIL}
                  name={EMAIL}
                  type="email"
                  placeholder="joe.smith@example.com"
                />
                <FormErrors errors={formState?.errors?.[EMAIL]} />
              </div>

              <div className="space-y-2">
                <Label htmlFor={FIRST_NAME}>First Name</Label>
                <Input
                  id={FIRST_NAME}
                  name={FIRST_NAME}
                  type="text"
                  placeholder="Joe"
                />
                <FormErrors errors={formState?.errors?.[FIRST_NAME]} />
              </div>

              <div className="space-y-2">
                <Label htmlFor={LAST_NAME}>Last Name</Label>
                <Input
                  id={LAST_NAME}
                  name={LAST_NAME}
                  type="text"
                  placeholder="Smith"
                />
                <FormErrors errors={formState?.errors?.[LAST_NAME]} />
              </div>

              <div className="space-y-2">
                <Label htmlFor={PASSWORD}>Password</Label>
                <Input
                  id={PASSWORD}
                  name={PASSWORD}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={CONFIRM_PASSWORD}>Confirm Password</Label>
                <Input
                  id={CONFIRM_PASSWORD}
                  name={CONFIRM_PASSWORD}
                  type="password"
                  placeholder="Password"
                />
                <FormErrors errors={formState?.errors?.[PASSWORD]} />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
              <FormErrors errors={formState.errors?.[SIGNUP]} />
            </form>
            <CardDescription className='w-full text-center'>
              Or sign in with...
            </CardDescription>
            <SignInWithGoogle />
          </CardContent>



        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="signin">
            Sign In
          </Link>
        </div>
    </div>
  );
}