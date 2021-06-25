import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { BeforeResolverSpecType } from '@redwoodjs/api'
import { fetchEntryTotal } from 'src/lib/queries/fetchEntriesTotal'
import { budgetHandler, createDate, OPERATION } from 'src/lib/utils'

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
//export const fetchIncomes = (queryOptions: QueryOptions) => {}
