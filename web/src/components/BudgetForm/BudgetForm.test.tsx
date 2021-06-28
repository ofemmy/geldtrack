import { render } from '@redwoodjs/testing'

import BudgetForm from './BudgetForm'

describe('BudgetForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BudgetForm />)
    }).not.toThrow()
  })
})
