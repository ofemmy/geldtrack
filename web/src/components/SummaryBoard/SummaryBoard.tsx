import { CreditCardIcon, LibraryIcon } from '@heroicons/react/outline'
import { numberToCurrency } from 'src/utils/UtilFunctions'
const SummaryBoard = () => {
  const totalIncome = 3000
  const totalExpense = 3400
  const currency = 'EUR'
  return (
    <div className="bg-white shadow-sm border  border-gray-100 rounded-md p-4">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
        <div className="flex bg-green-100 rounded-md text-green-500 md:w-1/2 p-3">
          <div className="flex-shrink-0">
            <LibraryIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-green-500 truncate">
                Total Income
              </dt>
              <dd className="text-lg font-medium text-green-500">
                {numberToCurrency({ amount: totalIncome, currency })}
              </dd>
            </dl>
          </div>
          <div>
            <a
              href="/"
              className="uppercase text-xs p-2 bg-green-200 rounded-sm hover:text-white hover:bg-green-300"
            >
              View all
            </a>
          </div>
        </div>
        <div className="flex bg-red-100 p-3 rounded-md md:w-1/2">
          <div className="flex-shrink-0 text-red-500">
            <CreditCardIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-red-500 truncate">
                Total Expenses
              </dt>
              <dd className="text-lg font-medium text-red-500">
                {numberToCurrency({ amount: totalExpense, currency })}
              </dd>
            </dl>
          </div>
          <div>
            <a
              href="/"
              className="uppercase text-xs p-2 bg-red-200 text-red-500 rounded-sm hover:text-white hover:bg-red-300"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryBoard
