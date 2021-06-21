import { render } from '@redwoodjs/testing'

import LoadingComponent from './LoadingComponent'

describe('LoadingComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingComponent />)
    }).not.toThrow()
  })
})
