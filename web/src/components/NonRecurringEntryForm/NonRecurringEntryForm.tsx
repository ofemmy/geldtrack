import {
  Form,
  Label,
  SelectField,
  DateField,
  NumberField,
  RadioField,
  FieldError,
  TextField,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useMutation, useQuery } from '@redwoodjs/web'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@redwoodjs/auth'
import { useForm } from 'react-hook-form'
import getSymbolFromCurrency from 'currency-symbol-map'
import { convertToLuxonDate, extractCategories } from 'src/utils/UtilFunctions'
import { CREATE_ENTRY, GET_USER_PROFILE } from 'src/utils/graphql'
const schema = z
  .object({
    title: z.string().nonempty('Title cannot be empty'),
    amount: z
      .string()
      .nonempty('Invalid amount')
      .transform((val) => parseFloat(val)),
    category: z.string().refine((val) => val !== 'Please select a category', {
      message: 'No category selected',
    }),
    entryDate: z.string().nonempty('No entry date selected'), //TODO
    type: z.string().nonempty('No entry type chosen'),
  })
  .optional()

// const CREATE_ENTRY = gql`
//   mutation CreateEntryMutation($input: CreateEntryInput!) {
//     createEntry(input: $input) {
//       id
//       title
//     }
//   }
// `
// export const GET_USER_PROFILE = gql`
//   query GetUserProfile($id: String!) {
//     user(id: $id) {
//       id
//       currency
//       categories
//     }
//   }
// `

const NonRecurringEntryForm = () => {
  const formMethods = useForm()
  const { currentUser } = useAuth()
  const {
    loading: l,
    error: err,
    data: userData,
  } = useQuery(GET_USER_PROFILE, { variables: { id: currentUser.sub } })
  const user = userData?.user
  const userCategoryNames = user ? extractCategories(user) : []
  const [create, { loading, error }] = useMutation(CREATE_ENTRY, {
    onCompleted: () => {
      toast.success('New Entry Created')
      formMethods.reset()
    },
    refetchQueries: [
      { query: GET_USER_PROFILE, variables: { id: currentUser.sub } },
    ],
  })
  const submitHandler = (data) => {
    data.entryDate = convertToLuxonDate(data.entryDate)
    create({
      variables: {
        input: {
          ...data,
          frequency: 'NonRecurring',
          userId: currentUser.sub,
        },
      },
    })
  }

  return (
    <>
      <Toaster />
      <Form
        onSubmit={submitHandler}
        validation={{ resolver: zodResolver(schema) }}
        formMethods={formMethods}
      >
        <FormError error={error} />
        <div className="space-y-8">
          <div>
            <div className="space-x-4 flex">
              <div className="space-x-2">
                <RadioField name="type" value="Income" />
                <Label className="text-md font-medium text-blue-900">
                  Income
                </Label>
              </div>
              <div className="space-x-2">
                <RadioField name="type" value="Expense" />
                <Label className="text-md font-medium text-blue-900">
                  Expense
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
                <span className="text-gray-500 sm:text-sm">
                  {getSymbolFromCurrency(user?.currency) || ''}
                </span>
              </div>
              <NumberField
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
              <DateField
                name="entryDate"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300"
                placeholder="DD.MM.YYYY"
              />
            </div>
            <FieldError
              name="entryDate"
              className="mt-2 text-sm text-red-600"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Label
                name="category"
                className="block text-sm font-medium text-blue-900"
              >
                Category
              </Label>
              {l && <span className="text-xs text-blue-300">Loading....</span>}
              {err && (
                <span className="text-xs text-red-500">
                  Error fetching user data, please reload the page
                </span>
              )}
            </div>
            <div className="mt-1">
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
              disabled={loading}
              className="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Entry
            </Submit>
          </div>
        </div>
      </Form>
      {JSON.stringify(user?.categories, null, 2)}
    </>
  )
}

export default NonRecurringEntryForm
