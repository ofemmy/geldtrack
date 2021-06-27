export const CREATE_ENTRY = gql`
  mutation CreateEntryMutation($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      title
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
export const CREATE_CATEGORY = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      name
    }
  }
`
