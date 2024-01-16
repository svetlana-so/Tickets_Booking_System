import { StatusCodes } from 'http-status-codes'
import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
/* import * as schema from './schema'  */
import buildBookingRepository from './repository'
import buildScreeningsRepository from '../screenings/repository'

export default (db: Database) => {
  const router = Router()
  const bookings = buildBookingRepository(db)
  const screenings = buildScreeningsRepository(db)

  router.get(
    '/',
    jsonRoute(async () => {
      const bookingsList = await bookings.findAllBookings()
      return bookingsList
    })
  )
  router.post(
    '/:screeningId/:userId',
    jsonRoute(async (req, res) => {
      const screeningId = parseInt(req.params.screeningId, 10)
      const userId = parseInt(req.params.userId, 10)

      const screening = await screenings.findById(screeningId)

      if (screening[0].ticketsLeft <= 0) {
        res.send('Booking is not available, no tickets left')
        return
      }
      await bookings.createBooking({ userId, screeningId })
      res.status(StatusCodes.CREATED).send('Booking created successfully')
    })
  )

  // get all bookings of one user
  router.get(
    '/:userId',
    jsonRoute(async (req) => {
      const id = parseInt(req.params.userId, 10)
      const allBookingsOfOneUser = await bookings.findAllBookingOfOneUser(id)
      return allBookingsOfOneUser
    })
  )

  return router
}
