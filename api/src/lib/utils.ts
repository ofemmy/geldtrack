import { DateTime } from 'luxon'
import { Entry, EntryType } from '@prisma/client'
export const createDate = ({ month }) => {
  const today = DateTime.now()
  return DateTime.utc(today.get('year'), Number(month), 15, 12)
}
export enum OPERATION {
  create,
  update,
}
type Category = {
  [index: string]: {
    name: string
    type: EntryType
    rollOver: boolean
    monthlyBudget: number
    runningBudget: number
    used: number
  }
}
export const budgetHandler = ({
  userCategories,
  entryItem,
  operation,
}: {
  userCategories: Category
  entryItem: Entry
  operation: OPERATION
}) => {
  let newCategories = null
  if (entryItem.type === 'Income') {
    //early return, don't do anything with the input
    newCategories = userCategories
    return newCategories
  }
  //get the category in question
  const category = userCategories[entryItem.category.toLowerCase()]

  if (operation === OPERATION.create) {
    const amount = entryItem.amount.toNumber()
    category.used += amount
    category.runningBudget -= amount
    newCategories = {
      ...userCategories,
      [category.name.toLowerCase()]: category,
    }
  }
  return newCategories
}
