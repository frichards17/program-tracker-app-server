import { z } from "zod"

// Auth related constants
export const SIGNIN = "sign_in"
export const SIGNUP = "sign_up"
export const PASSWORD = "password"
export const CONFIRM_PASSWORD = "confirm_password"
export const EMAIL = "email"
export const FIRST_NAME = "first_name"
export const LAST_NAME = "last_name"

export const Validation = {

    EMAIL_SCHEMA: z.string()
        .max(254, 'Email is too long')
        .email('Please enter a valid email address'),

    CREATE_PASSWORD_SCHEMA: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password is too long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

    PASSWORD_SCHEMA: z.string()
    .min(1, 'Please enter a password'),

    FIRST_NAME_SCHEMA: z.string()
    .min(1, 'Please enter a first name')
    .max(50, 'First name must be at most 50 characters'),

    LAST_NAME_SCHEMA: z.string()
    .min(1, 'Please enter a first name')
    .max(50, 'Last name must be at most 50 characters')
}

export const SUCCESS = "success"
export const ERROR = "error"