import {
  Form,
  Label,
  SelectField,
  RadioField,
  FieldError,
  TextField,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { useDisclosure, Spinner } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@redwoodjs/auth'
import { useForm } from 'react-hook-form'
import { toast } from '@redwoodjs/web/toast'
import { useMutation, useQuery } from '@redwoodjs/web'
import getSymbolFromCurrency from 'currency-symbol-map'
import { convertToLuxonDate, extractCategories } from 'src/utils/UtilFunctions'
import { CREATE_ENTRY, GET_USER_PROFILE, UPDATE_ENTRY } from 'src/utils/graphql'
import AppDatePicker from 'src/components/AppDatePicker/AppDatePicker'
import CategoryModal from 'src/components/CategoryModal/CategoryModal'
const schema = z.object({
  title: z.string().nonempty('Title cannot be empty'),
  amount: z
    .string()
    .nonempty('Invalid amount')
    .transform((val) => parseFloat(val)),
  category: z.string().refine((val) => val !== 'Please select a category', {
    message: 'No category selected',
  }),
  entryDate: z.string().nonempty('No entry date selected'),
  recurringFrom: z.string().nonempty('No recurring from date selected'),
  recurringTo: z.string().nonempty('No recurring to date selected'),
  type: z.string().nonempty('No entry type chosen'),
})
const RecurringEntryForm = ({ mode = 'create', entry = null }) => {
  const initialValues =
    mode === 'create'
      ? {
          title: '',
          type: 'Expense',
          amount: 0,
          entryDate: '',
          category: '',
          recurringFrom: '',
          recurringTo: '',
        }
      : {
          title: entry.title,
          type: entry.type,
          amount: entry.amount,
          entryDate: entry.entryDate,
          category: entry.category,
          recurringFrom: entry.recurringFrom,
          recurringTo: entry.recurringTo,
        }
  const formMethods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  })
  const { currentUser } = useAuth()
  const {
    loading: profileLoading,
    error: profileError,
    data: userData,
    refetch,
  } = useQuery(GET_USER_PROFILE, { variables: { id: currentUser.sub } })

  const user = userData?.user
  const userCategoryNames = user ? extractCategories(user) : []
  const [create, { loading, error }] = useMutation(CREATE_ENTRY, {
    onCompleted: () => {
      toast.success('New Entry Created')
      formMethods.reset()
    },
  })
  const [update, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_ENTRY,
    {
      onCompleted: () => {
        toast.success('Entry Updated')
        window.location.reload()
      },
      refetchQueries: [
        { query: GET_USER_PROFILE, variables: { id: currentUser.sub } },
      ],
    }
  )
  const submitHandler = (data) => {
    data.entryDate = convertToLuxonDate(data.entryDate)
    data.recurringFrom = convertToLuxonDate(data.recurringFrom)
    data.recurringTo = convertToLuxonDate(data.recurringTo)
    if (isNaN(data.amount)) {
      formMethods.setError('amount', {
        type: 'manual',
        message: 'Invalid Amount',
      })
      return
    }
    if (mode === 'edit') {
      const { __typename, ...rest } = data
      update({
        variables: {
          input: {
            ...rest,
            frequency: 'Recurring',
            userId: currentUser.sub,
            id: entry?.id,
          },
        },
      })
    } else {
      create({
        variables: {
          input: {
            ...data,
            frequency: 'Recurring',
            userId: currentUser.sub,
          },
        },
      })
    }
  }
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <CategoryModal
        isOpen={isOpen}
        onClose={onClose}
        userId={currentUser.sub}
        refetch={refetch}
      />
      <Form onSubmit={submitHandler} formMethods={formMethods}>
        <FormError error={error || updateError} />
        <div className="space-y-8">
          <div>
            <div className="space-x-4 flex">
              <div className="space-x-2">
                <RadioField name="type" value=" Income" id="Income" />
                <Label className="text-md font-medium text-blue-900">
                  Income
                </Label>
              </div>
              <div className="space-x-2">
                <RadioField name="type" value="Expense" id="Expense" />
                <Label className="text-md font-medium text-blue-900">
                  Expenses
                </Label>
              </div>
            </div>
            <FieldError name="type" className="text-red-600 mt-2 text-sm" />
          </div>

          <div>
            <Label
              name="title"
              className="block text-sm font-medium text-blue-900"
            >
              Title
            </Label>
            <div className="mt-1">
              <TextField
                name="title"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300"
                placeholder="Entry Title"
              />
            </div>
            <FieldError name="title" className="mt-2 text-sm text-red-600" />
          </div>
          <div>
            <Label
              name="amount"
              className="block text-sm font-medium text-blue-900"
            >
              Amount
            </Label>
            <div className="mt-1 relative rounded-sm shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {getSymbolFromCurrency(user?.currency) || ''}
              </div>
              <TextField
                name="amount"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md pl-12 pr-12"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300 pl-12 pr-12"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">EUR</span>
              </div>
            </div>
            <FieldError name="amount" className="mt-2 text-sm text-red-600" />
          </div>
          <div>
            <Label
              name="entryDate"
              className="block text-sm font-medium text-blue-900"
            >
              Entry Date
            </Label>
            <div className="mt-1">
              <AppDatePicker
                inputName="entryDate"
                defaultDate={entry?.entryDate}
              />
            </div>
            <FieldError
              name="entryDate"
              className="mt-2 text-sm text-red-600"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-5/12">
              <Label
                name="recurringFrom"
                className="block text-sm font-medium text-blue-900"
              >
                Recurring From
              </Label>
              <div className="mt-1">
                <AppDatePicker
                  inputName="recurringFrom"
                  defaultDate={entry?.recurringFrom}
                />
              </div>
              <FieldError
                name="recurringFrom"
                className="mt-2 text-sm text-red-600"
              />
            </div>
            <div className="w-5/12">
              <Label
                name="recurringTo"
                className="block text-sm font-medium text-blue-900"
              >
                Recurring To
              </Label>
              <div className="mt-1">
                <AppDatePicker
                  inputName="recurringTo"
                  defaultDate={entry?.recurringTo}
                />
              </div>
              <FieldError
                name="recurringTo"
                className="mt-2 text-sm text-red-600"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <Label
                name="category"
                className="block text-sm font-medium text-blue-900"
              >
                Category
              </Label>
              <button
                type="button"
                onClick={onOpen}
                className="text-xs text-yellow-500 inline-flex items-center px-1.5 py-1 border border-transparent font-medium rounded  bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Add Category
              </button>
              {profileLoading && (
                <span className="text-xs text-blue-500">Loading...</span>
              )}
              {profileError && (
                <span className="text-xs text-red-500">
                  Error loading data please reload page...
                </span>
              )}
            </div>
            <div className="mt-2">
              <SelectField
                name="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300 mt-1 pl-3 pr-10 py-2"
              >
                <option>Please select a category</option>
                {userCategoryNames.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </SelectField>
            </div>
            <FieldError name="category" className="mt-2 text-sm text-red-600" />
          </div>
          <div className="flex justify-end">
            <Submit
              disabled={loading || updateLoading}
              className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {(loading || updateLoading) && (
                <span className="mr-4">
                  <Spinner />
                </span>
              )}
              {mode === 'create'
                ? loading
                  ? 'Creating Entry...'
                  : 'Create Entry'
                : updateLoading
                ? 'Updating Entry...'
                : 'Update Entry'}
            </Submit>
          </div>
        </div>
      </Form>
    </>
  )
}

export default RecurringEntryForm
