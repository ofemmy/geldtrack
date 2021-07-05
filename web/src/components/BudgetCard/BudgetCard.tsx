import { useDisclosure } from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import {
  cx,
  numberToCurrency,
  extractCategories,
} from 'src/utils/UtilFunctions'
import { DELETE_BUDGET } from 'src/utils/graphql'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import PercentageBar from '../PercentageBar/PercentageBar'
import AppModal from 'src/components/AppModal/AppModal'
import BudgetForm from '../BudgetForm/BudgetForm'
import { useState } from 'react'
const BudgetCard = ({ category, currency }) => {
  const { currentUser } = useAuth()
  const [formMode, setFormMode] = useState('create')
  const [budgetData, setBudgetData] = useState<any>(null)
  const categoryNames = extractCategories(currentUser.profile)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteBudgetMutation] = useMutation(DELETE_BUDGET, {
    onCompleted: () => {
      toast.success('Entry Deleted')
      window.location.reload()
    },
  })

  const deleteHandler = (categoryName) => {
    deleteBudgetMutation({
      variables: { input: { userId: currentUser.sub, categoryName } },
    })
  }
  const editHandler = (cat) => {
    setFormMode('edit')
    setBudgetData({
      category: cat.name,
      monthlyBudget: cat.monthlyBudget,
      rollOver: cat.rollOver,
    })
    onOpen()
  }
  return (
    <div className="relative pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow-md rounded-lg overflow-hidden space-y-4">
      <Toaster />
      <AppModal isOpen={isOpen} onClose={onClose} title="Edit Budget">
        <BudgetForm
          categoryNames={categoryNames}
          currency={currency}
          onClose={onClose}
          userId={currentUser.sub}
          formMode={formMode}
          budgetData={budgetData}
        />
      </AppModal>
      <div className="flex justify-between">
        <h3 className="text-xl font-medium text-blue-800">{category.name}</h3>

        <div className="space-x-2">
          <button
            onClick={() => {
              editHandler(category)
            }}
            type="button"
            className="inline-flex items-center justify-center border border-transparent rounded-full shadow-sm text-yellow-600 bg-yellow-200 hover:bg-yellow-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 h-6 w-6"
          >
            <PencilIcon className="h-3 w-3" aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              deleteHandler(category.name)
            }}
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
      <div className="">
        <dl className="space-y-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Budget</dt>
            <dd className="mt-1 text-sm font-semibold text-gray-700 sm:mt-0 sm:col-span-2">
              {numberToCurrency({ amount: category.monthlyBudget, currency })}
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Used</dt>
            <dd
              className={cx(
                category.used >= category.monthlyBudget
                  ? 'text-red-500'
                  : 'text-green-500',
                'mt-1 text-sm font-semibold  sm:mt-0 sm:col-span-2'
              )}
            >
              {numberToCurrency({ amount: category.used, currency })}
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <PercentageBar
          value={calcPerc({
            budget: category.monthlyBudget,
            used: category.used,
          })}
        />
      </div>
      {/* <div className="flex sm:flex-col sm:space-y-2 justify-between lg:flex-row lg:space-y-0 mt-8">
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
      </div> */}
    </div>
  )
}

export default BudgetCard
function calcPerc({ budget, used }) {
  return Math.floor((used / budget) * 100)
}
