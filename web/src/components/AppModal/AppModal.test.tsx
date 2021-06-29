import { render } from '@redwoodjs/testing'

import AppModal from './AppModal'

describe('AppModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppModal />)
    }).not.toThrow()
  })
})
