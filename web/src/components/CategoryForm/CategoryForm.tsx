import {
  Form,
  Label,
  RadioField,
  FieldError,
  TextField,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { toast } from '@redwoodjs/web/toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@redwoodjs/web'
import Button from 'src/components/Button/Button'
import { CREATE_CATEGORY } from '../../utils/graphql'
import { Spinner } from '@chakra-ui/react'
const categorySchema = z
  .object({
    name: z.string().nonempty('Category must have a name'),
    type: z.string().nonempty('No entry type chosen'),
  })
  .optional()
const CategoryForm = ({ onClose, userId, refetchOnQueryComplete }) => {
  const formMethods = useForm({
    resolver: zodResolver(categorySchema),
    mode: 'onBlur',
  })
  const [create, { loading, error }] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      toast.success('New Category Created')
      refetchOnQueryComplete()
      formMethods.reset()
      onClose()
    },
  })
  const submitHandler = (data) => {
    create({ variables: { input: { ...data, userId } } })
  }
  return (
    <>
      <Form onSubmit={submitHandler} formMethods={formMethods}>
        <FormError error={error} />
        <div className="space-y-6">
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
              name="name"
              className="block text-sm font-medium text-blue-900"
            >
              Name
            </Label>
            <div className="mt-1">
              <TextField
                name="name"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300"
                placeholder="Category Name"
              />
            </div>
            <FieldError name="name" className="mt-2 text-sm text-red-600" />
          </div>
          <div className="flex space-x-2 justify-end pb-4">
            <Submit
              disabled={loading}
              className="flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-50"
            >
              {loading && (
                <span className="mr-4">
                  <Spinner />
                </span>
              )}
              {loading ? 'Saving...' : 'Save'}
            </Submit>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default CategoryForm
