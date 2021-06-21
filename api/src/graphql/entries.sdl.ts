export const schema = gql`
  type Entry {
    id: Int!
    title: String!
    amount: Float!
    type: EntryType!
    frequency: EntryFrequency!
    entryDate: DateTime!
    category: String!
    recurringFrom: DateTime
    recurringTo: DateTime
    user: User!
    userId: String!
  }
  type User {
    id: String!
    email: String!
    currency: String!
    categories: JSON
    createdAt: DateTime!
    entries: [Entry]!
  }
  enum EntryType {
    Income
    Expense
  }
  enum EntryFrequency {
    NonRecurring
    Recurring
  }

  type Query {
    entries: [Entry!]!
    entriesForUser(userId: String!): [Entry]
  }

  input CreateEntryInput {
    title: String!
    amount: Float!
    type: EntryType!
    frequency: EntryFrequency!
    entryDate: DateTime!
    category: String!
    recurringFrom: DateTime
    recurringTo: DateTime
    userId: String!
  }

  input UpdateEntryInput {
    title: String
    amount: Float
    type: EntryType
    frequency: EntryFrequency
    entryDate: DateTime
    category: String
    recurringFrom: DateTime
    recurringTo: DateTime
    userId: String
  }
  type Mutation {
    createEntry(input: CreateEntryInput!): Entry
  }
`
