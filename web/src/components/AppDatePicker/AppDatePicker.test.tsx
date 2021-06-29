import { render } from '@redwoodjs/testing'

import AppDatePicker from './AppDatePicker'

describe('AppDatePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppDatePicker />)
    }).not.toThrow()
  })
})
