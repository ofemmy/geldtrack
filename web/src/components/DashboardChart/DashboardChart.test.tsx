import { render } from '@redwoodjs/testing'

import DashboardChart from './DashboardChart'

describe('DashboardChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardChart />)
    }).not.toThrow()
  })
})
