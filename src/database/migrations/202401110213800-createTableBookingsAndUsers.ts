import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('email', 'text', (c) => c.notNull().unique())
    .execute()

  await db.schema
    .createTable('bookings')
    .ifNotExists()
    .addColumn('user_id', 'integer', (c) => c.notNull().references('user.id'))
    .addColumn('screening_id', 'integer', (c) =>
      c.notNull().references('screenings.id')
    )
    .execute()
}
