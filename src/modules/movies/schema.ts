import { z } from 'zod'
import type { Movies } from '@/database'

type Movie = Movies

const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(500),
  year: z.number().int().positive(),
})

export const keys: (keyof Movie)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
