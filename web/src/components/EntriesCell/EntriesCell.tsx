import type { EntriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DashboardChart from 'src/components/DashboardChart/DashboardChart'
import SummaryBoard from 'src/components/SummaryBoard/SummaryBoard'
import DataTable from '../DataTable/DataTable'
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
    }
    getEntriesTotal(userId: $userId, month: $month) {
      totalIncome
      totalExpense
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  recentEntries: entries,
  getEntriesTotal,
}: CellSuccessProps<EntriesQuery>) => {
  return (
    <div className="space-y-4">
      <div className="h-96 relative bg-gray-50 rounded-sm">
        <DashboardChart />
      </div>
      <SummaryBoard totalEntryData={getEntriesTotal} />
      <DataTable data={entries} />
      {/* <ul>
        {entries.map((item) => {
          return <li key={item.id}>{JSON.stringify(item)}</li>
        })}
      </ul> */}
    </div>
  )
}
