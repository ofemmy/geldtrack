import { useState } from 'react'
import {
  Form,
  Label,
  EmailField,
  FieldError,
  PasswordField,
} from '@redwoodjs/forms'
import { routes, navigate, Link } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { LockClosedIcon } from '@heroicons/react/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().nonempty('Password cannot be empty'),
})
const LoginPage = () => {
  const { logIn } = useAuth()
  const [error, setError] = useState(null)
  const onSubmit = (data) => {
    setError(null)
    logIn({ email: data.email, password: data.password })
      .then(() => {
        navigate(routes.dashboard())
      })
      .catch((error) => setError(error.message))
  }
  //const formMethods = useForm({ resolver: zodResolver(schema) })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
          validation={{ mode: 'onBlur', resolver: zodResolver(schema) }}
        >
          {error && (
            <p className="text-red-500 text-sm text-center">
              User name or password incorrect
            </p>
          )}
          {/* <FormError
            error={error}
            titleClassName="font-semibold"
            wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          /> */}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label name="email" className="sr-only">
                Email address
              </Label>
              <EmailField
                name="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-t-md sm:text-sm border-gray-300"
                placeholder="Email address"
                // validation={{
                //   validate: (value) => {
                //     console.log(value)
                //     return true
                //   },
                // }}
              />
              <FieldError name="email" className="mt-2 text-sm text-red-600" />
            </div>
            <div>
              <Label name="password" className="sr-only">
                Password
              </Label>
              <PasswordField
                name="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-gray-300"
                placeholder="Password"
              />
              <FieldError
                name="password"
                className="mt-2 text-sm text-red-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            {/* <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div> */}

            <div className="text-sm">
              <Link to="/">Forgot Password</Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
