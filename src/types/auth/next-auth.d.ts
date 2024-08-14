import NextAuth from "next-auth";
import { User } from "../User";

declare module 'next-auth' {
  interface Session {
    user: User,
    [key: string]: any;
  }

  interface Profile {
    email: string
    given_name: string
    family_name: string
  }

  interface User {
    user_id: number
    email: string
    first_name: string
    last_name: string
    role_id: string
  }

}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User,
  }
}