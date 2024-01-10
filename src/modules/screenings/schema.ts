import { z } from 'zod'
import type { Screenings } from '@/database'

type Screening = Screenings

const schema = z.object({
  id: z.coerce.number().int().positive(),
  movieId: z.number().int().positive(),
  date: z.date(),
  ticketsTotal: z.number().int().positive(),
  ticketsLeft: z.number().int().positive(),
})

const insertable = schema.omit({ id: true })

export const parseInsertable = (record: unknown) => insertable.parse(record)

export const keys: (keyof Screening)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
