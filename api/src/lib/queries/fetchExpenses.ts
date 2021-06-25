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
  frequencyType?: 'all' | 'nonrecurringOnly' | 'recurringOnly'
}
//TODO: implement manual pagination later
export async function fetchExpenses(queryOptions: QueryOptions) {
  const {
    userId,
    limit = 100,
    skip = 0,
    date,
    frequencyType = 'all',
  } = queryOptions
  const { recurringExpenseQuery, nonRecurringExpenseQuery } = getQuery(
    userId,
    date
  )
  const resultOptions = {
    async all() {
      return await db.$queryRaw`${recurringExpenseQuery.select} UNION ${nonRecurringExpenseQuery.select} ORDER BY "entryDate" DESC LIMIT ${limit} OFFSET ${skip}`
    },
    async recurringOnly() {
      return await db.$queryRaw`${recurringExpenseQuery.select} LIMIT ${limit} OFFSET ${skip}`
    },
    async nonRecurringOnly() {
      return await db.$queryRaw`${nonRecurringExpenseQuery.select} LIMIT ${limit} OFFSET ${skip}`
    },
  }
  return await resultOptions[frequencyType]()
}
export async function queryExpensesByCategory({ userId, date, category }) {
  return await db.$queryRaw`SELECT * FROM expenses WHERE ${QueryFilter.isOwner(
    userId
  )} AND ((frequency=${
    EntryFrequency.NonRecurring
  } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
    EntryFrequency.Recurring
  } AND ${QueryFilter.recurringAt(date)})) AND category=${category}`
}
export async function fetchExpenseTotal({ userId, date }) {
  const res =
    await db.$queryRaw`SELECT sum(amount) FROM expenses WHERE ${QueryFilter.isOwner(
      userId
    )} AND ((frequency=${
      EntryFrequency.NonRecurring
    } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
      EntryFrequency.Recurring
    } AND ${QueryFilter.recurringAt(date)}))`
  return res[0].sum
}
export async function fetchExpensesByCategory({ userId, date }) {
  return await db.$queryRaw`SELECT category,sum(amount) FROM expenses WHERE ${QueryFilter.isOwner(
    userId
  )} AND ((frequency=${
    EntryFrequency.NonRecurring
  } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
    EntryFrequency.Recurring
  } AND ${QueryFilter.recurringAt(date)})) GROUP BY category`
}

export async function fetchExpensesCount(
  userId,
  date,
  freqType: 'all' | 'recurringOnly' | 'nonRecurringOnly'
): Promise<number> {
  const { recurringExpenseQuery, nonRecurringExpenseQuery } = getQuery(
    userId,
    date
  )
  const totalCount = {
    async all() {
      return await db.$queryRaw`SELECT count(*) FROM expenses WHERE ${QueryFilter.isOwner(
        userId
      )} AND ((frequency=${
        EntryFrequency.NonRecurring
      } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
        EntryFrequency.Recurring
      } AND ${QueryFilter.recurringAt(date)}))`
    },
    async recurringOnly() {
      return await db.$queryRaw`${recurringExpenseQuery.count}`
    },
    async nonRecurringOnly() {
      return await db.$queryRaw`${nonRecurringExpenseQuery.count}`
    },
  }
  return await totalCount[freqType]()
}

function getQuery(userId, date) {
  const recurringExpenseQuery = {
    select: Prisma.sql`SELECT * FROM recurring_expenses WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.recurringAt(date)}`,
    count: Prisma.sql`SELECT COUNT(*) FROM recurring_expenses WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.recurringAt(date)}`,
  }
  const nonRecurringExpenseQuery = {
    select: Prisma.sql`SELECT * FROM non_recurring_expenses WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.nonRecurringAt(date)}`,
    count: Prisma.sql`SELECT COUNT(*) FROM non_recurring_expenses WHERE ${QueryFilter.isOwner(
      userId
    )} AND ${QueryFilter.nonRecurringAt(date)}`,
  }
  return { recurringExpenseQuery, nonRecurringExpenseQuery }
}
