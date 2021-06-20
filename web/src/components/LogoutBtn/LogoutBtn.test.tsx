import { render } from '@redwoodjs/testing'

import LogoutBtn from './LogoutBtn'

describe('LogoutBtn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogoutBtn />)
    }).not.toThrow()
  })
})
