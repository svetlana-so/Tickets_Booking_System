import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createUsers = createFor(db, 'users')
const createScreenings = createFor(db, 'screenings')

await createMovies(fixtures.movies)
await createUsers(fixtures.users)
await createScreenings(fixtures.screenings)

it('it should create a booking', async () => {
  await repository.createBooking({ userId: 1, screeningId: 1 })
  const bookings = await repository.findAllBookings()
  expect(bookings).toHaveLength(1)
  expect(bookings).toEqual([
    {
      userId: 1,
      screeningId: 1,
    },
  ])
})
