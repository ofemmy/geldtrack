import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.EntryCreateArgs>({
  entry: {
    one: {
      title: 'String',
      type: 'Income',
      frequency: 'NonRecurring',
      entryDate: '2021-06-20T20:39:46Z',
      category: 'String',
      user: {
        create: { id: 'String', email: 'String7238022', currency: 'String' },
      },
    },
    two: {
      title: 'String',
      type: 'Income',
      frequency: 'NonRecurring',
      entryDate: '2021-06-20T20:39:46Z',
      category: 'String',
      user: {
        create: { id: 'String', email: 'String171400', currency: 'String' },
      },
    },
  },
})

export type StandardScenario = typeof standard
