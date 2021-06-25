import { QueryFilter } from './queryFilter'
import { db } from 'src/lib/db'
import { EntryFrequency } from '@prisma/client'
import { camelCase } from 'lodash'

export async function fetchEntryTotal({ userId, date }) {
  const result =
    await db.$queryRaw`SELECT type,sum(amount) FROM entries WHERE ${QueryFilter.isOwner(
      userId
    )} AND ((frequency=${
      EntryFrequency.NonRecurring
    } AND ${QueryFilter.nonRecurringAt(date)}) OR (frequency=${
      EntryFrequency.Recurring
    } AND ${QueryFilter.recurringAt(date)})) GROUP BY type`
  if (result.length === 0) {
    return { totalIncome: 0, totalExpense: 0 }
  }
  return parseSum({
    data: result,
    key: 'type',
    resultKeys: ['totalIncome', 'totalExpense'],
  })
}

function parseSum({ data, key, resultKeys }) {
  let result = resultKeys.reduce((acc, curr) => ((acc[curr] = 0), acc), {})
  if (data.length === 0) {
    return result
  }
  const d = {}
  data.forEach((obj) => {
    return (d[camelCase(`total ${obj[key]}`)] = obj['sum'])
  })
  result = { ...result, ...d }
  return result
}
