import type { ExpenseQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DataTable from 'src/components/DataTable/DataTable'
import { DataChart } from '../IncomeCell'
import { numberToCurrency } from 'src/utils/UtilFunctions'
import { CreditCardIcon } from '@heroicons/react/outline'
export const QUERY = gql`
  query ExpenseQuery($userId: String!, $month: Int) {
    getExpenseEntries(userId: $userId, month: $month) {
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
    getExpensesByCategory(userId: $userId, month: $month) {
      category
      sum
    }
    getTotalExpense(userId: $userId, month: $month) {
      total
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  getExpenseEntries: expenses,
  getExpensesByCategory: expenseCategories,
  getTotalExpense: totalExpenses,
}: CellSuccessProps<ExpenseQuery>) => {
  const user = expenses[0].user
  return (
    <div className="space-y-4">
      <div className="h-96 relative">
        <DataChart chartData={expenseCategories} barColor="red" />
      </div>
      <div>
        <div className="flex bg-red-100 p-5">
          <div className="flex-shrink-0 text-red-500">
            <CreditCardIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-red-500 truncate">
                Total Expenses
              </dt>
              <dd className="text-lg font-medium text-red-500">
                {numberToCurrency({
                  amount: totalExpenses.total,
                  currency: user.currency,
                })}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <DataTable data={expenses} />
    </div>
  )
}
