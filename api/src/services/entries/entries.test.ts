import { entries } from './entries'
import type { StandardScenario } from './entries.scenarios'

describe('entries', () => {
  scenario('returns all entries', async (scenario: StandardScenario) => {
    const result = await entries()

    expect(result.length).toEqual(Object.keys(scenario.entry).length)
  })
})
