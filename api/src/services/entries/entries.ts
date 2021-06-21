import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { BeforeResolverSpecType } from '@redwoodjs/api'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
  rules.skip() //remove later
}

export const entries = () => {
  return db.entry.findMany()
}
export const entriesForUser = (args) => {
  console.log(args)
  return []
}

export const Entry = {
  user: (_obj, { root }: ResolverArgs<Prisma.EntryWhereUniqueInput>) => {
    console.log(root)
    return db.entry.findUnique({ where: { id: root.id } }).user()
  },
}
export const createEntry = ({ input }) => {
  requireAuth()
  return db.entry.create({ data: input })
}
