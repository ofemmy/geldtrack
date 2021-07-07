//import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import EntriesCell from 'src/components/EntriesCell'

import { Info } from 'luxon'
import { useDate } from 'src/utils/hooks/useDate'
import MonthPicker from 'src/components/MonthPicker/MonthPicker'
const DashboardPage = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  const { currentMonth } = useDate()
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-light text-gray-500 tracking-wide uppercase">
          {Info.months()[currentMonth - 1]} 2021
        </h2>

        <MonthPicker />
      </div>

      <EntriesCell userId={currentUser.sub} month={currentMonth} />
    </div>
  )
}

export default DashboardPage
