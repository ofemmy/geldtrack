import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { GetUserProfile } from '../../../types/graphql'
import BudgetCard from '../BudgetCard/BudgetCard'

import LoadingComponent from '../LoadingComponent/LoadingComponent'
export const QUERY = gql`
  query GetUserProfile($id: String!) {
    user(id: $id) {
      id
      currency
      categories
    }
  }
`

export const Loading = () => <LoadingComponent />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }: CellSuccessProps<GetUserProfile>) => {
  const userCategories = Object.entries<any>(user.categories).map(
    (catItem) => catItem[1]
  )
  const budgetItems = userCategories.filter(
    (catItem) => catItem.monthlyBudget > 0
  )
  if (budgetItems.length === 0) {
    return (
      <div className="mt-4 flex items-center justify-between">
        <p className="text-gray-600">No budget added yet</p>
      </div>
    )
  }
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
      {budgetItems.map((cat: any) => (
        <BudgetCard key={cat.name} category={cat} currency={user.currency} />
      ))}
    </div>
  )
}
