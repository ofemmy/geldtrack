import {
  Form,
  Label,
  SelectField,
  NumberField,
  CheckboxField,
  FieldError,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@redwoodjs/web'
import getSymbolFromCurrency from 'currency-symbol-map'
import Button from 'src/components/Button/Button'
import { CREATE_BUDGET } from 'src/utils/graphql'
const budgetSchema = z
  .object({
    category: z.string().nonempty('Name cannot be empty'),
    monthlyBudget: z.number(),
    rollOver: z.boolean(),
  })
  .optional()
const BudgetForm = ({ categoryNames, currency, onClose, userId }) => {
  const [create, { loading, error }] = useMutation(CREATE_BUDGET, {
    onCompleted: () => {
      toast.success('New Budget Created')
      formMethods.reset()
      onClose()
      window.location.reload()
    },
  })
  const submitHandler = (data) => {
    //console.log(data)
    create({ variables: { input: { ...data, userId } } })
  }
  const formMethods = useForm()
  return (
    <>
      <Toaster />
      <Form
        onSubmit={submitHandler}
        formMethods={formMethods}
        validation={{ resolver: zodResolver(budgetSchema) }}
      >
        <FormError error={error} />
        <div className="space-y-6">
          <div>
            <Label
              name="category"
              className="block text-sm font-medium text-blue-900"
            >
              Category
            </Label>
            <div className="mt-1">
              <SelectField
                name="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300 mt-1 pl-3 pr-10 py-2"
              >
                <option>Please select a category</option>
                {categoryNames.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </SelectField>
            </div>
          </div>
          <div>
            <Label
              name="monthlyBudget"
              className="block text-sm font-medium text-blue-900"
            >
              Monthly Budget
            </Label>
            <div className="mt-1 relative rounded-sm shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {getSymbolFromCurrency(currency)}
                </span>
              </div>
              <NumberField
                name="monthlyBudget"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md pl-12 pr-12"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300 pl-12 pr-12"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">EUR</span>
              </div>
            </div>
            <FieldError
              name="monthlyBudget"
              className="mt-2 text-sm text-red-600"
            />
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <Label
                name="monthlyBudget"
                className="block text-sm font-medium text-blue-900"
              >
                Roll Over
              </Label>

              <CheckboxField name="rollOver" />
            </div>
            <span className="text-xs text-gray-500">
              Unused amount is added to next month budget
            </span>
          </div>
          <div className="flex space-x-2 justify-end pb-4">
            <Submit
              disabled={loading}
              className="flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-50"
            >
              Save
            </Submit>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default BudgetForm
