import NavBar from "@/components/common/nav/NavBar"
import { Separator } from "@/components/ui/separator"

// Layout for all protected routes
export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <main className="flex flex-col min-h-screen">
            <NavBar />
            <Separator />
            <div className='p-8'>
                {children}
            </div>

        </main>
    )
}