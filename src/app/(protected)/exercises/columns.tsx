import { Button } from "@/components/ui/button"
import { Exercise } from "@/lib/external-api/backend-services/exercise.service"
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

 
export const columns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "exercise_name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <div className='flex flex-row space-x-2 items-center justify-end opacity-0 group-hover:opacity-100'>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Delete exercise</span>
              <Trash className="h-4 w-4" />
            </Button>
        </div>
      )
    },
  }
  
]