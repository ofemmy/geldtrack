export const CREATE_ENTRY = gql`
  mutation CreateEntryMutation($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      title
    }
  }
`
export const UPDATE_ENTRY = gql`
  mutation UpdateEntryMutation($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      id
      title
    }
  }
`
export const DELETE_ENTRY = gql`
  mutation DeleteEntryMutation($entryId: ID!) {
    deleteEntry(entryId: $entryId) {
      id
      title
    }
  }
`
export const UPDATE_BUDGET = gql`
  mutation UpdateBudgetMutation($input: CreateBudgetInput!) {
    updateBudget(input: $input) {
      name
    }
  }
`
export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: String!) {
    user(id: $id) {
      id
      currency
      categories
    }
  }
`
export const GET_RECENT_ENTRIES = gql`
  query EntriesQuery($userId: String!) {
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
  }
`
export const CREATE_CATEGORY = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      name
    }
  }
`
export const CREATE_BUDGET = gql`
  mutation CreateBudgetMutation($input: CreateBudgetInput!) {
    createBudget(input: $input) {
      name
    }
  }
`
export const DELETE_BUDGET = gql`
  mutation DeleteBudgetMutation($input: DeleteBudgetInput!) {
    deleteBudget(input: $input) {
      name
    }
  }
`
