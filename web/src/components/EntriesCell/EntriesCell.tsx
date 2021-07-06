import type { EntriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DashboardChart from 'src/components/DashboardChart/DashboardChart'
import SummaryBoard from 'src/components/SummaryBoard/SummaryBoard'
import EmptyComponent from 'src/components/EmptyComponent/EmptyComponent'
import DataTable from '../DataTable/DataTable'
import { extractUser } from '../../utils/UtilFunctions'
import SectionHeading from '../SectionHeading/SectionHeading'
export const QUERY = gql`
  query EntriesQuery($userId: String!, $month: Int) {
    recentEntries(userId: $userId) {
      id
      title
      amount
      category
      frequency
      entryDate
      type
      recurringFrom
      recurringTo
      user {
        id
        currency
      }
    }
    getEntriesTotal(userId: $userId, month: $month) {
      totalIncome
      totalExpense
    }
    getTotalByCategory(userId: $userId, month: $month) {
      name
      incomes
      expenses
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <EmptyComponent />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  recentEntries: entries,
  getEntriesTotal,
  getTotalByCategory: report,
}: CellSuccessProps<EntriesQuery>) => {
  const user = extractUser(entries)
  return (
    <div className="space-y-4">
      <div className="h-96 relative bg-gray-50 rounded-sm">
        <DashboardChart data={report} />
      </div>
      <SummaryBoard totalEntryData={getEntriesTotal} />
      <SectionHeading text="Recent Entries" />
      <DataTable data={entries} userId={user.id} currency={user.currency} />
    </div>
  )
}
