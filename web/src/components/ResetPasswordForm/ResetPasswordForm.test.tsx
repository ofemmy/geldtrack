import { render } from '@redwoodjs/testing'

import ResetPasswordForm from './ResetPasswordForm'

describe('ResetPasswordForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetPasswordForm />)
    }).not.toThrow()
  })
})
