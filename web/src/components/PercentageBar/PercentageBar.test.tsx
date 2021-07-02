import { render } from '@redwoodjs/testing'

import PercentageBar from './PercentageBar'

describe('PercentageBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PercentageBar />)
    }).not.toThrow()
  })
})
