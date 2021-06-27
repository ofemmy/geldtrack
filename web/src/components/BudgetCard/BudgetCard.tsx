import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { cx, numberToCurrency } from 'src/utils/UtilFunctions'
const BudgetCard = ({ category, currency }) => {
  const rollOver = true
  return (
    <div className="relative bg-gray-50 pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium text-blue-800">{category.name}</h3>

        <div className="space-x-2">
          <button
            onClick={() => {}}
            type="button"
            className="inline-flex items-center justify-center border border-transparent rounded-full shadow-sm text-yellow-600 bg-yellow-200 hover:bg-yellow-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 h-6 w-6"
          >
            <PencilIcon className="h-3 w-3" aria-hidden="true" />
          </button>
          <button
            onClick={() => {}}
            type="button"
            className="inline-flex items-center justify-center border border-transparent rounded-full shadow-sm text-red-600 bg-red-200 hover:bg-red-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 h-6 w-6"
          >
            <TrashIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="text-gray-500 text-sm">
        <span>Roll Over: </span>
        <span>{category.rollOver ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex sm:flex-col sm:space-y-2 justify-between lg:flex-row lg:space-y-0 mt-8">
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-blue-900">
            {numberToCurrency({ amount: category.monthlyBudget, currency })}
          </p>
          <span className="text-xs text-gray-500">Monthly Budget</span>
        </div>
        <div className="flex flex-col">
          <p
            className={cx(
              rollOver ? 'text-red-500' : 'text-blue-900',
              'text-xl font-semibold'
            )}
          >
            {numberToCurrency({
              amount: category.runningBudget,
              currency,
            })}
          </p>
          <span className="text-xs text-gray-500">Remaining</span>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-blue-400">
            {numberToCurrency({ amount: category?.used || 0, currency })}
          </p>
          <span className="text-xs text-gray-500">Used</span>
        </div>
      </div>
    </div>
  )
}

export default BudgetCard
