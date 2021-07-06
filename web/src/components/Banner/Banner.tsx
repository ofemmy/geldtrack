import { BellIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
const Banner = () => {
  return (
    <div className="bg-yellow-500">
      <div className="max-w-8xl mx-auto py-3 px-3 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <span className="hidden sm:flex p-2 rounded-lg bg-yellow-800">
            <BellIcon className=" h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p className="text-white text-center">
            This is a demo account. Data is stored only temporarily. Sign up to
            persist your data permanently.
          </p>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              to={routes.home()}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-800 bg-white hover:bg-indigo-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-yellow-500">
    //   <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between flex-wrap">
    //       <div className="w-0 flex-1 flex items-center">
    //         <span className="flex p-2 rounded-lg bg-yellow-800">
    //           <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
    //         </span>
    //         <p className="ml-3 lg:font-medium text-white">
    //           <span className="">
    //             This is a demo account, entries are deleted daily. Sign up to
    //             persist entries permanently.
    //           </span>
    //         </p>
    //       </div>
    //       <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
    //         <Link
    //           to={routes.home()}
    //           className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-800 bg-white hover:bg-indigo-50"
    //         >
    //           Sign Up
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Banner
