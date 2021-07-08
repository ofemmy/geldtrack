import { ArrowCircleRightIcon } from '@heroicons/react/outline'
const VerifyPage = () => {
  return (
    <div className="max-w-8xl">
      <div className="mx-auto w-full mt-32 flex items-center flex-col">
        <ArrowCircleRightIcon className="h-32 text-gray-600 mx-auto" />
        <div className="mx-auto text-center space-y-2">
          <h1 className="text-lg font-bold text-gray-800">Verify Page</h1>
          <p>
            Thank you for signing up, an email has been sent to your email
            address.
          </p>
          <p>Please verify your email to complete the signing up process.</p>
        </div>
      </div>
    </div>
  )
}

export default VerifyPage
