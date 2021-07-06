import type { EntriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DataTable from 'src/components/DataTable/DataTable'
import EmptyComponent from 'src/components/EmptyComponent/EmptyComponent'
import SectionHeading from 'src/components/SectionHeading/SectionHeading'
import { extractUser } from '../../utils/UtilFunctions'
export const QUERY = gql`
  query RecurringEntriesQuery($userId: String!) {
    getRecurringEntries(userId: $userId) {
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
        currency
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <EmptyComponent />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  getRecurringEntries: recurringEntries,
}: CellSuccessProps<EntriesQuery>) => {
  const user = extractUser(recurringEntries)

  return (
    <>
      <SectionHeading text="Recurring Entries" />
      <DataTable
        data={recurringEntries}
        userId={user.id}
        currency={user.currency}
      />
    </>
  )
}
