import { render } from '@redwoodjs/testing'

import RecurringEntryForm from './RecurringEntryForm'

describe('RecurringEntryForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecurringEntryForm />)
    }).not.toThrow()
  })
})
