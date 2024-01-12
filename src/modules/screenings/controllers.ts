import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const screenings = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async () => {
      const screeningsList = await screenings.findAll()
      return screeningsList
    })
  )

  router.post(
    '/',
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body)

      return screenings.createScreening(body)
    }, StatusCodes.CREATED)
  )
  router.get(
    '/:id(\\d+)',
    jsonRoute(async (req) => {
      const id = schema.parseID(req.params.id)
      const record = await screenings.findById(id)
      if (!record) {
        throw new Error()
      }
      return record
    })
  )
  router.patch( '/:id(\\d+)', jsonRoute(async (req) => {
      const id = schema.parseID(req.params.id)
      const bodyPatch = schema.parsePartial(req.body)
      const record = await screenings.updateScreening(id, bodyPatch)
      if (!record) {
        throw new Error()
      }
      return record
    })
  )
  return router
}
