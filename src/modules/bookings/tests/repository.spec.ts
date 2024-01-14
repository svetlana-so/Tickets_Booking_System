import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createUsers = createFor(db, 'users')
const createScreenings = createFor(db, 'screenings')
const createbookings = createFor(db, 'bookings')

await createMovies(fixtures.movies)
await createUsers(fixtures.users)
await createScreenings(fixtures.screenings)

await createbookings([
  { userId: 1, screeningId: 1 },
  { userId: 2, screeningId: 1 },
])

it('it should create a booking', async () => {
  const bookings = await repository.findAllBookings()
  expect(bookings).toHaveLength(2)
  expect(bookings).toEqual([
    {
      userId: 1,
      screeningId: 1,
    },
    { userId: 2, screeningId: 1 },
  ])
})

it('show all bookings of a specific user', async () => {
  const bookings = await repository.findAllBookingOfOneUser(1)
  expect(bookings).toEqual([
    {
      date: '2020-01-01T00:00:00Z',
      title: 'Love actually',
      year: 2003,
    },
  ])
})
