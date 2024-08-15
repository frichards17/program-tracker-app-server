import { ColumnDef } from "@tanstack/react-table"
import { User } from "next-auth"
 
export const columns: ColumnDef<User>[] = [
  {
    accessorFn: row => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  }
]