import { Link, routes } from '@redwoodjs/router'
const EmptyComponent = () => {
  return (
    <div className="flex items-center">
      <p className="mr-6">No entries exist yet.</p>
      <Link
        to={routes.newEntry()}
        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-yellow-50"
      >
        Add New Entry
      </Link>
    </div>
  )
}

export default EmptyComponent
