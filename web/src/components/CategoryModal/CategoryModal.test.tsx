import { render } from '@redwoodjs/testing'

import CategoryModal from './CategoryModal'

describe('CategoryModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryModal />)
    }).not.toThrow()
  })
})
