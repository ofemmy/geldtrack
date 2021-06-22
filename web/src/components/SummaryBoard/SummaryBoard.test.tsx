import { render } from '@redwoodjs/testing'

import SummaryBoard from './SummaryBoard'

describe('SummaryBoard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryBoard />)
    }).not.toThrow()
  })
})
