/**
 * Actions to be called by auth forms (sign in/sign up)
 */

import {
    EMAIL,
    PASSWORD,
    FIRST_NAME,
    LAST_NAME,
    SIGNIN,
    ERROR,
    Validation,
    CONFIRM_PASSWORD,
    SIGNUP
} from "@/constants/auth"
import { capitalise } from "@/lib/utils";

import { signIn } from "next-auth/react";

import { z } from "zod"

// Validation schema for sign up form data
const registerSchema = z.object({
    [EMAIL]: Validation.EMAIL_SCHEMA,
    [FIRST_NAME]: Validation.FIRST_NAME_SCHEMA,
    [LAST_NAME]: Validation.LAST_NAME_SCHEMA,
    [PASSWORD]: Validation.CREATE_PASSWORD_SCHEMA,
    [CONFIRM_PASSWORD]: z.string()
}).refine((data) => data[PASSWORD] === data[CONFIRM_PASSWORD], {
    message: "Passwords do not match",
    path: [PASSWORD]
})

// Validation schema for sign in form data
const signInSchema = z.object({
    password: Validation.PASSWORD_SCHEMA,
    email: Validation.EMAIL_SCHEMA
})

/**
 * Sign in form action to be used in useFormState hook.
 * @param prevState The previous form state.
 * @param formData The form's data.
 * @returns 
 */
export async function signInAction(prevState: any, formData: FormData) {
    
    // Get data from form
    const email = formData.get(EMAIL)
    const password = formData.get(PASSWORD)

    // Validate data
    const validatedData = signInSchema.safeParse({
        [EMAIL]: email,
        [PASSWORD]: password
    })

    // Invalid data, return errors
    if(!validatedData.success){
        console.log("Invalid login credentials")
        return {
            ...prevState,
            message: "error",
            errors: validatedData.error.flatten().fieldErrors
        }
    }

    // call sign in api
    const response = await signIn('credentials', { email, password, redirect: false })
    var loginError = null

    if(!response){
        // Generic error for failed response
        loginError = "Something went wrong"
    }

    // Return message and any errors into form state
    return {
        ...prevState,
        message: response?.status == 200 ? "success" : "error",
        errors: { [SIGNIN]: [response?.error ?? loginError] }
    }

}

/**
 * Sign up form action to be used in useFormState hook.
 * @param prevState The previous form state.
 * @param formData The form's data.
 * @returns 
 */
export async function signUpAction(prevState: any, formData: FormData) {

    // Get data from form
    const email = formData.get(EMAIL) ?? ""
    const password = formData.get(PASSWORD) ?? ""
    const confirmPassword = formData.get(CONFIRM_PASSWORD) ?? ""
    const firstName = formData.get(FIRST_NAME) ?? ""
    const lastName = formData.get(LAST_NAME) ?? ""

    // Parse data into validated data
    const validatedData = registerSchema.safeParse({
        [EMAIL]: email,
        [PASSWORD]: password,
        [CONFIRM_PASSWORD]: confirmPassword,
        [FIRST_NAME]: firstName,
        [LAST_NAME]: lastName
    })
    console.log("Validating data")
    // Invalid data, return errors
    if(!validatedData.success){
        return {
            ...prevState,
            message: ERROR,
            errors: validatedData.error?.flatten().fieldErrors
        }
    }
    

    // call sign up api
    const response = await fetch('/api/auth/signup',{
        method: 'POST',
        body: JSON.stringify({
            email: validatedData.data[EMAIL],
            password: validatedData.data[PASSWORD],
            first_name: capitalise(validatedData.data[FIRST_NAME]),
            last_name: capitalise(validatedData.data[LAST_NAME]) 
        })
    })

    const json = await response.json()
    console.log("SignUp Response:")
    console.log(json)

    if(!json || json.status != 200){
        console.log("SignUp Error")
        return {
            ...prevState,
            message: ERROR,
            errors: { [SIGNUP]: [json?.error ?? "Failed to register user"] }
        }
    }

    // call sign in api
    const signInResponse = await signIn('credentials', { email, password, redirect: true })

    // Return message and any errors into form state
    return {
        ...prevState,
        message: signInResponse?.status == 200 ? "success" : "error",
        errors: { [SIGNUP]: [json?.error ?? "Something went wrong"] }
    }

}