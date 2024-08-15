import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pen, Lock, LockOpen } from "lucide-react"
import { User } from "next-auth"
 
export const columns: ColumnDef<User>[] = [
  {
    accessorFn: row => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role_id",
    header: "Role",
  },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const user = row.original
 
//       return (
//         <div className='flex flex-row space-x-2 items-center justify-end'>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Lock user</span>
//               <Lock className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Edit user</span>
//               <Pen className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Delete user</span>
//               <Trash className="h-4 w-4" />
//             </Button>
//         </div>
//       )
//     },
//   }
]