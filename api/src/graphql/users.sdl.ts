export const schema = gql`
  type User {
    id: String!
    email: String!
    currency: String!
    categories: JSON
    createdAt: DateTime!
    entries: [Entry]!
  }

  type Query {
    users: [User!]!
    user(id: String!, month: Int): User
  }

  input CreateUserInput {
    email: String!
    currency: String!
    categories: JSON
  }

  input UpdateUserInput {
    email: String
    currency: String
    categories: JSON
  }
`
