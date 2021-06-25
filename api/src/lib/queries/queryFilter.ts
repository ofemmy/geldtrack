import { Prisma } from '@prisma/client'
import { DateTime } from 'luxon'
export const QueryFilter = {
  isOwner(userId: number) {
    return Prisma.sql`"userId" = ${userId}`
  },
  nonRecurringAt(date: DateTime) {
    return Prisma.sql`DATE_TRUNC('month',"entryDate",'utc') = DATE_TRUNC('month',${date.toJSDate()}::date,'utc')`
  },
  recurringAt(date: DateTime) {
    return Prisma.sql`(DATE_TRUNC('month',${date.toJSDate()}::date,'utc') BETWEEN DATE_TRUNC('month',"recurringFrom",'utc') and DATE_TRUNC('month',"recurringTo",'utc'))`
  },
  nonRecurringBetween(dateFrom: DateTime, dateTo: DateTime) {
    return Prisma.sql`DATE_TRUNC('day',${dateFrom.toJSDate()},'utc')<=DATE_TRUNC('day',"entryDate",'utc') AND DATE_TRUNC('day',${dateTo.toJSDate()},'utc') >= DATE_TRUNC('day',"entryDate",'utc')`
  },
  recurringBetween(dateFrom: DateTime, dateTo: DateTime) {
    return Prisma.sql`DATE_TRUNC('day',"recurringFrom",'utc') <= DATE_TRUNC('day',${dateTo.toJSDate()},'utc') AND DATE_TRUNC('day',"recurringTo",'utc') >= DATE_TRUNC('day',${dateFrom.toJSDate()},'utc')`
  },
}
