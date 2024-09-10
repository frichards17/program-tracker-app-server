import PageTitle from '@/components/common/page-title'
import UserTable from './user-table'

export default function Users() {

  return (
    <div>
      <PageTitle title="Users" />
      <br />
      <UserTable />
    </div>
  )
}
