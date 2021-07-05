import { useAuth } from '@redwoodjs/auth'
import ExpenseCell from 'src/components/ExpenseCell'
import { Info } from 'luxon'
import { useDate } from 'src/utils/hooks/useDate'
import MonthPicker from 'src/components/MonthPicker/MonthPicker'
const ExpensesPage = () => {
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
      <ExpenseCell userId={currentUser.sub} month={currentMonth} />
    </div>
  )
}

export default ExpensesPage
