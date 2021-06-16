import { render } from '@redwoodjs/testing'

import Flex from './Flex'

describe('Flex', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Flex />)
    }).not.toThrow()
  })
})
