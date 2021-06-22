import { render } from '@redwoodjs/testing'

import MonthPicker from './MonthPicker'

describe('MonthPicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonthPicker />)
    }).not.toThrow()
  })
})
