import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { LibraryIcon } from '@heroicons/react/outline'

import { numberToCurrency } from 'src/utils/UtilFunctions'
import type { IncomeQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import getSymbolFromCurrency from 'currency-symbol-map'
import DataTable from 'src/components//DataTable/DataTable'
import { useAuth } from '@redwoodjs/auth'
export const QUERY = gql`
  query IncomeQuery($userId: String!, $month: Int) {
    getIncomeEntries(userId: $userId, month: $month) {
      id
      userId
      title
      amount
      category
      frequency
      entryDate
      type
      recurringFrom
      recurringTo
      user {
        currency
      }
    }
    getIncomesByCategory(userId: $userId, month: $month) {
      category
      sum
    }
    getTotalIncome(userId: $userId, month: $month) {
      total
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)
//{ incomes }: CellSuccessProps<EntriesQuery>
export const Success = ({
  getIncomeEntries: incomes,
  getIncomesByCategory: incomeCategories,
  getTotalIncome: totalIncome,
}: CellSuccessProps<IncomeQuery>) => {
  const user = incomes[0].user
  return (
    <div>
      <div className="h-96 relative">
        <DataChart chartData={incomeCategories} barColor="green" />
      </div>
      <div>
        <div className="flex bg-green-100 text-green-500 p-5">
          <div className="flex-shrink-0">
            <LibraryIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-green-500 truncate">
                Total Income
              </dt>
              <dd className="text-lg font-medium text-green-500">
                {numberToCurrency({
                  amount: totalIncome.total,
                  currency: user.currency,
                })}
              </dd>
            </dl>
          </div>
         
        </div>
      </div>
      <DataTable data={incomes} />
    </div>
  )
}
export function DataChart({ chartData, barColor = '#0868A0' }) {
  const { currentUser } = useAuth()
  return (
    <div className="h-full py-5 px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis dataKey="category" />
          <Tooltip />

          <YAxis
            unit={getSymbolFromCurrency(currentUser?.profile.currency ?? 'EUR')}
          />
          {/* <Bar dataKey="incomes" fill={"green"} stackId="a" unit={currency} maxBarSize={100} /> */}
          <Bar
            dataKey="sum"
            fill={barColor}
            unit={currentUser?.profile.currency ?? 'EUR'}
            maxBarSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
