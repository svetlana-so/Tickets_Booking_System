import express from 'express'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'
import movies from '@/modules/movies/controller'
import screenings from '@/modules/screenings/controllers'
import users from '@/modules/users/controllers'
import bookings from '@/modules/bookings/controllers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createApp(db: Database) {
  const app = express()

  app.use(express.json())

  // register your controllers here
  app.use('/movies', movies(db))
  app.use('/screenings', screenings(db))
  app.use('/users', users(db))
  app.use('/bookings', bookings(db))

  app.use(jsonErrorHandler)

  return app
}
