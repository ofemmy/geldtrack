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
  type EntryTotal {
    totalIncome: Float!
    totalExpense: Float!
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
    recentEntries(userId: String): [Entry]
    entries(userId: String!, month: Int): [Entry!]!
    entriesForUser(userId: String!): [Entry]
    getEntriesTotal(userId: String!, month: Int): EntryTotal!
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
