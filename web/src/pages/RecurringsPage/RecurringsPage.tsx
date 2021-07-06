import { useAuth } from '@redwoodjs/auth'
import RecurringEntriesCell from 'src/components/RecurringEntriesCell'

const RecurringsPage = () => {
  const { currentUser } = useAuth()
  return (
    <div>
      <RecurringEntriesCell userId={currentUser.sub} />
    </div>
  )
}

export default RecurringsPage
