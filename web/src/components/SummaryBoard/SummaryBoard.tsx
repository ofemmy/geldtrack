import {
  CreditCardIcon,
  LibraryIcon,
  ScaleIcon,
} from '@heroicons/react/outline'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { numberToCurrency } from 'src/utils/UtilFunctions'
const SummaryBoard = ({ totalEntryData }) => {
  const { currentUser } = useAuth()
  const { totalIncome, totalExpense } = totalEntryData
  // const totalIncome = 3000
  // const totalExpense = 3400
  //md:space-x-12 p-4 bg-white shadow-sm border
  return (
    <div className="rounded-md">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
        <div className="flex bg-green-100 text-green-500 lg:w-1/2 p-5">
          <div className="flex-shrink-0">
            <LibraryIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-green-500 truncate">
                Total Income
              </dt>
              <dd className="text-lg font-medium text-green-500">
                {numberToCurrency({
                  amount: totalIncome,
                  currency: currentUser.profile.currency,
                })}
              </dd>
            </dl>
          </div>
          <div>
            <Link
              to={routes.incomes()}
              className="uppercase text-xs p-2 bg-green-200 rounded-sm hover:text-white hover:bg-green-300"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="flex bg-red-100 p-5  lg:w-1/2">
          <div className="flex-shrink-0 text-red-500">
            <CreditCardIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-red-500 truncate">
                Total Expenses
              </dt>
              <dd className="text-lg font-medium text-red-500">
                {numberToCurrency({
                  amount: totalExpense,
                  currency: currentUser.profile.currency,
                })}
              </dd>
            </dl>
          </div>
          <div>
            <Link
              to={routes.expenses()}
              className="uppercase text-xs p-2 bg-red-200 text-red-500 rounded-sm hover:text-white hover:bg-red-300"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="flex bg-yellow-100 text-yellow-500 lg:w-1/2 p-5">
          <div className="flex-shrink-0">
            <ScaleIcon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-yellow-500 truncate">
                Balance
              </dt>
              <dd className="text-lg font-medium text-yellow-500">
                {numberToCurrency({
                  amount: totalIncome - totalExpense,
                  currency: currentUser.profile.currency,
                })}
              </dd>
            </dl>
          </div>
          {/* <div>
            <Link
              to={routes.incomes()}
              className="uppercase text-xs p-2 bg-green-200 rounded-sm hover:text-white hover:bg-green-300"
            >
              View all
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SummaryBoard
