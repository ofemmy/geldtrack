import { useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { useDisclosure } from '@chakra-ui/hooks'
import { cx, numberToCurrency } from 'src/utils/UtilFunctions'
import { EntryFrequency, EntryType } from '@prisma/client'
import { PencilAltIcon, TrashIcon, CashIcon } from '@heroicons/react/outline'
import { DateTime } from 'luxon'
import AppModal from '../AppModal/AppModal'
import NonRecurringEntryForm from 'src/components/NonRecurringEntryForm/NonRecurringEntryForm'
import RecurringEntryForm from 'src/components/RecurringEntryForm/RecurringEntryForm'

const DataTable = ({ data, dataPerPage = 10 }) => {
  const tableData = useMemo(() => data, [data])
  const currency = 'EUR'
  const columns = useMemo(
    () => [
      {
        Header: 'title',
        accessor: 'title',
        Cell: ({ value, row }) => (
          <span
            className={cx(
              row.original.type === 'Income' ? 'text-green-500' : 'text-red-500'
            )}
          >
            {value}
          </span>
        ),
      },

      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => (
          <p>{numberToCurrency({ amount: value, currency })}</p>
        ),
      },
      { Header: 'Category', accessor: 'category' },
      {
        Header: 'Entry Date',
        accessor: (row) => DateTime.fromISO(row.entryDate).toLocaleString(),
      },
      {
        Header: 'Frequency',
        accessor: 'frequency',
      },
    ],
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,

    pageOptions,
    pageCount,
    nextPage,
    previousPage,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageSize: dataPerPage },
    },
    usePagination
  )
  const [formType, setFormType] = useState(EntryFrequency.NonRecurring)
  const [entryToEdit, setEntryToEdit] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const editHandler = (entry) => {
    setFormType(entry.frequency)
    setEntryToEdit(entry)
    onOpen()
  }
  const deleteHandler = (entry) => {
    console.log(entry)
  }
  return (
    <>
      <AppModal onClose={onClose} isOpen={isOpen} title="Edit Entry">
        {formType === EntryFrequency.NonRecurring ? (
          <NonRecurringEntryForm mode="edit" entry={entryToEdit} />
        ) : (
          <RecurringEntryForm mode="edit" entry={entryToEdit} />
        )}
      </AppModal>
      <div className="shadow sm:hidden">
        <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          {tableData.map((entry) => (
            <li key={entry.id}>
              <a
                href={entry.href}
                className="block px-4 py-4 bg-white hover:bg-gray-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex-1 flex space-x-2 truncate">
                    <CashIcon
                      className={`flex-shrink-0 h-5 w-5 text-${
                        entry.type === EntryType.Expense ? 'red' : 'green'
                      }-400`}
                      aria-hidden="true"
                    />
                    <span className="flex flex-col text-gray-500 text-sm truncate">
                      <span className="truncate">{entry.title}</span>
                      <span>
                        <span className="text-gray-900 font-medium">
                          {numberToCurrency({
                            amount: entry.amount,
                            currency,
                            locale: 'de-DE',
                          })}
                        </span>
                      </span>
                      <time dateTime={entry.entryDate}>
                        {entry.entryDate.toString()}
                      </time>
                    </span>
                  </span>
                  <span className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">
                    <button onClick={() => {}} className="text-yellow-500">
                      <PencilAltIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => {}}>
                      <TrashIcon className="text-red-500 w-4 h-4" />
                    </button>
                  </span>
                  {/* <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  /> */}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
          aria-label="Pagination"
        >
          <div className="flex-1 flex justify-between">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Next
            </a>
          </div>
        </nav> */}
      </div>
      <div className="hidden sm:block overflow-x-auto">
        <div className="">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg min-w-full flex flex-col">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup, idx) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps()}
                        key={idx}
                        scope="col"
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-200"
              >
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr
                      key={i}
                      {...row.getRowProps()}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            key={idx}
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                      <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">
                        <button
                          onClick={() => {
                            editHandler(row.original)
                          }}
                          className="text-yellow-500"
                        >
                          <PencilAltIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            deleteHandler(row.original)
                          }}
                        >
                          <TrashIcon className="text-red-500 w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {!(dataPerPage === pageSize * pageCount) && (
              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{pageIndex + 1}</span> of{' '}
                    <span className="font-medium">{pageOptions.length}</span>
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  <button
                    className={cx(
                      canPreviousPage
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-300 border-gray-300 pointer-events-none',
                      'ml-3 relative inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md  bg-white hover:bg-gray-50'
                    )}
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                  <button
                    className={cx(
                      canNextPage
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-300 border-gray-300 pointer-events-none',
                      'ml-3 relative inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md  bg-white hover:bg-gray-50'
                    )}
                    onClick={nextPage}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default DataTable
