import { render } from '@redwoodjs/testing'

import Banner from './Banner'

describe('Banner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Banner />)
    }).not.toThrow()
  })
})
