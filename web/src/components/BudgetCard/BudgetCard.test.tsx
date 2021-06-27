import { render } from '@redwoodjs/testing'

import BudgetCard from './BudgetCard'

describe('BudgetCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BudgetCard />)
    }).not.toThrow()
  })
})
