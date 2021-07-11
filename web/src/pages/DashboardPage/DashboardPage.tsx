//import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import EntriesCell from 'src/components/EntriesCell'

import { Info } from 'luxon'
import { useDate } from 'src/utils/hooks/useDate'
import MonthPicker from 'src/components/MonthPicker/MonthPicker'

const DashboardPage = () => {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const testDebounce = () => {
    setLoading(true)
    console.log({ loading })
    setTimeout(() => {
      setLoading(false)
      console.log({ loading })
    }, 5000)
  }
  const { currentMonth } = useDate()
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-light text-gray-500 tracking-wide uppercase">
          {Info.months()[currentMonth - 1]} 2021
        </h2>
        <button onClick={testDebounce}>Test click</button>
        <button onClick={() => console.log('hi')} disabled={loading}>
          Say hi
        </button>
        <MonthPicker />
      </div>

      <EntriesCell userId={currentUser.sub} month={currentMonth} />
    </div>
  )
}

export default DashboardPage
