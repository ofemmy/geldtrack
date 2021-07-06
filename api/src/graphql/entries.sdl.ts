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
  type TotalEntry {
    total: Float
  }
  type TotalReport {
    name: String!
    incomes: Float!
    expenses: Float!
  }
  type EntryByCategory {
    category: String!
    sum: Float!
  }
  enum EntryType {
    Income
    Expense
  }
  enum EntryFrequency {
    NonRecurring
    Recurring
  }
  type Category {
    name: String!
    monthlyBudget: Float!
    used: Float!
    runningBudget: Float!
    rollOver: Boolean!
  }

  type Query {
    recentEntries(userId: String): [Entry]
    entries(userId: String!, month: Int): [Entry!]!
    entriesForUser(userId: String!): [Entry]
    getEntriesTotal(userId: String!, month: Int): EntryTotal!
    getIncomeEntries(userId: String!, month: Int): [Entry]
    getExpenseEntries(userId: String!, month: Int): [Entry]
    getTotalByCategory(userId: String!, month: Int): [TotalReport]
    getIncomesByCategory(userId: String!, month: Int): [EntryByCategory]
    getExpensesByCategory(userId: String!, month: Int): [EntryByCategory]
    getTotalIncome(userId: String!, month: Int): TotalEntry
    getTotalExpense(userId: String!, month: Int): TotalEntry
    getRecurringEntries(userId: String!): [Entry]
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
  input CreateCategoryInput {
    type: String!
    name: String!
    userId: String!
  }
  input CreateBudgetInput {
    userId: String!
    category: String!
    monthlyBudget: Float!
    rollOver: Boolean!
  }

  input UpdateEntryInput {
    id: ID!
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
  input DeleteBudgetInput {
    userId: String!
    categoryName: String!
  }
  type Mutation {
    createEntry(input: CreateEntryInput!): Entry
    createCategory(input: CreateCategoryInput!): Category
    createBudget(input: CreateBudgetInput!): Category
    updateBudget(input: CreateBudgetInput!): Category
    updateEntry(input: UpdateEntryInput!): Entry
    deleteEntry(entryId: ID!): Entry
    deleteBudget(input: DeleteBudgetInput!): Category
  }
`
