//import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import EntriesCell from 'src/components/EntriesCell'
const DashboardPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <EntriesCell userId={currentUser.sub} />
    </>
  )
}

export default DashboardPage
