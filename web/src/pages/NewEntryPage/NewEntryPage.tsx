import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import Flex from 'src/components/Flex/Flex'
import { cx } from '../../utils/UtilFunctions'
import NonRecurringEntryForm from '../../components/NonRecurringEntryForm/NonRecurringEntryForm'
import RecurringEntryForm from '../../components/RecurringEntryForm/RecurringEntryForm'

const NewEntryPage = () => {
  const [formType, setFormType] = useState('nonRecurring')
  return (
    <>
      <div className="pb-3 border-b border-gray-300 flex justify-end">
        <FormRadioGroup formType={formType} setFormType={setFormType} />
      </div>
      <div className="mt-8">
        {formType === 'nonRecurring' ? (
          <NonRecurringEntryForm />
        ) : (
          <RecurringEntryForm />
        )}
      </div>
    </>
  )
}

function FormRadioGroup({ formType, setFormType }) {
  return (
    <RadioGroup value={formType} onChange={setFormType}>
      <RadioGroup.Label className="sr-only">form Type</RadioGroup.Label>
      <Flex classes="space-x-4">
        <RadioGroup.Option
          value="nonRecurring"
          className={({ active }) =>
            cx(
              active ? 'ring-1 ring-offset-2 ring-blue-500' : '',
              'relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
            )
          }
        >
          {({ checked }) => (
            <>
              <span className={cx(checked ? 'text-blue-700' : 'text-gray-700')}>
                Non Recurring
              </span>
              <div
                className={cx(
                  checked ? 'border-blue-500' : 'border-transparent',
                  'absolute -inset-px rounded-lg border-2 pointer-events-none'
                )}
                aria-hidden="true"
              />
            </>
          )}
        </RadioGroup.Option>

        <RadioGroup.Option
          value="recurring"
          className={({ active }) =>
            cx(
              active ? 'ring-1 ring-offset-2 ring-blue-500' : '',
              'relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
            )
          }
        >
          {({ checked }) => (
            <>
              <span className={cx(checked ? 'text-blue-700' : 'text-gray-700')}>
                Recurring
              </span>
              <div
                className={cx(
                  checked ? 'border-blue-500' : 'border-transparent',
                  'absolute -inset-px rounded-lg border-2 pointer-events-none'
                )}
                aria-hidden="true"
              />
            </>
          )}
        </RadioGroup.Option>
      </Flex>
    </RadioGroup>
  )
}
export default NewEntryPage
