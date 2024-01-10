import { z } from 'zod'
import type { Screenings } from '@/database'

type Screening = Screenings

const schema = z.object({
  id: z.coerce.number().int().positive(),
  movieId: z.number().int().positive(),
  date: z
    .string()
    .datetime({ message: 'Invalid datetime string! Must be UTC.' }),
  ticketsTotal: z.number().int().positive(),
  ticketsLeft: z.number().int().positive(),
})

const insertable = schema.omit({ id: true })
const updateable = schema.omit({ id: true })
const partial = insertable.partial()

export const parse = (record: unknown) => schema.parse(record)
export const parseID = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)
export const parseUpdatable = (record: unknown) => updateable.parse(record)
export const parsePartial = (record: unknown) => partial.parse(record)

export const keys: (keyof Screening)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
