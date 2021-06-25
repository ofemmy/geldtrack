import { render } from '@redwoodjs/testing'

import DataTable from './DataTable'

describe('DataTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DataTable />)
    }).not.toThrow()
  })
})
