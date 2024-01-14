import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('date', 'date', (c) => c.notNull())
    .addColumn('tickets_total', 'integer', (c) => c.notNull())
    .addColumn('tickets_left', 'integer', (c) => c.notNull())
    .execute()
}
