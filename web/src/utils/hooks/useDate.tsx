import { createContext, useContext, useState, useMemo } from 'react'
import { DateTime } from 'luxon'
const DateContext = createContext<any>(DateTime.utc().get('month'))

function DateProvider({ children }) {
  const [currentMonth, setCurrentMonth] = useState(DateTime.utc().get('month'))
  const value = useMemo(
    () => ({
      currentMonth,
      setCurrentMonth,
    }),
    [currentMonth]
  )
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}
function useDate() {
  const context = useContext(DateContext)
  if (context === undefined) {
    throw new Error('useDate must be used within a Provider')
  }
  return context
}
export { DateProvider, useDate }
