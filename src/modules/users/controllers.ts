import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const users = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async () => {
      const usersList = await users.findAll()
      return usersList
    })
  )

  router.get(
    '/:id(\\d+)',
    jsonRoute(async (req) => {
      const id = schema.parseID(req.params.id)
      const user = await users.findById(id)
      return user
    })
  )

  router.post(
    '/',
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body)

      return users.createUser(body)
    }, StatusCodes.CREATED)
  )
  return router
}
