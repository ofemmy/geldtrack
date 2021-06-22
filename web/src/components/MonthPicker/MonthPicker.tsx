import { Info } from 'luxon'
import { useDate } from 'src/utils/hooks/useDate'

const MonthPicker = () => {
  const { currentMonth, setCurrentMonth } = useDate()

  const handleChange = (e) => {
    console.log(e.target.value)
    setCurrentMonth(Number(e.target.value))
  }
  return (
    <div className="flex justify-center items-center space-x-4">
      {/* <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Change Month
      </label> */}
      <select
        onBlur={() => {}}
        value={currentMonth}
        onChange={handleChange}
        id="month"
        name="month"
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {monthMapper(Info.months()).map((month) => (
          <option value={month.code} key={month.code}>
            {month.name}
          </option>
        ))}
      </select>
    </div>
  )
}
function monthMapper(months) {
  return months.map((month, idx) => ({ name: month, code: idx + 1 }))
}
export default MonthPicker
