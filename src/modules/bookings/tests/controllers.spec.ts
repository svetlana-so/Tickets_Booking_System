import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const createBookings = createFor(db, 'bookings')
const app = createApp(db)
const createMovies = createFor(db, 'movies')
const createUsers = createFor(db, 'users')
const createScreenings = createFor(db, 'screenings')

await createMovies(fixtures.movies)
await createUsers(fixtures.users)
await createScreenings(fixtures.screenings)

await createBookings({ userId: 1, screeningId: 1 })

it('GET', async () => {
  const { body } = await supertest(app).get('/bookings').expect(200)
  expect(body).toHaveLength(1)
})
