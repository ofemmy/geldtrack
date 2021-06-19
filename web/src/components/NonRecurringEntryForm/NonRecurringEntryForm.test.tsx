import { render } from '@redwoodjs/testing'

import NonRecurringEntryForm from './NonRecurringEntryForm'

describe('NonRecurringEntryForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NonRecurringEntryForm />)
    }).not.toThrow()
  })
})
