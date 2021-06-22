import type { UserWithEntries } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import LoadingComponent from 'src/components/LoadingComponent/LoadingComponent'

// export const QUERY = gql`
//   query EntriesQuery {
//     entries {
//       id
//       title
//     }
//   }
// `
export const QUERY = gql`
  query UserWithEntries($userId: String!) {
    user(id: $userId) {
      id
      currency
      entries {
        title
        id
      }
    }
  }
`
export const Loading = () => (
  <div className="h-screen relative">
    <LoadingComponent />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  user: { entries },
}: CellSuccessProps<UserWithEntries>) => {
  return (
    <ul>
      {entries.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
