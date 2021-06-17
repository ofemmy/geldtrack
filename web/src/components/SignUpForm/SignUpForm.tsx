import {
  Form,
  Label,
  SelectField,
  FieldError,
  EmailField,
  Submit,
  FormError,
  PasswordField,
} from '@redwoodjs/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
const schema = z
  .object({
    email: z.string().email('Invalid email entered'),
    password: z.string().min(7, 'Password must not be less than 7 characters'),
    confirmPassword: z.string(),
    currency: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
const SignUpForm = () => {
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <Form
      validation={{ mode: 'onBlur', resolver: zodResolver(schema) }}
      onSubmit={onSubmit}
      className=""
    >
      <FormError />
      <div className="space-y-8">
        <div>
          <Label
            name="email"
            className="block text-sm font-medium text-blue-700 sr-only"
          >
            Email
          </Label>
          <div className="mt-1">
            <EmailField
              name="email"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Email address"
            />
          </div>
          <FieldError name="email" className="mt-2 text-sm text-red-600" />
        </div>
        <div>
          <Label
            name="password"
            className="block text-sm font-medium text-blue-700 sr-only"
          >
            Password
          </Label>
          <div className="mt-1">
            <PasswordField
              name="password"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Password"
            />
          </div>
          <FieldError name="password" className="mt-2 text-sm text-red-600" />
        </div>
        <div>
          <Label
            name="confirmPassword"
            className="block text-sm font-medium text-blue-600 sr-only"
          >
            Confirm Password
          </Label>
          <div className="mt-1">
            <PasswordField
              name="confirmPassword"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div>
          <Label
            name="currency"
            className="block text-sm font-medium text-blue-600 sr-only"
          >
            Currency
          </Label>
          <div className="mt-1">
            <SelectField
              name="currency"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
            >
              <option>Please select a currency</option>
              <option>Hi2</option>
              <option>Hi3</option>
            </SelectField>
          </div>
          <FieldError name="currency" className="mt-2 text-sm text-red-600" />
        </div>
        <div>
          <Submit className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create New Account
          </Submit>
        </div>
      </div>
    </Form>
  )
}

export default SignUpForm
