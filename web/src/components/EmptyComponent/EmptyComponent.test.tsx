import { render } from '@redwoodjs/testing'

import EmptyComponent from './EmptyComponent'

describe('EmptyComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmptyComponent />)
    }).not.toThrow()
  })
})
