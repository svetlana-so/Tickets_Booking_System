import type { Insertable } from 'kysely'
import type { Database, Users } from '@/database'
import { keys } from './schema'

const TABLE = 'users'
type Row = Users
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  findAll: async () => db.selectFrom(TABLE).selectAll().execute(),

  findById: async (id: number) =>
    db.selectFrom(TABLE).selectAll().where('id', '=', id).execute(),

  createUser: async (record: RowInsert) =>
    db.insertInto(TABLE).values(record).returning(keys).executeTakeFirst(),
})
