import { render } from '@redwoodjs/testing'

import CategoryForm from './CategoryForm'

describe('CategoryForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryForm />)
    }).not.toThrow()
  })
})
