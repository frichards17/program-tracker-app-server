import { RegisterForm } from "@/components/forms/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {

    const session = await getServerSession()
    if(session){
        redirect('/dashboard')
    }

    return(
        <RegisterForm />
    )
}