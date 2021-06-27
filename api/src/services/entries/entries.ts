import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { BeforeResolverSpecType } from '@redwoodjs/api'
import { fetchEntryTotal } from 'src/lib/queries/fetchEntriesTotal'
import { budgetHandler, createDate, OPERATION } from 'src/lib/utils'
import { upperFirst } from 'lodash'

// type QueryOptions = {
//   userId: number
//   limit?: number
//   skip?: number
//   date: DateTime
//   frequencyType?: 'all' | 'nonrecurringOnly' | 'recurringOnly'
// }
// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
  rules.skip() //remove later
}

export const entries = ({ userId }) => {
  return db.entry.findMany({
    where: { userId },
    orderBy: { entryDate: 'desc' },
    take: 10,
  })
}
export const recentEntries = ({ userId }) => {
  return db.entry.findMany({
    where: { userId },
    orderBy: { entryDate: 'desc' },
    take: 10,
  })
}
export const getEntriesTotal = ({ userId, month }) => {
  return fetchEntryTotal({ userId, date: createDate({ month }) })
}
export const entriesForUser = ({ userId }) => {
  return db.entry.findMany({
    where: { userId },
    orderBy: { entryDate: 'desc' },
  })
}

export const Entry = {
  user: (_obj, { root }: ResolverArgs<Prisma.EntryWhereUniqueInput>) => {
    console.log(root)
    return db.entry.findUnique({ where: { id: root.id } }).user()
  },
}
export const createEntry = async ({ input }) => {
  requireAuth()
  //create new entry
  //handle the user budget
  const newEntry = await db.entry.create({ data: input })
  const owner = await db.entry.findUnique({ where: { id: newEntry.id } }).user()
  const newCategories = budgetHandler({
    userCategories: owner.categories as any,
    entryItem: newEntry,
    operation: OPERATION.create,
  })
  await db.user.update({
    where: { id: owner.id },
    data: { categories: newCategories },
  })
  return newEntry
}
export const createCategory = async ({ input }) => {
  requireAuth()
  const { type, name, userId } = input
  const categoryData = {
    name: upperFirst(name),
    type: upperFirst(type),
    monthlyBudget: 0,
    rollOver: false,
    used: 0,
    runningBudget: 0,
  }
  const newCategory = {
    [name.toLowerCase()]: categoryData,
  }
  const userCategories = (
    await await db.user.findUnique({
      where: { id: userId },
    })
  ).categories as Prisma.JsonObject

  const newCategories = { ...userCategories, ...newCategory }
  await db.user.update({
    where: { id: userId },
    data: { categories: newCategories },
  })
  return categoryData
}
//export const fetchIncomes = (queryOptions: QueryOptions) => {}
