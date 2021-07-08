import { useState } from 'react'
import {
  Form,
  Label,
  FieldError,
  Submit,
  FormError,
  PasswordField,
} from '@redwoodjs/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
const schema = z
  .object({
    resetPassword: z
      .string()
      .min(7, 'Password must not be less than 7 characters'),
    confirmResetPassword: z.string(),
  })
  .refine((data) => data.resetPassword === data.confirmResetPassword, {
    message: "Passwords don't match",
    path: ['confirmResetPassword'],
  })

const ResetPasswordForm = ({ accessToken }) => {
  const [error, setError] = useState(null)
  const { client } = useAuth()
  const onSubmit = async (inputData) => {
    if (!accessToken) return
    const newPassword = inputData.resetPassword
    const { error, data } = await client.auth.api.updateUser(accessToken, {
      password: newPassword,
    })
    if (error) setError(error.message)
    if (data) {
      navigate(routes.dashboard())
    }
  }
  return (
    <Form
      validation={{ mode: 'onBlur', resolver: zodResolver(schema) }}
      onSubmit={onSubmit}
      className="pb-6"
    >
      <FormError
        error={error}
        titleClassName="font-semibold"
        wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
      />
      <div className="space-y-6">
        <div>
          <Label
            name="resetPassword"
            className="block text-sm font-medium text-blue-700 sr-only"
          >
            Password
          </Label>
          <div className="mt-1">
            <PasswordField
              name="resetPassword"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="New Password"
            />
          </div>
          <FieldError
            name="resetPassword"
            className="mt-2 text-sm text-red-600"
          />
        </div>
        <div>
          <Label
            name="confirmResetPassword"
            className="block text-sm font-medium text-blue-600 sr-only"
          >
            Confirm Password
          </Label>
          <div className="mt-1">
            <PasswordField
              name="confirmResetPassword"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div>
          <Submit className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Reset Password
          </Submit>
        </div>
      </div>
    </Form>
  )
}

export default ResetPasswordForm
