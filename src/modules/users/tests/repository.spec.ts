import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createUser = createFor(db, 'users')

describe('users', () => {
  it('it should create a user in db with id and email', async () => {
    await createUser([
      {
        email: 'sv@gmail.com',
      },
    ])
    const users = await repository.findAll()
    expect(users).toHaveLength(1)
    expect(users).toEqual([
      {
        id: 1,
        email: 'sv@gmail.com',
      },
    ])
  })
})
