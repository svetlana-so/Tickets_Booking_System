import type { Insertable } from 'kysely'
import type { Database, Bookings } from '@/database'
import { keys } from './schema'

type Row = Bookings
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

const TABLE = 'bookings'
export default (db: Database) => ({
  createBooking: async (record: RowInsert) =>
    db.insertInto(TABLE).values(record).returning(keys).executeTakeFirst(),

  findAllBookings: async () => db.selectFrom(TABLE).selectAll().execute(),

  findAllBookingOfOneUser: async (id: number) =>
    db
      .selectFrom(TABLE)
      .innerJoin('screenings', 'screenings.id', 'bookings.screeningId')
      .innerJoin('movies', 'screenings.movieId', 'movies.id')
      .select(['movies.title', 'movies.year', 'screenings.date'])
      .where('bookings.userId', '=', id)
      .execute(),
})
