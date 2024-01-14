import { z } from 'zod'
import type { Users } from '@/database'

type User = Users

const schema = z.object({
  id: z.coerce.number().int().positive(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
})

const insertable = schema.omit({ id: true })

export const parse = (record: unknown) => schema.parse(record)
export const parseID = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)

export const keys: (keyof User)[] = Object.keys(schema.shape) as (keyof z.infer<
  typeof schema
>)[]
