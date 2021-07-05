import { Prisma } from '@prisma/client'
import { QueryFilter } from './queryFilter'
import { EntryFrequency } from '@prisma/client'
import { DateTime } from 'luxon'
import { db } from 'src/lib/db'
type QueryOptions = {
  userId: number
  limit?: number
  skip?: number
  date: DateTime
  frequencyType?: 'all' | 'nonRecurringOnly' | 'recurringOnly'
}
export async function fetchIncomes(queryOptions: QueryOptions) {
  const {
    userId,
    limit = 100,
    skip = 0,
    date,
    frequencyType = 'all',
  } = queryOptions
  const { recurringIncomeQuery, nonRecurringIncomeQuery } = getQuery(
    userId,
    date
  )
  const resultOptions = {
    async all() {
      return await db.$queryRaw`${recurringIncomeQuery.select} UNION ${nonRecurringIncomeQuery.select} ORDER BY "entryDate" DESC LIMIT ${limit} OFFSET ${skip}`
    },
    async recurringOnly() {
      return await db.$queryRaw`${recurringIncomeQuery.select} LIMIT ${limit} OFFSET ${skip}`
    },
    async nonRecurringOnly() {
      return await db.$queryRaw`${nonRecurringIncomeQuery.select} LIMIT ${limit} OFFSET ${skip}`
    },
  }
  return await resultOptions[frequencyType]()
}
export async function fetchIncomeTotal({ userId, date }) {
  const res =
    await db.$queryRaw`SELECT sum(amount) FROM incomes WHERE ${QueryFilter.isOwner(
      userId
    )} AND ((frequency=${
      EntryFrequency.NonRecurring
    } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
      EntryFrequency.Recurring
    } AND ${QueryFilter.recurringAt(date)}))`
  return { total: res[0].sum ?? 0 }
}
export async function fetchIncomesByCategory({ userId, date }) {
  return await db.$queryRaw`SELECT category,sum(amount) FROM incomes WHERE ${QueryFilter.isOwner(
    userId
  )} AND ((frequency=${
    EntryFrequency.NonRecurring
  } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
    EntryFrequency.Recurring
  } AND ${QueryFilter.recurringAt(date)})) GROUP BY category`
}
export function getQuery(userId, date) {
  const recurringIncomeQuery = {
    select: Prisma.sql`SELECT * FROM recurring_incomes WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.recurringAt(date)}`,
    count: Prisma.sql`SELECT COUNT(*) FROM recurring_incomes WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.recurringAt(date)}`,
  }
  const nonRecurringIncomeQuery = {
    select: Prisma.sql`SELECT * FROM non_recurring_incomes WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.nonRecurringAt(date)}`,
    count: Prisma.sql`SELECT COUNT(*) FROM non_recurring_incomes WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.nonRecurringAt(date)}`,
  }
  return { recurringIncomeQuery, nonRecurringIncomeQuery }
}
