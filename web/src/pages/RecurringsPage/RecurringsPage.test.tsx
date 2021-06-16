import { render } from '@redwoodjs/testing'

import RecurringsPage from './RecurringsPage'

describe('RecurringsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecurringsPage />)
    }).not.toThrow()
  })
})
