import { useAuth } from '@redwoodjs/auth'
import getSymbolFromCurrency from 'currency-symbol-map'
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
const DashboardChart = ({ data }) => {
  const { currentUser } = useAuth()
  const currency = currentUser?.profile.currency ?? 'EUR'
  //const data = [{ name: 'A', incomes: 2000, expenses: 1000 }]
  return (
    <div className="h-full py-5 px-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <YAxis unit={getSymbolFromCurrency(currency)} />
          <Legend />
          <Bar
            dataKey="incomes"
            fill={'green'}
            stackId="a"
            unit={currency}
            maxBarSize={100}
          />
          <Bar
            dataKey="expenses"
            fill={'red'}
            stackId="a"
            unit={currency}
            maxBarSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardChart
