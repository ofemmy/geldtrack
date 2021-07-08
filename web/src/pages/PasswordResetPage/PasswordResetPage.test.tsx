import { render } from '@redwoodjs/testing'

import PasswordResetPage from './PasswordResetPage'

describe('PasswordResetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordResetPage />)
    }).not.toThrow()
  })
})
