import { z } from 'zod'
import type { Bookings } from '@/database'

type Booking = Bookings

const schema = z.object({
  userId: z.number().int().positive(),
  screeningId: z.number().int().positive(),
})

export const keys: (keyof Booking)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
