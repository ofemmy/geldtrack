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

export const users = () => {
  return db.user.findMany()
}
export const user = ({ id }) => {
  console.log(id)
  return db.user.findUnique({ where: { id } })
}
export const User = {
  entries: (_obj, { root }: ResolverArgs<Prisma.UserWhereUniqueInput>) =>
    db.user.findUnique({ where: { id: root.id } }).entries(),
}
