import { useAuth } from '@redwoodjs/auth'
import IncomeCell from 'src/components/IncomeCell'
import { Info } from 'luxon'
import { useDate } from 'src/utils/hooks/useDate'
import MonthPicker from 'src/components/MonthPicker/MonthPicker'

const IncomesPage = () => {
  const { currentUser } = useAuth()
  const { currentMonth } = useDate()
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-light text-gray-500 tracking-wide uppercase">
          {Info.months()[currentMonth - 1]} 2021
        </h2>

        <MonthPicker />
      </div>
      <IncomeCell userId={currentUser.sub} month={currentMonth} />
    </div>
  )
}

export default IncomesPage
