import { useLocation } from '@redwoodjs/router'
import { CheckIcon } from '@heroicons/react/outline'
import { useAuth } from '@redwoodjs/auth'
import { NavLink, routes, navigate } from '@redwoodjs/router'
import SignUpForm from 'src/components/SignUpForm/SignUpForm'

const HomePage = () => {
  const loc = useLocation()
  console.log(loc)
  //https://rzjinntvvjahpevxierh.supabase.co/auth/v1/verify?token=EpRfnBc3YwHxSRW3GbmNnQ&type=recovery&redirect_to=https://www.geldtrack.io
  const { logIn } = useAuth()
  const loginDemo = () => {
    logIn({
      email: process.env.DEMO_USER_EMAIL,
      password: process.env.DEMO_USER_PASSWORD,
    }).then(() => navigate(routes.dashboard()))
  }
  const features = [
    {
      name: 'Create your own category',
      description:
        'You can add your custom category to the default list of categories that are provided',
    },
    {
      name: 'Budget',
      description:
        'Set your budget per category and monitor your expenses with respect to your budget ',
    },
    {
      name: 'Recurring Entries',
      description:
        'Entries like Salary or rent that comes every month do not have to be entered every month, just enter it as a recurring entry once and we take care of the rest.',
    },
    {
      name: 'Dashboard',
      description:
        'You can easily visualize the flow of money with the simple dashboard.',
    },
    {
      name: 'Great User Experience',
      description:
        'The application was designed with easeof use in mind. It is designed to be simple to use yet effective on what it does.',
    },
  ]
  return (
    <div className="relative overflow-hidden">
      <div
        className="hidden sm:block sm:absolute sm:inset-0"
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-400 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width={364}
            height={384}
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
          />
        </svg>
      </div>
      <div className="relative bg-blue-800 pt-4 pb-16 sm:pb-24 ">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center flex-shrink-0 justify-between w-full">
              <h2 className="font-extrabold text-white text-4xl">geldTrack</h2>
              <NavLink
                to={routes.login()}
                className="text-white font-semibold"
                activeClassName=""
              >
                Login
              </NavLink>
            </div>
            <div className="-mr-16"></div>
          </div>
        </div>
        <main className="mt-16 sm:mt-32 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div className="space-y-6">
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-5xl">
                    <span className="md:block">Tracking your money flow</span>{' '}
                    <span className="text-blue-400 md:block">
                      just got easier.
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Geldtack is a free application that makes it easy to track
                    your incomes and expenses. With this app, you gain more
                    control and oversight of your money flow.
                  </p>
                  <div className="rounded-md shadow">
                    <button
                      onClick={loginDemo}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 uppercase"
                    >
                      Try demo
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="px-4 py-8 sm:px-10">
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div>
            <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">
              Simple yet effective to use
            </h2>
            {/* <p className="mt-2 text-3xl font-extrabold text-gray-900">All-in-one platform</p> */}
            <p className="mt-4 text-lg text-gray-500">
              Geldtrack has all the features you want in a money tracker
              application and it comes at no cost.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <CheckIcon
                      className="absolute h-6 w-6 text-green-500"
                      aria-hidden="true"
                    />
                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-9 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
