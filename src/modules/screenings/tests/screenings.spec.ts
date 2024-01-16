import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')

const app = createApp(db)

// ARANGE FAKE DATA
await createMovies(fixtures.movies)
await createScreenings(fixtures.screenings)

describe('POST', () => {
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
})

describe('GET', () => {
  it(' will return a list of screenings', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)
    expect(body).toHaveLength(2)
  })
  it('will return a screening by Id', async () => {
    const { body } = await supertest(app).get('/screenings/1').expect(200)
    expect(body).toEqual([
      {
        date: '2020-01-01T00:00:00Z',
        ticketsLeft: 3,
        ticketsTotal: 10,
        title: 'Puppy Love',
        year: 2003,
      },
    ])
  })
})
