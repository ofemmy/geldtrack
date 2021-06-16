import { render } from '@redwoodjs/testing'

import ExpensesPage from './ExpensesPage'

describe('ExpensesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExpensesPage />)
    }).not.toThrow()
  })
})
