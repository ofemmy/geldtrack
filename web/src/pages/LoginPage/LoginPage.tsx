import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  Label,
  EmailField,
  FieldError,
  PasswordField,
  Submit,
} from '@redwoodjs/forms'
import { routes, navigate, Link } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cx } from '../../utils/UtilFunctions'
import { Spinner } from '@chakra-ui/react'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().nonempty('Password cannot be empty'),
})
const LoginPage = () => {
  const { logIn, client } = useAuth()
  const formMethods = useForm({ resolver: zodResolver(schema), mode: 'onBlur' })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const resetPasswordHandler = async (e) => {
    e.preventDefault()
    setError(null)
    const email = formMethods.getValues('email')
    const isValidEmail = (input) => /^\S+@\S+$/.test(input)
    if (!isValidEmail(email)) {
      setError('Please enter a valid email')
      return
    }
    setIsLoading(true)
    const { error } = await client.auth.api.resetPasswordForEmail(email)

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setMessage('Password reset link sent to your email.')
      setIsLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setError(null)
    setLoginLoading(true)
    const { user, error } = (await logIn({
      email: data.email,
      password: data.password,
    })) as any
    if (error) {
      setError(error.message)
      setLoginLoading(false)
      return
    }

    if (user) {
      setLoginLoading(false)
      navigate(routes.dashboard())
    }
  }
  //const formMethods = useForm({ resolver: zodResolver(schema) })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="/geldTrackLogo.jpg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
          formMethods={formMethods}
        >
          {error && (
            <p className="text-red-500 text-sm text-center p-3 bg-red-200">
              {error}
            </p>
          )}
          {message && (
            <p className="text-yellow-900 text-sm text-center p-3 bg-yellow-200">
              {message}
            </p>
          )}

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
          <div>
            <Submit className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {loginLoading && (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Spinner />
                </span>
              )}
              {loginLoading ? 'Signing in....' : 'Sign in'}
            </Submit>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-grey-500">
              <span>No account yet?</span>{' '}
              <Link to={routes.home()} className="text-blue-500">
                {' '}
                Sign up
              </Link>
            </div>
            <div className="text-sm text-grey-500">
              {isLoading ? (
                <div className="flex space-x-2 items-center justify-center">
                  <Spinner />
                  <span className="text-blue-500">Sending Email</span>
                </div>
              ) : (
                <button
                  onClick={resetPasswordHandler}
                  className={cx(isLoading ? 'text-gray-300' : 'text-blue-900')}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
