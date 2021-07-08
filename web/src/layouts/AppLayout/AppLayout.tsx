import { NavLink, routes } from '@redwoodjs/router'

import { upperFirst } from 'lodash'
import Pageheader from 'src/components/Pageheader/Pageheader'
import Flex from 'src/components/Flex/Flex'
import { DateProvider } from 'src/utils/hooks/useDate'
import Banner from '../../components/Banner/Banner'
import { useAuth } from '@redwoodjs/auth'
import { isDemoUser } from '../../utils/UtilFunctions'
import { HeartIcon } from '@heroicons/react/solid'
type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { currentUser } = useAuth()

  const navigation = Object.keys(routes)
  return (
    <>
      {isDemoUser(currentUser) ? <Banner /> : null}
      <Pageheader />
      <div className="px-4 sm:px-6 lg:px-8">
        <Flex>
          <div className="hidden md:flex md:flex-shrink-0 overflow-hidden min-h-screen border-r">
            <div className="flex flex-col w-56">
              <div className="flex flex-col h-0 flex-1">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <nav className="flex-1 px-2 space-y-1">
                    {navigation.map((item) =>
                      ![
                        'home',
                        'newEntry',
                        'login',
                        'verify',
                        'passwordReset',
                      ].includes(item) ? (
                        <NavLink
                          to={routes[item]()}
                          key={item}
                          className="text-gray-500 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
                          activeClassName="bg-blue-100 text-blue-800 font-semibold"
                        >
                          {upperFirst(item)}
                        </NavLink>
                      ) : null
                    )}
                  </nav>
                  <p className="flex items-center text-gray-700 text-sm">
                    <span>Made with </span>{' '}
                    <HeartIcon className="text-red-500 h-4 mr-1 ml-1" />{' '}
                    <span>by Olufemi</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <main className="max-w-8xl mx-auto px-4 sm:px-6">
                <DateProvider>{children}</DateProvider>
              </main>
            </div>
          </main>
        </Flex>
      </div>
    </>
  )
}

export default AppLayout
