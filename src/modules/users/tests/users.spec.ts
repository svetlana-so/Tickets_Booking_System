import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const createUsers = createFor(db, 'users')
const app = createApp(db)

await createUsers([
  {
    email: 'sv@gmail.com',
  },
  {
    email: 'ls@gmail.com',
  },
])

describe('GET', () => {
  it('should return a list of users', async () => {
    const { body } = await supertest(app).get('/users').expect(200)
    expect(body).toHaveLength(2)
    expect(body).toEqual([
      {
        id: 1,
        email: 'sv@gmail.com',
      },
      {
        id: 2,
        email: 'ls@gmail.com',
      },
    ])
  })
  it('it should create a new user', async () => {
    await supertest(app)
      .post('/users')
      .send({
        email: 'ms@gmail.com',
      })
      .expect(201)
    const updatedResponse = await supertest(app).get('/users').expect(200)
    const updatedUsers = updatedResponse.body

    expect(updatedUsers).toHaveLength(3)
  })
})
