import { render } from '@redwoodjs/testing'

import VerifyPage from './VerifyPage'

describe('VerifyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VerifyPage />)
    }).not.toThrow()
  })
})
