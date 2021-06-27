import { render } from '@redwoodjs/testing'

import BugetPage from './BudgetPage'

describe('BugetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BugetPage />)
    }).not.toThrow()
  })
})
