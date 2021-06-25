import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { BeforeResolverSpecType } from '@redwoodjs/api'
import { createDate } from '../../lib/utils'
import { fetchIncomes } from 'src/lib/queries/fetchIncomes'
import { fetchExpenses } from 'src/lib/queries/fetchExpenses'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
  rules.skip() //remove later
}

export const users = () => {
  return db.user.findMany()
}
export const user = ({ id }) => {
  return db.user.findUnique({ where: { id } })
}
export const User = {
  entries: (
    _obj,
    { root, info }: ResolverArgs<Prisma.UserWhereUniqueInput>
  ) => {
    const { month, userId } = info.variableValues
    const date = createDate({ month })
    return fetchExpenses({ date, userId })
    //return db.user.findUnique({ where: { id: root.id } }).entries()
  },
}
