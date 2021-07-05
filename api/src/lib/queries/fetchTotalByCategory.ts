import { flatten, uniq } from 'lodash'
import { createDate } from '../utils'
import { fetchExpensesByCategory } from './fetchExpenses'
import { fetchIncomesByCategory } from './fetchIncomes'
export async function fetchTotalByCategory({ month, userId }) {
  const date = createDate({ month })
  const data = await Promise.all([
    //order matters here, incomes come first!
    fetchIncomesByCategory({ userId, date }),
    fetchExpensesByCategory({ userId, date }),
  ])
  const [incomeCat, expenseCat] = data
  const newIncomeCat = incomeCat.map((item) => ({ ...item, type: 'income' }))
  const newExpCat = expenseCat.map((item) => ({ ...item, type: 'expense' }))

  const result = mapCategoryNamesToObject(extractCategoryNames(data))
  const newCategories = [...newExpCat, ...newIncomeCat]
  newCategories.forEach((cat) => updateCategory(cat, result))
  return result
}
function extractCategoryNames(data) {
  const flattenedCategoryArray = flatten(data)
  const categoryNames = uniq(
    flattenedCategoryArray.map((item: any) => item.category)
  )
  return categoryNames
}
function mapCategoryNamesToObject(catNames: string[]) {
  return catNames.map((catName) => ({ name: catName, incomes: 0, expenses: 0 }))
}
function updateCategory(cat, categories) {
  const foundCat = categories.find((category) => category.name === cat.category)
  if (foundCat === undefined) throw new Error('Category not found')
  cat.type === 'income'
    ? (foundCat.incomes += cat.sum)
    : (foundCat.expenses += cat.sum)
}
