import { render } from '@redwoodjs/testing'

import SectionHeading from './SectionHeading'

describe('SectionHeading', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SectionHeading />)
    }).not.toThrow()
  })
})
