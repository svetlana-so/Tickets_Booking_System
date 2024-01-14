import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const createMovies = createFor(db, 'movies')

const app = createApp(db)
// ARANGE FAKE DATA
await createMovies([
  {
    id: 10000,
    title: 'Sherlock Holmes',
    year: 2009,
  },
  {
    id: 10001,
    title: 'Love actually',
    year: 2003,
  },
])

it('it is not allowed to create a screening if the movie does not exist in db', async () => {
  await supertest(app)
    .post('/screenings')
    .send({
      movieId: 1,
      date: '2024-06-12T21:30:00Z',
      ticketsTotal: 15,
      ticketsLeft: 12,
    })
    .expect(500)
})

it('will create a screening if movie exists', async () => {
  await supertest(app)
    .post('/screenings')
    .send({
      movieId: 10000,
      date: '2024-06-12T21:30:00Z',
      ticketsTotal: 15,
      ticketsLeft: 12,
    })
    .expect(201)
})
