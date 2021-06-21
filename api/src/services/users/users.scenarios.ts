import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { id: 'String', email: 'String4972539', currency: 'String' },
    two: { id: 'String', email: 'String8018845', currency: 'String' },
  },
})

export type StandardScenario = typeof standard
