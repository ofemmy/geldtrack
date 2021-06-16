import { render } from '@redwoodjs/testing'

import IncomesPage from './IncomesPage'

describe('IncomesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IncomesPage />)
    }).not.toThrow()
  })
})
