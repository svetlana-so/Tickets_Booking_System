import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'


export default (db: Database) => {
  const messages = buildRepository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      if (typeof req.query.id !== 'string') {
        return messages.findAll()
      }

      const ids = req.query.id.split(',').map((n) => parseInt(n, 10))
      const movies = messages.findByIds(ids)

      return movies
    })
  )

  return router
}
