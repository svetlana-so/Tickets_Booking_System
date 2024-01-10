import type { Insertable, Updateable } from 'kysely'
import type { Database, Screenings } from '@/database'
import { keys } from './schema'

const TABLE = 'screenings'
type Row = Screenings
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>
type RowUpdate = Updateable<RowWithoutId>

export default (db: Database) => ({
  findAll: async () =>
    db
      .selectFrom(TABLE)
      .innerJoin('movies', 'screenings.movieId', 'movies.id')
      .select([
        'movies.title',
        'movies.year',
        'date',
        'ticketsTotal',
        'ticketsLeft',
      ])
      .execute(),

  createScreening: async (record: RowInsert) =>
    db.insertInto(TABLE).values(record).returning(keys).executeTakeFirst(),

  updateScreening: async (id: number, partial: RowUpdate) =>
    db
      .updateTable(TABLE)
      .set(partial)
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst(),

  findById: async (id: number) =>
    db.selectFrom(TABLE).select(keys).where('id', '=', id).execute(),
})
