import { render } from '@redwoodjs/testing'

import NewEntryPage from './NewEntryPage'

describe('NewEntryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewEntryPage />)
    }).not.toThrow()
  })
})
