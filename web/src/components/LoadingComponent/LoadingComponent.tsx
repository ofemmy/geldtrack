const LoadingComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center absolute inset-y-32 inset-x-32">
      <svg
        className="animate-spin  h-12 w-12 text-white "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#cccc"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#0868A0"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <h2 className="text-center text-gray-700 text-xl font-semibold">
        Loading...
      </h2>
      <p className="text-center text-gray-700">This may take a few seconds</p>
    </div>
  )
}

export default LoadingComponent
