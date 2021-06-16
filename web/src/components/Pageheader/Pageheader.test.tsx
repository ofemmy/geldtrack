import { render } from '@redwoodjs/testing'

import Pageheader from './Pageheader'

describe('Pageheader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Pageheader />)
    }).not.toThrow()
  })
})
