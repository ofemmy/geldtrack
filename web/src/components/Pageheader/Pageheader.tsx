import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { NavLink, routes } from '@redwoodjs/router'
const Pageheader = () => {
  return (
    <Disclosure as="nav" className="shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h2 className="font-extrabold text-blue-900 text-2xl md:text-4xl">
                    geldTrack
                  </h2>
                </div>
              </div>
              <div className="flex">
                <NavLink
                  to={routes.newEntry()}
                  activeClassName="text-blue-900"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
                >
                  Add New Entry
                </NavLink>
                <div className="flex sm:hidden">
                  <Disclosure.Button>
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink
                  to={routes.home()}
                  activeClassName="text-blue-900"
                  className="text-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </NavLink>
                {/* <a
                  href="/"
                  className="bg-blue-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a> */}
                <NavLink
                  to={routes.dashboard()}
                  activeClassName="text-blue-900"
                  className="text-gray-500 hover:bg-blue-200 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </NavLink>
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Pageheader
