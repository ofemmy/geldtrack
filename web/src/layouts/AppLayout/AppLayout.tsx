import { NavLink, routes } from '@redwoodjs/router'
import { upperFirst } from 'lodash'
import Pageheader from 'src/components/Pageheader/Pageheader'
import Flex from 'src/components/Flex/Flex'
import { DateProvider } from 'src/utils/hooks/useDate'
type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigation = Object.keys(routes)
  return (
    <>
      <Pageheader />
      <div className="px-4 sm:px-6 lg:px-8">
        <Flex>
          <div className="hidden md:flex md:flex-shrink-0 overflow-hidden">
            <div className="flex flex-col w-64">
              <div className="flex flex-col h-0 flex-1">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <nav className="flex-1 px-2 space-y-1">
                    {navigation.map((item) =>
                      !['home', 'newEntry'].includes(item) ? (
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
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
