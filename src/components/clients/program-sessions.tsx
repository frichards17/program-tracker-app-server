import Link from "next/link"
import { Button } from "../ui/button"

const NoSessions = ({
    program_id
}: {
    program_id: number
}) => {
    return (

        <div className="min-h-80 flex flex-col items-center justify-center">
            <span className='text-lg font-semibold'>No sessions.</span>
            <span className='text-md text-muted-foreground'>Sessions need to be created for this program.</span>
            <Link className='py-4' href={`/programs/${program_id}/create-sessions`}>
                <Button>
                    Create Sessions
                </Button>
            </Link>
        </div>

    )
}


const ProgramSessions = ({
    program_id
}: {
    program_id: number
}) => {

    return (
        <NoSessions program_id={program_id} />
    )
}

export default ProgramSessions