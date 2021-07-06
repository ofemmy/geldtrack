import { db } from 'src/lib/db'
import { EntryFrequency } from '@prisma/client'

export async function fetchRecurringEntries({ userId }) {
  return await db.entry.findMany({
    where: { AND: [{ userId }, { frequency: EntryFrequency.Recurring }] },
  })
}
