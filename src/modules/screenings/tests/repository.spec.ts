import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')

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

describe('screenings manipulations', () => {
  it('Should let the admin to screate a screening with existing movies in db by entering movie id and details', async () => {
    await createScreenings([
      {
        movieId: 10001,
        date: '2020-01-01T00:00:00Z',
        ticketsTotal: 10,
        ticketsLeft: 3,
      },
    ])
    // ACT
    const screenings = await repository.findAll()

    // ASSERT
    expect(screenings).toHaveLength(1)
  })
  it('it will return the array of movies with title, year, date, tickets information', async () => {
    const screenings = await repository.findAll()

    expect(screenings).toEqual([
      {
        id: 1,
        title: 'Love actually',
        year: 2003,
        date: '2020-01-01T00:00:00Z',
        ticketsTotal: 10,
        ticketsLeft: 3,
      },
    ])
  })

  it('will update the screening by providing the id of the screening which has to be updated with new values', async () => {
    await repository.updateScreening(1, {
      movieId: 10000,
      date: '2020-01-01T18:30:00Z',
      ticketsTotal: 15,
      ticketsLeft: 3,
    })

    const screenings = await repository.findAll()
    expect(screenings).toEqual([
      {
        id: 1,
        title: 'Sherlock Holmes',
        year: 2009,
        date: '2020-01-01T18:30:00Z',
        ticketsLeft: 3,
        ticketsTotal: 15,
      },
    ])

    it('find screening by screenings.id', async () => {
      const screening = await repository.findById(1)
      expect(screening).toEqual([
        {
          title: 'Sherlock Holmes',
          year: 2009,
          date: '2020-01-01T18:30:00Z',
          ticketsTotal: 15,
          ticketsLeft: 3,
        },
      ])
    })
  })
})
